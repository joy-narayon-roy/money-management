import style from "../../styles/pages/landing/index.module.css";

const transactions = [
    {
        icon: "↗",
        name: "Salary",
        category: "Income",
        amount: "+৳42,000",
        positive: true,
    },
    { icon: "⌂", name: "House Rent", category: "Housing", amount: "−৳15,000" },
    { icon: "🛒", name: "Groceries", category: "Food", amount: "−৳3,250" },
    {
        icon: "↗",
        name: "Freelance",
        category: "Income",
        amount: "+৳8,500",
        positive: true,
    },
];

export default function DashboardMockup() {
    return (
        <div className={style.browser}>
            <div className={style.browserTop}>
                <div className={style.traffic}>
                    <i />
                    <i />
                    <i />
                </div>
                <div className={style.address}>app.moneymanager.local/dashboard</div>
            </div>
            <div className={style.appShell}>
                <aside className={style.side}>
                    <div className={style.miniBrand}>
                        <div className={style.miniLogo}>↗</div>
                        <b>Money Manager</b>
                    </div>
                    <div className={style.sideSection}>
                        <span className={style.sideLabel}>MAIN</span>
                        <a className={style.active}>
                            ⌂ <span>Dashboard</span>
                        </a>
                        <a>
                            ↔ <span>Transactions</span>
                        </a>
                        <a>
                            ◉ <span>Parties</span>
                        </a>
                        <a>
                            ▣ <span>Accounts</span>
                        </a>
                    </div>
                    <div className={style.sideSection}>
                        <span className={style.sideLabel}>FINANCE</span>
                        <a>
                            ↙ <span>Receivables</span>
                        </a>
                        <a>
                            ↗ <span>Payables</span>
                        </a>
                        <a>
                            ◫ <span>Reports</span>
                        </a>
                    </div>
                    <div className={style.sideBottom}>
                        ⚙ <span>Settings</span>
                    </div>
                </aside>
                <main className={style.dash}>
                    <div className={style.dashHead}>
                        <div>
                            <p className={style.eyebrow}>FRIDAY, AUGUST 8</p>
                            <h3>
                                Good morning, Alex <span>👋</span>
                            </h3>
                        </div>
                        <button className={style.addBtn}>+ Add transaction</button>
                    </div>
                    <div className={style.statGrid}>
                        <div className={style.stat + " " + style.primary}>
                            <span>Current balance</span>
                            <strong>৳85,420</strong>
                            <small>
                                ↑ 12.8% <em>vs last month</em>
                            </small>
                        </div>
                        <div className={style.stat}>
                            <span>Total income</span>
                            <strong>৳42,000</strong>
                            <small>
                                ↑ 8.4% <em>this month</em>
                            </small>
                        </div>
                        <div className={style.stat}>
                            <span>Total expenses</span>
                            <strong>৳18,500</strong>
                            <small>
                                ↓ 4.2% <em>this month</em>
                            </small>
                        </div>
                    </div>
                    <div className={style.dashGrid}>
                        <div className={style.panel + " " + style.chartPanel}>
                            <div className={style.panelHead}>
                                <div>
                                    <b>Cash flow</b>
                                    <span>Income vs expenses</span>
                                </div>
                                <button>Last 7 months⌄</button>
                            </div>
                            <div className={style.chart}>
                                <div className={style.ylabels}>
                                    <span>50k</span>
                                    <span>40k</span>
                                    <span>30k</span>
                                    <span>20k</span>
                                    <span>10k</span>
                                    <span>0</span>
                                </div>
                                <svg
                                    viewBox="0 0 560 190"
                                    preserveAspectRatio="none"
                                    aria-label="cash flow chart"
                                >
                                    <defs>
                                        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#1f9d70" stopOpacity=".20" />
                                            <stop offset="100%" stopColor="#1f9d70" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,143 C45,125 70,137 112,108 S170,85 210,112 S270,55 315,73 S380,112 420,69 S480,50 560,28 L560,190 L0,190Z"
                                        fill="url(#area)"
                                    />
                                    <path
                                        d="M0,143 C45,125 70,137 112,108 S170,85 210,112 S270,55 315,73 S380,112 420,69 S480,50 560,28"
                                        fill="none"
                                        stroke="#1f9d70"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M0,165 C50,160 78,148 115,151 S178,150 210,164 S270,139 315,151 S385,161 420,137 S490,148 560,126"
                                        fill="none"
                                        stroke="#a9b6b0"
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                    />
                                </svg>
                                <div className={style.xlabels}>
                                    <span>Feb</span>
                                    <span>Mar</span>
                                    <span>Apr</span>
                                    <span>May</span>
                                    <span>Jun</span>
                                    <span>Jul</span>
                                    <span>Aug</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.panel}>
                            <div className={style.panelHead}>
                                <div>
                                    <b>Recent transactions</b>
                                    <span>Latest activity</span>
                                </div>
                                <button className={style.linkBtn}>View all</button>
                            </div>
                            <div className={style.txns}>
                                {transactions.map((t) => (
                                    <div className={style.txn} key={t.name}>
                                        <div className={style.txIcon + " " + (t.positive ? style.green : "")}>
                                            {t.icon}
                                        </div>
                                        <div className={style.txInfo}>
                                            <b>{t.name}</b>
                                            <span>{t.category}</span>
                                        </div>
                                        <strong className={t.positive ? style.positive : ""}>
                                            {t.amount}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
