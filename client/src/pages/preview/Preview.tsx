import { useSearchParams } from "react-router-dom";
import {
  Create_Transaction_LIST,
  type PreviewType,
} from "../../types/preview";

import type {
  CreateTransactionFormData,
  TransactionType,
} from "../../types/transaction";

import { format } from "date-fns";
import { decompressFromBase64 } from "lz-string";

type TableData = {
  date: string;
  title: string;
  amount: number | string;
  total: number;
  type: TransactionType;
};

type ReducerType = {
  tableData: TableData[];
  total: number;
};

function PreviewTable({ tableData, total = 0 }: ReducerType) {
  // Group rows by date
  const groupedData = tableData.reduce<Record<string, TableData[]>>(
    (groups, item) => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }

      groups[item.date].push(item);

      return groups;
    },
    {}
  );

  return (
    <div className="max-w-3xl mx-auto mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[600px] text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th className="w-40 px-6 py-4 font-semibold">
              Date
            </th>

            <th className="px-6 py-4 font-semibold">
              Title
            </th>

            <th className="px-6 py-4 text-right font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-right font-semibold">
              Total
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {Object.entries(groupedData).map(([date, rows]) =>
            rows.map((tdi, i) => (
              <tr
                key={`${date}-${i}`}
                className="transition-colors hover:bg-gray-50"
              >
                {/* Date */}
                {i === 0 && (
                  <td
                    rowSpan={rows.length}
                    className="
                      w-40
                      whitespace-nowrap
                      px-6
                      py-4
                      text-center
                      align-middle
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-gray-500
                      bg-gray-50
                    "
                  >
                    {date}
                  </td>
                )}

                {/* Title */}
                <td
                  className={
                    "px-6 py-4 font-medium " +
                    (tdi.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600")
                  }
                >
                  {tdi.title}
                </td>

                {/* Amount */}
                <td
                  className={`whitespace-nowrap px-6 py-4 text-right font-medium ${tdi.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {tdi.type === "INCOME" ? "+" : "-"}
                  {tdi.amount}
                </td>

                {/* Running Total */}
                <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-gray-900">
                  {tdi.total}
                </td>
              </tr>
            ))
          )}
        </tbody>

        <tfoot className="border-t-2 border-gray-200 bg-gray-50">
          <tr>
            <td
              colSpan={2}
              className="px-6 py-4 font-semibold text-gray-700"
            >
              Total
            </td>

            <td className="px-6 py-4"></td>

            <td
              className={`px-6 py-4 text-right text-base font-bold ${total >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}



export default function Preview() {
  const [sp] = useSearchParams({});

  const date_type = (sp.get("type") || "") as PreviewType;
  const data_str = sp.get("data") || "{}";

  if (date_type === Create_Transaction_LIST) {
    const data = JSON.parse(decompressFromBase64(data_str)) as CreateTransactionFormData[];

    let table_data: ReducerType = {
      tableData: [],
      total: 0,
    };

    table_data = data.reduce<ReducerType>((pre, curr) => {
      if (curr.type === "INCOME") {
        pre.total += Number(curr.amount);
      } else if (curr.type === "EXPENSE") {
        pre.total -= Number(curr.amount);
      }

      const td: TableData = {
        date: format(new Date(curr.date), "dd/MM/yyyy"),
        amount: curr.amount,
        title: curr.description,
        total: pre.total,
        type: curr.type,
      };

      pre.tableData.push(td);

      return { ...pre };
    }, table_data);

    return (
      <PreviewTable
        tableData={table_data.tableData}
        total={table_data.total}
      />
    );
  }

  return <div>Preview</div>;
}
