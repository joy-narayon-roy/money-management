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

// dbDailyScan is the scan target for the LAST_1 (rolling 30-day, daily
// bucketed) query.
type dbDailyScan struct {
	DayKey  string `json:"day_key"`
	Income  int64  `json:"income"`
	Expense int64  `json:"expense"`
}

func (s *UserServiceStruct) GetTransactionMonthlySummary(
	id uuid.UUID,
	opt *GetTransactionMonthlySummaryOptions,
) (*Result, error) {

	var res Result

	now := time.Now().UTC()
	currentMonthStart := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC)

	// LAST_1 is a special case: daily buckets over a rolling 30-day
	// window rather than monthly buckets, so it can't use the generic
	// monthly grouping logic below.
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

// getLast30DaySummary returns one bucket per day for the rolling
// 30-day window ending today (inclusive), regardless of calendar-month
// boundaries — e.g. "SEP 1", "SEP 2", ... "AUG 13" style labels.
func (s *UserServiceStruct) getLast30DaySummary(id uuid.UUID, now time.Time) (*Result, error) {
	todayStart := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	rangeStart := todayStart.AddDate(0, 0, -29) // 29 days back + today = 30 days total

	dailyList := make([]MonthlySummary, 30)
	dayIndexMap := make(map[string]int, 30)

	for i := 0; i < 30; i++ {
		d := rangeStart.AddDate(0, 0, i)
		key := d.Format("2006-01-02")

		dailyList[i] = MonthlySummary{
			Month:   strings.ToUpper(d.Format("Jan 2")), // e.g. "SEP 1"
			Income:  0,
			Expense: 0,
		}
		dayIndexMap[key] = i
	}

	var dailyData []dbDailyScan

	err := config.DB.
		Model(&models.Transaction{}).
		Where("user_id = ?", id).
		Where("date >= ?", rangeStart).
		Where("date < ?", todayStart.AddDate(0, 0, 1)).
		Select(`
			TO_CHAR(date, 'YYYY-MM-DD') AS day_key,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS income,
			COALESCE(SUM(CASE WHEN type = ? THEN amount ELSE 0 END), 0) AS expense
		`, models.TransactionTypeIncome, models.TransactionTypeExpense).
		Group("TO_CHAR(date, 'YYYY-MM-DD')").
		Scan(&dailyData).Error

	if err != nil {
		return nil, err
	}

	for _, data := range dailyData {
		if idx, exists := dayIndexMap[data.DayKey]; exists {
			dailyList[idx].Income = data.Income
			dailyList[idx].Expense = data.Expense
		}
	}

	return &Result{Monthly: dailyList}, nil
}
