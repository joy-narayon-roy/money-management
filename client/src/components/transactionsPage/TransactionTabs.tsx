import { useSearchParams } from "react-router-dom";

const tabs = [
  { label: "All", value: "ALL" },
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
  { label: "Receivable", value: "AR" },
  { label: "AR payment", value: "AR_PAYMENT" },
  { label: "Payable", value: "AP" },
  { label: "AP payment", value: "AP_PAYMENT" },
];


const TransactionTabs = () => {
  const [sp, setSp] = useSearchParams({
    tab: "ALL"
  })

  const setActive = (tab_name: string) => {
    setSp(pre => {
      pre.set("tab", tab_name)
      return pre
    })
  }
  // const [active, setActive] = useState("ALL");
  const activeTab = sp.get("tab") || "ALL"
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-[#E2E8F0]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`relative whitespace-nowrap pb-3.5 text-[13px] font-medium transition-colors ${isActive
              ? "text-[#059669]"
              : "text-[#64748B] hover:text-[#1E293B]"
              }`}
          >
            {tab.label}

            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#10B981]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TransactionTabs;