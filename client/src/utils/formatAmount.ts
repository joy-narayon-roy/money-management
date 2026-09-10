export default function formatAmount(n: string | number) {
  const num = Number(n);
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    currencySign: "standard",
    compactDisplay: "short",
    maximumFractionDigits: 0,
  });
}
