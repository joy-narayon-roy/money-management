import DashboardMockup from "./DashboardMockup";
import style from "../../styles/pages/landing/index.module.css";


export default function Main() {
    return (
        <main>
            <section className={style.hero}>
                <div className={style.heroCopy}>
                    <div className={style.pill}>
                        <span className={style.pillDot} /> Simple money management
                    </div>
                    <h1>
                        Know your money.
                        <br />
                        <span>Own your future.</span>
                    </h1>
                    <p>
                        Track income, expenses, receivables, and payables in one
                        beautifully simple workspace. Get a clear picture of your finances
                        without the spreadsheet headache.
                    </p>
                    <div className={style.heroActions}>
                        <a className={style.primaryCta} href="#get-started">
                            Start managing your money <span>→</span>
                        </a>
                        <a className={style.secondaryCta} href="#features">
                            <span className={style.play}>▶</span> See how it works
                        </a>
                    </div>
                    <div className={style.trust}>
                        <div className={style.avatars}>
                            <span>A</span>
                            <span>M</span>
                            <span>R</span>
                            <span>+</span>
                        </div>
                        <p>
                            <b>Built for clarity.</b>
                            <br />
                            Your finances, finally in one place.
                        </p>
                    </div>
                </div>
                <div className={style.heroVisual}>
                    <div className={style.glow} />
                    <DashboardMockup />
                </div>
            </section>

            <section className={style.proof}>
                <p>EVERYTHING YOU NEED TO STAY ON TOP OF YOUR MONEY</p>
                <div>
                    <span>Income & expenses</span>
                    <span>Receivables</span>
                    <span>Payables</span>
                    <span>Parties</span>
                    <span>Reports</span>
                </div>
            </section>

            <section className={style.features} id="features">
                <div className={style.sectionIntro}>
                    <div className={style.eyebrow + " " + style.greenText}>BUILT AROUND YOUR MONEY</div>
                    <h2>
                        Less tracking.
                        <br />
                        <span>More understanding.</span>
                    </h2>
                    <p>
                        Money Manager turns everyday financial activity into a clear,
                        useful picture you can actually act on.
                    </p>
                </div>
                <div className={style.featureGrid}>
                    <article className={style.featureCard + " " + style.large}>
                        <div className={style.featureIcon}>↗</div>
                        <h3>See everything at a glance.</h3>
                        <p>
                            A focused dashboard gives you your balance, income, expenses,
                            and cash flow without the noise.
                        </p>
                        <div className={style.miniBalance}>
                            <span>Current balance</span>
                            <b>৳85,420.00</b>
                            <div className={style.miniLine}>
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>
                    </article>
                    <article className={style.featureCard}>
                        <div className={style.featureIcon + " " + style.warm}>↔</div>
                        <h3>Every transaction, organized.</h3>
                        <p>
                            Record and find transactions quickly. Keep your financial
                            history clean and searchable.
                        </p>
                        <div className={style.fakeRows}>
                            <i />
                            <i />
                            <i />
                        </div>
                    </article>
                    <article className={style.featureCard}>
                        <div className={style.featureIcon + " " + style.blue}>◉</div>
                        <h3>Know who owes what.</h3>
                        <p>
                            Keep receivables and payables connected to the people you deal
                            with.
                        </p>
                        <div className={style.debt}>
                            <span>Outstanding</span>
                            <b>৳24,500</b>
                        </div>
                    </article>
                </div>
            </section>

            <section className={style.statement} id="reports">
                <div>
                    <div className={style.eyebrow + " " + style.greenText}>A CLEARER FINANCIAL PICTURE</div>
                    <h2>
                        Your money has a story.
                        <br />
                        <span>Make it easy to read.</span>
                    </h2>
                </div>
                <p>
                    From your first transaction to your monthly reports, every detail is
                    designed to help you understand where you stand — and what comes
                    next.
                </p>
            </section>

            <section className={style.steps} id="how">
                <div className={style.sectionIntro + " " + style.centered}>
                    <div className={style.eyebrow + " " + style.greenText}>HOW IT WORKS</div>
                    <h2>Simple from day one.</h2>
                    <p>
                        No complicated setup. Just add your activity and let Money Manager
                        keep things organized.
                    </p>
                </div>
                <div className={style.stepGrid}>
                    <div className={style.step}>
                        <span>01</span>
                        <div className={style.stepIcon}>＋</div>
                        <h3>Add your transactions</h3>
                        <p>
                            Record income, expenses, receivables, and payables in seconds.
                        </p>
                    </div>
                    <div className={style.step}>
                        <span>02</span>
                        <div className={style.stepIcon}>◌</div>
                        <h3>Keep it organized</h3>
                        <p>
                            Connect activity to parties and accounts so everything stays
                            structured.
                        </p>
                    </div>
                    <div className={style.step}>
                        <span>03</span>
                        <div className={style.stepIcon}>↗</div>
                        <h3>Understand your money</h3>
                        <p>
                            Use your dashboard and reports to make decisions with
                            confidence.
                        </p>
                    </div>
                </div>
            </section>

            <section className={style.cta} id="get-started">
                <div className={style.ctaPattern} />
                <div className={style.eyebrow}>READY WHEN YOU ARE</div>
                <h2>Take control of your money.</h2>
                <p>Start with a clearer view of your finances today.</p>
                <a className={style.primaryCta + " " + style.light} href="#login">
                    Get started for free <span>→</span>
                </a>
            </section>
        </main>

    )
}
