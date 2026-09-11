import { useLocation } from "react-router-dom";

import type {
  CreateTransactionFormData,
} from "../../types/transaction";

import { format } from "date-fns";
import { decompressFromBase64 } from "lz-string";
import type { ReducerType, TableData } from "./PreviewTable";
import PreviewTable from "./PreviewTable";




export default function Preview() {
  const { state } = useLocation()
  const date_type: string = state['type'] || ""
  const data_str: string = state["data"] || ""
  if (date_type === "transaction") {
    const data_s = JSON.parse(decompressFromBase64(data_str)) as CreateTransactionFormData[];

    const data: CreateTransactionFormData[] = [
      // {
      //   date: "01/01/2026",
      //   amount: 22310,
      //   description: "Balance B/D",
      //   type: "INCOME",
      //   party_id: ""
      // },
      ...data_s
    ]

    let table_data: ReducerType = {
      tableData: [],
      total: 0,
    };

    table_data = data.reduce<ReducerType>((pre, curr) => {
      if (curr.type === "INCOME" || curr.type === "AR_PAYMENT" || curr.type === "AP") {
        pre.total += Number(curr.amount);
      } else if (curr.type === "EXPENSE" || curr.type === "AR" || curr.type === "AP_PAYMENT") {
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
