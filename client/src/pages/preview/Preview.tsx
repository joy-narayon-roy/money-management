import { useLocation, useNavigate } from "react-router-dom";

import type {
  CreateTransactionFormData,
} from "../../types/transaction";

import { format } from "date-fns";
import { decompressFromBase64 } from "lz-string";
import type { ReducerType, TableData } from "./PreviewTable";
import PreviewTable from "./PreviewTable";
import { ArrowLeft } from "lucide-react";




export default function Preview() {
  const { state } = useLocation()
  const nav = useNavigate()
  const date_type: string = state['type'] || ""
  const data_str: string = state["data"] || ""
  if (date_type === "transaction") {
    const data_s = JSON.parse(decompressFromBase64(data_str)) as CreateTransactionFormData[];

    const data: CreateTransactionFormData[] = [
      ...data_s
    ]

    let table_data: ReducerType = {
      tableData: [],
      total: 0,
    };

    table_data = data.reduce<ReducerType>((pre, curr) => {
      if (curr.type === "INCOME" || curr.type === "AR_PAYMENT" || curr.type === "AP") {
        pre.total += Number(curr.amount);
      } else if (curr.type === "EXPENSE" || curr.type === "INCOME_AR" || curr.type === "AR" || curr.type === "AP_PAYMENT") {
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
      <>
        <button
          className="mt-3 ml-3"
          onClick={() => nav(-1)}
        ><ArrowLeft /></button>
        <PreviewTable
          tableData={table_data.tableData}
          total={table_data.total}
        />
      </>
    );
  }

  return <div>Preview</div>;
}
