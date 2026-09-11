import type { TransactionType } from "../../types/transaction";
import { enToBnNumber } from "../../utils/enToBnNumber";
import formatAmount from "../../utils/formatAmount";
import PreviewRow from "./PreviewRow";


export type TableData = {
    date: string;
    title: string;
    amount: number | string;
    total: number;
    type: TransactionType;
};

export type ReducerType = {
    tableData: TableData[];
    total: number;
};


export default function PreviewTable({ tableData, total = 0 }: ReducerType) {
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
            <table className="w-full min-w-150 text-left text-sm text-gray-700">
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
                        rows.map((tdi, i) => (<PreviewRow
                            key={i}
                            date={date}
                            info={tdi}
                            index={i}
                            row_length={rows.length}
                        />))
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
                            {enToBnNumber(formatAmount(total))}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
