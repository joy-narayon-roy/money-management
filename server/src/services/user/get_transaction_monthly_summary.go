package user

import (
	"strings"
	"time"

	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

type MonthlyDuration string

const (
	// MonthlyDuration_ALL_TIME  MonthlyDuration = "ALL_TIME"
	MonthlyDuration_THIS_YEAR MonthlyDuration = "THIS_YEAR"
	MonthlyDuration_LAST_12   MonthlyDuration = "LAST_12"
	MonthlyDuration_LAST_6    MonthlyDuration = "LAST_6"
	MonthlyDuration_LAST_1    MonthlyDuration = "LAST_1"
)

type GetTransactionMonthlySummaryOptions struct {
	Duration MonthlyDuration `query:"duration"`
}

type Result struct {
	Monthly []MonthlySummary `json:"monthly" gorm:"-"`
}

func (s *UserServiceStruct) GetTransactionMonthlySummary(
	id uuid.UUID,
	opt *GetTransactionMonthlySummaryOptions,
) (*Result, error) {

	var res Result

	now := time.Now().UTC()
	currentMonthStart := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC)

	// LAST_1 is a special case: a rolling 30-day window rather than
	// a calendar-month bucket, so it can't use the generic monthly
	// grouping logic below (a 30-day window can span two YYYY-MM keys).
	if opt.Duration == MonthlyDuration_LAST_1 {
		return s.getLast30DaySummary(id, now)
	}

	// Determine range start and number of months based on Duration
	var rangeStart time.Time
	var numMonths int

	switch opt.Duration {
	case MonthlyDuration_THIS_YEAR:
		rangeStart = time.Date(now.Year(), time.January, 1, 0, 0, 0, 0, time.UTC)
		numMonths = int(now.Month()) // Jan..current month
	case MonthlyDuration_LAST_6:
		rangeStart = currentMonthStart.AddDate(0, -5, 0)
		numMonths = 6
	case MonthlyDuration_LAST_12:
		fallthrough
	default:
		rangeStart = currentMonthStart.AddDate(0, -11, 0)
		numMonths = 12
	}

	monthlyList := make([]MonthlySummary, numMonths)
	monthIndexMap := make(map[string]int, numMonths)

	for i := 0; i < numMonths; i++ {
		m := rangeStart.AddDate(0, i, 0)
		key := m.Format("2006-01")

		monthlyList[i] = MonthlySummary{
			Month:   strings.ToUpper(m.Format("Jan")), // Clean uppercase month string
			Income:  0,
			Expense: 0,
		}
		monthIndexMap[key] = i
	}

	queryMonthly := config.DB.
		Model(&models.Transaction{}).
		Where("user_id = ?", id).
		Where("date >= ?", rangeStart)

	var monthlyData []dbMonthlyScan

	err := queryMonthly.
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

	for _, data := range monthlyData {
		if idx, exists := monthIndexMap[data.MonthKey]; exists {
			monthlyList[idx].Income = data.Income
			monthlyList[idx].Expense = data.Expense
		}
	}
	res.Monthly = monthlyList

	return &res, nil
}

// getLast30DaySummary returns a single-bucket summary covering the
// rolling 30-day window ending now (inclusive), regardless of
// calendar-month boundaries.
func (s *UserServiceStruct) getLast30DaySummary(id uuid.UUID, now time.Time) (*Result, error) {
	rangeStart := now.AddDate(0, 0, -30)

	var data dbMonthlyScan

	err := config.DB.
		Model(&models.Transaction{}).
		Where("user_id = ?", id).
		Where("date >= ?", rangeStart).
		Where("date <= ?", now).
		Select(`
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS income,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS expense
		`, models.TransactionTypeIncome, models.TransactionTypeExpense).
		Scan(&data).Error

	if err != nil {
		return nil, err
	}

	return &Result{
		Monthly: []MonthlySummary{
			{
				Month:   strings.ToUpper(now.Format("Jan")),
				Income:  data.Income,
				Expense: data.Expense,
			},
		},
	}, nil
}
