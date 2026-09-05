import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Monthly } from "../../types/summary";
// import type { Monthly } from "../../models/summary";

// const data = [
//   {
//     month: "Feb",
//     income: 32000,
//     expense: 18000,
//   },
//   {
//     month: "Mar",
//     income: 36000,
//     expense: 21000,
//   },
//   {
//     month: "Apr",
//     income: 29000,
//     expense: 17000,
//   },
//   {
//     month: "May",
//     income: 42000,
//     expense: 24000,
//   },
//   {
//     month: "Jun",
//     income: 38000,
//     expense: 19000,
//   },
//   {
//     month: "Jul",
//     income: 45000,
//     expense: 23000,
//   },
//   {
//     month: "Aug",
//     income: 50000,
//     expense: 18500,
//   },
// ];

function formatCurrency(value: number) {
  return `৳${(value / 1000).toFixed(0)}k`;
}


type Props = {
  data: Monthly[]
}
export function CashFlowChart({ data = [] }: Props) {

  return (
    <div className="rounded-2xl border border-[#E3EBE7] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#26362F]">
            Cash flow
          </h3>

          <p className="mt-1 text-xs text-text-lite">
            Income vs expenses
          </p>
        </div>

        <select className="h-9 rounded-lg border border-[#E1E9E5] bg-white px-3 text-xs text-[#63716C] outline-none focus:border-[#1C9A6E]">
          <option >Last 12 months</option>
          <option>Last 7 months</option>
          <option>This year</option>
        </select>
      </div>

      <div className="mt-6 h-70 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="incomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#1C9A6E"
                  stopOpacity={0.2}
                />

                <stop
                  offset="100%"
                  stopColor="#1C9A6E"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="expenseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#E09A8D"
                  stopOpacity={0.12}
                />

                <stop
                  offset="100%"
                  stopColor="#E09A8D"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#EDF1EF"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9AA6A1",
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#9AA6A1",
              }}
              tickFormatter={formatCurrency}
              width={40}
            />

            <Tooltip
              contentStyle={{
                border: "1px solid #E3EBE7",
                borderRadius: "10px",
                boxShadow:
                  "0 10px 30px rgba(21,62,48,.08)",
                fontSize: "12px",
              }}
              formatter={(value) =>
                `৳${Number(value).toLocaleString()}`
              }
            />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#1C9A6E"
              strokeWidth={2.5}
              fill="url(#incomeGradient)"
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#B7C1BD"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-5">
        <div className="flex items-center gap-2 text-xs text-[#718079]">
          <span className="h-2 w-2 rounded-full bg-[#1C9A6E]" />
          Income
        </div>

        <div className="flex items-center gap-2 text-xs text-[#718079]">
          <span className="h-2 w-2 rounded-full bg-[#B7C1BD]" />
          Expenses
        </div>
      </div>
    </div>
  );
}