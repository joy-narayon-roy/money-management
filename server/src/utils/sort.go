package utils

import "strings"

func BuildSortOrderClause(sortParam string, whitelist map[string]string, defaultOrder string) string {
	if sortParam == "" {
		return defaultOrder
	}

	fields := strings.Split(sortParam, ",")
	clauses := make([]string, 0, len(fields))

	for _, f := range fields {
		f = strings.TrimSpace(f)
		if f == "" {
			continue
		}

		dir := "ASC"
		key := f
		if strings.HasPrefix(f, "-") {
			dir = "DESC"
			key = f[1:]
		}

		col, ok := whitelist[key]
		if !ok {
			continue // silently skip unknown fields (or return 400 — see note below)
		}

		clauses = append(clauses, col+" "+dir)
	}

	if len(clauses) == 0 {
		return defaultOrder
	}

	return strings.Join(clauses, ", ")
}
