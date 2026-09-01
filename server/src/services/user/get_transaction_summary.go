package user

import (
	"math"
	"strings"
	"time"

	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

type GetTransactionSummaryOptions struct {
	Limit uint                   `query:"limit"`
	Page  uint                   `query:"page"`
	ID    uuid.UUID              `query:"id"`
	Type  models.TransactionType `query:"type"`
}

type MonthlySummary struct {
	Month   string `json:"month"` // "JAN", "FEB", etc.
	Income  int64  `json:"income"`
	Expense int64  `json:"expense"`
}

type ChangesResult struct {
	Income      float64 `json:"income"`
	IncomeSign  string  `json:"income_sign"`
	Expense     float64 `json:"expense"`
	ExpenseSign string  `json:"expense_sign"`
}

type GetTransactionSummaryResult struct {
	TotalIncome      int64            `json:"total_income" gorm:"column:total_income"`
	TotalExpense     int64            `json:"total_expense" gorm:"column:total_expense"`
	TotalReceivables int64            `json:"total_recivable" gorm:"column:total_recivable"`
	Monthly          []MonthlySummary `json:"monthly" gorm:"-"`
	Changes          ChangesResult    `json:"changes" gorm:"-"`
}

type dbMonthlyScan struct {
	MonthKey string `gorm:"column:month_key"` // Format: "YYYY-MM"
	Income   int64  `gorm:"column:income"`
	Expense  int64  `gorm:"column:expense"`
}

func (s *UserServiceStruct) GetTransactionSummary(
	id *uuid.UUID,
	opt *GetTransactionSummaryOptions,
) (*GetTransactionSummaryResult, error) {

	res := &GetTransactionSummaryResult{}

	// 1. Fetch All-Time Totals
	queryTotals := config.DB.
		Model(&models.Transaction{}).
		Where("user_id = ?", id)

	err := queryTotals.
		Select(`
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS total_income,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS total_expense,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) - 
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS total_recivable
		`,
			models.TransactionTypeIncome,
			models.TransactionTypeExpense,
			models.TransactionTypeAR,
			models.TransactionTypeARPayment,
		).
		Scan(res).Error

	if err != nil {
		return nil, err
	}

	// 2. Pre-fill 12 months slice (chronological)
	now := time.Now().UTC()
	currentMonthStart := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC)
	twelveMonthsAgo := currentMonthStart.AddDate(0, -11, 0)

	monthlyList := make([]MonthlySummary, 12)
	monthIndexMap := make(map[string]int, 12)

	for i := 0; i < 12; i++ {
		m := twelveMonthsAgo.AddDate(0, i, 0)
		key := m.Format("2006-01")

		monthlyList[i] = MonthlySummary{
			Month:   strings.ToUpper(m.Format("Jan")), // Clean uppercase month string
			Income:  0,
			Expense: 0,
		}
		monthIndexMap[key] = i
	}

	// 3. Query Database
	queryMonthly := config.DB.
		Model(&models.Transaction{}).
		Where("user_id = ?", id).
		Where("date >= ?", twelveMonthsAgo)

	if opt != nil && opt.ID != uuid.Nil {
		queryMonthly = queryMonthly.Where("id = ?", opt.ID)
	}

	var monthlyData []dbMonthlyScan

	err = queryMonthly.
		Select(`
			TO_CHAR(date, 'YYYY-MM') AS month_key,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS income,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS expense
		`, models.TransactionTypeIncome, models.TransactionTypeExpense).
		Group("TO_CHAR(date, 'YYYY-MM')").
		Scan(&monthlyData).Error

	if err != nil {
		return nil, err
	}

	// 4. Populate DB Aggregates into pre-filled slice
	for _, data := range monthlyData {
		if idx, exists := monthIndexMap[data.MonthKey]; exists {
			monthlyList[idx].Income = data.Income
			monthlyList[idx].Expense = data.Expense
		}
	}
	res.Monthly = monthlyList

	// 5. Compute Month-over-Month Percentage Changes
	latest := monthlyList[11]
	previous := monthlyList[10]

	incPct, incSign := computePercentageAndSign(latest.Income, previous.Income)
	expPct, expSign := computePercentageAndSign(latest.Expense, previous.Expense)

	res.Changes = ChangesResult{
		Income:      incPct,
		IncomeSign:  incSign,
		Expense:     expPct,
		ExpenseSign: expSign,
	}

	return res, nil
}

func computePercentageAndSign(current, previous int64) (float64, string) {
	diff := current - previous

	sign := "+"
	if diff < 0 {
		sign = "-"
	}

	if previous == 0 {
		if current == 0 {
			return 0.0, "+"
		}
		return 100.0, sign
	}

	percentage := (float64(diff) / float64(previous)) * 100.0
	return math.Abs(percentage), sign
}
