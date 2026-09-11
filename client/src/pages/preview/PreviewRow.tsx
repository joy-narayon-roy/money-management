import { enToBnNumber } from "../../utils/enToBnNumber"
import formatAmount from "../../utils/formatAmount"
import get_transaction_type_color, { get_transaction_type_sign } from "../../utils/get_transaction_type_color"
import type { TableData } from "./PreviewTable"

type Props = {
    date: string
    info: TableData
    index: number
    row_length: number
}

export default function PreviewRow(props: Props) {
    const { info: tdi, index: i, date, row_length = 1 } = props

    return (
        <tr
            key={`${date}-${i}`}
            className="transition-colors hover:bg-gray-50"
        >
            {/* Date */}
            {i === 0 && (
                <td
                    rowSpan={row_length}
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
                    "px-6 py-4 font-medium " + get_transaction_type_color(tdi.type)}
            >
                {tdi.title} {" "}
                {tdi.type === "AP" && <>(AP)</>}
                {tdi.type === "AP_PAYMENT" && <del>(AP)</del>}
                {tdi.type === "AR" && <>(AR)</>}
                {tdi.type === "AR_PAYMENT" && <del>(AR)</del>}
            </td>

            {/* Amount */}
            <td
                className={`whitespace-nowrap px-6 py-4 text-right font-medium ${get_transaction_type_color(tdi.type)}`}
            >
                {get_transaction_type_sign(tdi.type)}
                {enToBnNumber(formatAmount(tdi.amount))}
            </td>

            {/* Running Total */}
            <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-gray-900">
                {enToBnNumber(formatAmount(tdi.total))}
                {/* {tdi.total} */}
            </td>
        </tr>

    )
}
