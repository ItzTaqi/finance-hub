// FinanceHub - Application Logic

// Initialize data from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let investments = JSON.parse(localStorage.getItem('investments')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];
let moduleProgress = JSON.parse(localStorage.getItem('moduleProgress')) || {
    basics: 0,
    investing: 0,
    crypto: 0,
    retirement: 0,
    taxes: 0,
    credit: 0
};

// Learning module content
const modules = {
    basics: {
        title: "Finance Basics",
        icon: "📚",
        lessons: [
            {
                title: "Understanding Money",
                content: `
                    <h4>What is Money?</h4>
                    <p>Money is a medium of exchange that allows us to trade goods and services. Understanding how money works is the foundation of financial literacy.</p>
                    
                    <h4>Key Concepts:</h4>
                    <ul>
                        <li><strong>Income:</strong> Money you earn from work, investments, or other sources</li>
                        <li><strong>Expenses:</strong> Money you spend on goods and services</li>
                        <li><strong>Savings:</strong> Money you set aside for future use</li>
                        <li><strong>Assets:</strong> Things you own that have value</li>
                        <li><strong>Liabilities:</strong> Debts or obligations you owe</li>
                    </ul>
                    
                    <h4>The Golden Rule:</h4>
                    <p style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <strong>Income - Expenses = Savings</strong><br>
                        Always aim to spend less than you earn and save the difference!
                    </p>
                `
            },
            {
                title: "Budgeting 101",
                content: `
                    <h4>Why Budget?</h4>
                    <p>A budget is a plan for your money. It helps you track where your money goes and ensures you're spending wisely.</p>
                    
                    <h4>The 50/30/20 Rule:</h4>
                    <ul>
                        <li><strong>50% Needs:</strong> Essential expenses (rent, food, utilities, transportation)</li>
                        <li><strong>30% Wants:</strong> Non-essential spending (entertainment, dining out, hobbies)</li>
                        <li><strong>20% Savings:</strong> Emergency fund, retirement, investments</li>
                    </ul>
                    
                    <h4>Steps to Create a Budget:</h4>
                    <ol>
                        <li>Calculate your monthly income</li>
                        <li>List all your expenses</li>
                        <li>Categorize expenses as needs or wants</li>
                        <li>Set spending limits for each category</li>
                        <li>Track your spending throughout the month</li>
                        <li>Adjust as needed</li>
                    </ol>
                    
                    <p style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        💡 <strong>Pro Tip:</strong> Use the Budget Manager in this app to track your transactions automatically!
                    </p>
                `
            },
            {
                title: "Compound Interest",
                content: `
                    <h4>The Magic of Compound Interest</h4>
                    <p>Compound interest is when you earn interest on your interest. It's one of the most powerful concepts in finance!</p>
                    
                    <h4>How It Works:</h4>
                    <p>When you invest money, you earn interest. With compound interest, that interest is added to your principal, and you earn interest on the new total.</p>
                    
                    <h4>Example:</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Initial Investment:</strong> $1,000</p>
                        <p><strong>Annual Interest Rate:</strong> 8%</p>
                        <p><strong>Time Period:</strong> 10 years</p>
                        <p><strong>Result:</strong> $2,158.92</p>
                        <p style="color: var(--secondary); font-weight: 600;">You earned $1,158.92 in interest!</p>
                    </div>
                    
                    <h4>The Rule of 72:</h4>
                    <p>Want to know how long it takes to double your money? Divide 72 by your interest rate!</p>
                    <p>Example: At 8% interest, your money doubles in approximately 72 ÷ 8 = 9 years</p>
                    
                    <p style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        🚀 <strong>Key Takeaway:</strong> Start investing early! Time is your greatest asset when it comes to compound interest.
                    </p>
                `
            }
        ],
        quiz: {
            question: "According to the 50/30/20 rule, what percentage of your income should go to savings?",
            options: ["10%", "20%", "30%", "50%"],
            correct: 1
        }
    },
    investing: {
        title: "Investing 101",
        icon: "📈",
        lessons: [
            {
                title: "What is Investing?",
                content: `
                    <h4>Investing vs. Saving</h4>
                    <p>While saving keeps your money safe, investing puts your money to work to grow over time.</p>
                    
                    <h4>Why Invest?</h4>
                    <ul>
                        <li><strong>Beat Inflation:</strong> Investments typically grow faster than inflation</li>
                        <li><strong>Build Wealth:</strong> Grow your money over time through compound returns</li>
                        <li><strong>Reach Goals:</strong> Achieve long-term financial objectives</li>
                        <li><strong>Passive Income:</strong> Generate income without active work</li>
                    </ul>
                    
                    <h4>Risk vs. Return:</h4>
                    <p>Higher potential returns usually come with higher risk. The key is finding the right balance for your situation.</p>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Low Risk, Low Return:</strong> Savings accounts, bonds</p>
                        <p><strong>Medium Risk, Medium Return:</strong> Index funds, ETFs</p>
                        <p><strong>High Risk, High Return:</strong> Individual stocks, crypto</p>
                    </div>
                `
            },
            {
                title: "Types of Investments",
                content: `
                    <h4>Stocks</h4>
                    <p>Buying shares of a company makes you a partial owner. You profit when the company grows and the stock price increases.</p>
                    
                    <h4>Bonds</h4>
                    <p>Lending money to governments or corporations. They pay you interest over time and return your principal at maturity.</p>
                    
                    <h4>ETFs (Exchange-Traded Funds)</h4>
                    <p>Baskets of stocks or bonds that trade like individual stocks. Great for diversification!</p>
                    
                    <h4>Index Funds</h4>
                    <p>Mutual funds that track a market index (like S&P 500). Low fees and broad market exposure.</p>
                    
                    <h4>Real Estate</h4>
                    <p>Property investments that can generate rental income and appreciate in value.</p>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        💡 <strong>Beginner Tip:</strong> Start with low-cost index funds or ETFs for instant diversification!
                    </div>
                `
            },
            {
                title: "Diversification",
                content: `
                    <h4>Don't Put All Your Eggs in One Basket</h4>
                    <p>Diversification means spreading your investments across different assets to reduce risk.</p>
                    
                    <h4>Why Diversify?</h4>
                    <ul>
                        <li>Reduces impact of any single investment failing</li>
                        <li>Smooths out portfolio volatility</li>
                        <li>Captures growth from multiple sectors</li>
                        <li>Protects against market downturns</li>
                    </ul>
                    
                    <h4>How to Diversify:</h4>
                    <ol>
                        <li><strong>Asset Classes:</strong> Mix stocks, bonds, real estate</li>
                        <li><strong>Sectors:</strong> Invest in different industries (tech, healthcare, energy)</li>
                        <li><strong>Geography:</strong> Include international investments</li>
                        <li><strong>Company Size:</strong> Combine large-cap, mid-cap, and small-cap stocks</li>
                    </ol>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Sample Diversified Portfolio:</strong></p>
                        <p>60% Stock Index Funds</p>
                        <p>30% Bond Funds</p>
                        <p>10% International Stocks</p>
                    </div>
                `
            }
        ],
        quiz: {
            question: "What is the main benefit of diversification?",
            options: [
                "Guarantees higher returns",
                "Reduces risk by spreading investments",
                "Eliminates all investment risk",
                "Increases transaction fees"
            ],
            correct: 1
        }
    },
    crypto: {
        title: "Cryptocurrency",
        icon: "₿",
        lessons: [
            {
                title: "What is Cryptocurrency?",
                content: `
                    <h4>Digital Money Revolution</h4>
                    <p>Cryptocurrency is digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit.</p>
                    
                    <h4>Key Features:</h4>
                    <ul>
                        <li><strong>Decentralized:</strong> No central authority controls it</li>
                        <li><strong>Blockchain:</strong> Transactions recorded on a public ledger</li>
                        <li><strong>Secure:</strong> Protected by advanced cryptography</li>
                        <li><strong>Transparent:</strong> All transactions are publicly visible</li>
                        <li><strong>Global:</strong> Send money anywhere instantly</li>
                    </ul>
                    
                    <h4>Popular Cryptocurrencies:</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Bitcoin (BTC):</strong> The first and most valuable cryptocurrency</p>
                        <p><strong>Ethereum (ETH):</strong> Platform for smart contracts and dApps</p>
                        <p><strong>Others:</strong> Cardano, Solana, Polkadot, and thousands more</p>
                    </div>
                `
            },
            {
                title: "Blockchain Technology",
                content: `
                    <h4>The Foundation of Crypto</h4>
                    <p>Blockchain is a distributed ledger technology that records transactions across many computers.</p>
                    
                    <h4>How It Works:</h4>
                    <ol>
                        <li>Transaction is initiated</li>
                        <li>Transaction is broadcast to network</li>
                        <li>Network validates the transaction</li>
                        <li>Transaction is added to a "block"</li>
                        <li>Block is added to the chain</li>
                        <li>Transaction is complete</li>
                    </ol>
                    
                    <h4>Benefits of Blockchain:</h4>
                    <ul>
                        <li>Immutable - can't be changed once recorded</li>
                        <li>Transparent - everyone can see transactions</li>
                        <li>Secure - protected by cryptography</li>
                        <li>Decentralized - no single point of failure</li>
                    </ul>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        🔗 <strong>Beyond Currency:</strong> Blockchain has applications in supply chain, healthcare, voting, and more!
                    </div>
                `
            },
            {
                title: "Crypto Investment Strategies",
                content: `
                    <h4>Investing in Cryptocurrency</h4>
                    <p>Crypto is highly volatile but offers significant growth potential. Here's how to invest wisely.</p>
                    
                    <h4>Investment Strategies:</h4>
                    <ul>
                        <li><strong>HODL:</strong> Buy and hold long-term despite volatility</li>
                        <li><strong>Dollar-Cost Averaging:</strong> Invest fixed amounts regularly</li>
                        <li><strong>Diversification:</strong> Don't put everything in one coin</li>
                        <li><strong>Research:</strong> Understand the technology and use case</li>
                    </ul>
                    
                    <h4>Risk Management:</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p>⚠️ <strong>Only invest what you can afford to lose</strong></p>
                        <p>🔒 Use secure wallets and exchanges</p>
                        <p>📊 Limit crypto to 5-10% of your portfolio</p>
                        <p>📚 Continuously educate yourself</p>
                        <p>🚫 Avoid FOMO (Fear of Missing Out) investing</p>
                    </div>
                    
                    <h4>Getting Started:</h4>
                    <ol>
                        <li>Choose a reputable exchange (Coinbase, Binance, Kraken)</li>
                        <li>Complete identity verification</li>
                        <li>Start with small amounts</li>
                        <li>Use two-factor authentication</li>
                        <li>Consider a hardware wallet for large holdings</li>
                    </ol>
                `
            }
        ],
        quiz: {
            question: "What is the recommended maximum percentage of your portfolio to allocate to cryptocurrency?",
            options: ["1-2%", "5-10%", "25-30%", "50%+"],
            correct: 1
        }
    },
    retirement: {
        title: "Retirement Planning",
        icon: "🏖️",
        lessons: [
            {
                title: "Why Start Early?",
                content: `
                    <h4>The Power of Time</h4>
                    <p>Starting retirement savings early is one of the best financial decisions you can make.</p>
                    
                    <h4>Example: Starting at 25 vs. 35</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Starting at 25:</strong></p>
                        <p>$500/month for 40 years at 7% = $1,310,000</p>
                        <p style="margin-top: 12px;"><strong>Starting at 35:</strong></p>
                        <p>$500/month for 30 years at 7% = $566,000</p>
                        <p style="color: var(--primary); font-weight: 600; margin-top: 12px;">
                            10 years = $744,000 difference!
                        </p>
                    </div>
                    
                    <h4>Key Principles:</h4>
                    <ul>
                        <li>Start as early as possible</li>
                        <li>Contribute consistently</li>
                        <li>Take advantage of employer matches</li>
                        <li>Increase contributions with raises</li>
                        <li>Don't touch retirement savings early</li>
                    </ul>
                `
            },
            {
                title: "Retirement Accounts",
                content: `
                    <h4>401(k) Plans</h4>
                    <p>Employer-sponsored retirement accounts with tax advantages.</p>
                    <ul>
                        <li>Contributions reduce taxable income</li>
                        <li>Employer may match contributions (free money!)</li>
                        <li>2024 limit: $23,000/year ($30,500 if 50+)</li>
                        <li>Taxes paid on withdrawal in retirement</li>
                    </ul>
                    
                    <h4>Traditional IRA</h4>
                    <p>Individual retirement account with tax-deductible contributions.</p>
                    <ul>
                        <li>2024 limit: $7,000/year ($8,000 if 50+)</li>
                        <li>Tax deduction now, pay taxes later</li>
                        <li>Required withdrawals at age 73</li>
                    </ul>
                    
                    <h4>Roth IRA</h4>
                    <p>Contributions with after-tax dollars, tax-free withdrawals.</p>
                    <ul>
                        <li>Same contribution limits as Traditional IRA</li>
                        <li>No taxes on qualified withdrawals</li>
                        <li>No required minimum distributions</li>
                        <li>Income limits apply</li>
                    </ul>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        💡 <strong>Pro Strategy:</strong> Max out employer 401(k) match first, then contribute to Roth IRA!
                    </div>
                `
            },
            {
                title: "Retirement Planning Steps",
                content: `
                    <h4>Creating Your Retirement Plan</h4>
                    
                    <h4>Step 1: Calculate Your Needs</h4>
                    <p>Estimate how much you'll need in retirement. A common rule: 80% of pre-retirement income.</p>
                    
                    <h4>Step 2: Determine Your Timeline</h4>
                    <p>How many years until retirement? This affects your investment strategy.</p>
                    
                    <h4>Step 3: Choose Your Accounts</h4>
                    <p>Select the right mix of 401(k), IRA, and other accounts.</p>
                    
                    <h4>Step 4: Set Contribution Goals</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Recommended Savings Rate:</strong></p>
                        <p>In your 20s: 10-15% of income</p>
                        <p>In your 30s: 15-20% of income</p>
                        <p>In your 40s: 20-25% of income</p>
                        <p>In your 50s+: 25-30% of income</p>
                    </div>
                    
                    <h4>Step 5: Invest Appropriately</h4>
                    <p>Younger = more stocks, Older = more bonds</p>
                    
                    <h4>Step 6: Review Annually</h4>
                    <p>Adjust your plan as life circumstances change.</p>
                `
            }
        ],
        quiz: {
            question: "What is the main advantage of a Roth IRA over a Traditional IRA?",
            options: [
                "Higher contribution limits",
                "Tax-free withdrawals in retirement",
                "No income limits",
                "Employer matching"
            ],
            correct: 1
        }
    },
    taxes: {
        title: "Taxes & Deductions",
        icon: "📋",
        lessons: [
            {
                title: "Understanding Taxes",
                content: `
                    <h4>How Income Tax Works</h4>
                    <p>The U.S. uses a progressive tax system - you pay different rates on different portions of your income.</p>
                    
                    <h4>2024 Tax Brackets (Single Filers):</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p>10% on income up to $11,600</p>
                        <p>12% on income $11,601 to $47,150</p>
                        <p>22% on income $47,151 to $100,525</p>
                        <p>24% on income $100,526 to $191,950</p>
                        <p>32% on income $191,951 to $243,725</p>
                        <p>35% on income $243,726 to $609,350</p>
                        <p>37% on income over $609,350</p>
                    </div>
                    
                    <h4>Important Concepts:</h4>
                    <ul>
                        <li><strong>Gross Income:</strong> Total income before deductions</li>
                        <li><strong>Adjusted Gross Income (AGI):</strong> Gross income minus adjustments</li>
                        <li><strong>Taxable Income:</strong> AGI minus deductions</li>
                        <li><strong>Tax Credits:</strong> Direct reductions in tax owed</li>
                        <li><strong>Tax Deductions:</strong> Reduce taxable income</li>
                    </ul>
                `
            },
            {
                title: "Common Deductions",
                content: `
                    <h4>Standard vs. Itemized Deductions</h4>
                    <p>You can take either the standard deduction or itemize - choose whichever is higher!</p>
                    
                    <h4>2024 Standard Deduction:</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p>Single: $14,600</p>
                        <p>Married Filing Jointly: $29,200</p>
                        <p>Head of Household: $21,900</p>
                    </div>
                    
                    <h4>Common Itemized Deductions:</h4>
                    <ul>
                        <li><strong>Mortgage Interest:</strong> Interest on home loans</li>
                        <li><strong>State and Local Taxes:</strong> Up to $10,000</li>
                        <li><strong>Charitable Donations:</strong> Gifts to qualified organizations</li>
                        <li><strong>Medical Expenses:</strong> Exceeding 7.5% of AGI</li>
                    </ul>
                    
                    <h4>Above-the-Line Deductions:</h4>
                    <ul>
                        <li>Student loan interest (up to $2,500)</li>
                        <li>IRA contributions</li>
                        <li>Health Savings Account (HSA) contributions</li>
                        <li>Self-employment tax deduction</li>
                    </ul>
                `
            },
            {
                title: "Tax Optimization Strategies",
                content: `
                    <h4>Smart Tax Planning</h4>
                    <p>Legal strategies to minimize your tax burden and keep more of your money.</p>
                    
                    <h4>Key Strategies:</h4>
                    
                    <h5>1. Maximize Retirement Contributions</h5>
                    <p>401(k) and Traditional IRA contributions reduce taxable income now.</p>
                    
                    <h5>2. Use Tax-Advantaged Accounts</h5>
                    <ul>
                        <li>HSA for medical expenses</li>
                        <li>529 plans for education</li>
                        <li>FSA for dependent care</li>
                    </ul>
                    
                    <h5>3. Tax-Loss Harvesting</h5>
                    <p>Sell losing investments to offset capital gains.</p>
                    
                    <h5>4. Timing Income and Deductions</h5>
                    <p>Defer income or accelerate deductions when beneficial.</p>
                    
                    <h5>5. Charitable Giving</h5>
                    <p>Donate appreciated assets for double tax benefit.</p>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        💡 <strong>Pro Tip:</strong> Consider working with a tax professional for personalized advice!
                    </div>
                    
                    <h4>Record Keeping:</h4>
                    <ul>
                        <li>Keep receipts for deductible expenses</li>
                        <li>Track charitable donations</li>
                        <li>Save investment statements</li>
                        <li>Document business expenses</li>
                        <li>Maintain records for 3-7 years</li>
                    </ul>
                `
            }
        ],
        quiz: {
            question: "What is the 2024 standard deduction for a single filer?",
            options: ["$12,950", "$13,850", "$14,600", "$15,000"],
            correct: 2
        }
    },
    credit: {
        title: "Credit & Debt",
        icon: "💳",
        lessons: [
            {
                title: "Understanding Credit Scores",
                content: `
                    <h4>What is a Credit Score?</h4>
                    <p>A three-digit number (300-850) that represents your creditworthiness. Higher is better!</p>
                    
                    <h4>Credit Score Ranges:</h4>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p>800-850: Exceptional</p>
                        <p>740-799: Very Good</p>
                        <p>670-739: Good</p>
                        <p>580-669: Fair</p>
                        <p>300-579: Poor</p>
                    </div>
                    
                    <h4>What Affects Your Score:</h4>
                    <ul>
                        <li><strong>Payment History (35%):</strong> Pay on time, every time</li>
                        <li><strong>Credit Utilization (30%):</strong> Keep balances low (under 30%)</li>
                        <li><strong>Credit History Length (15%):</strong> Older accounts help</li>
                        <li><strong>Credit Mix (10%):</strong> Different types of credit</li>
                        <li><strong>New Credit (10%):</strong> Limit new applications</li>
                    </ul>
                    
                    <h4>Why It Matters:</h4>
                    <p>Good credit scores lead to:</p>
                    <ul>
                        <li>Lower interest rates on loans</li>
                        <li>Better credit card offers</li>
                        <li>Easier apartment approvals</li>
                        <li>Lower insurance premiums</li>
                        <li>Better job prospects (some employers check)</li>
                    </ul>
                `
            },
            {
                title: "Building Good Credit",
                content: `
                    <h4>Starting Your Credit Journey</h4>
                    <p>Building credit takes time, but these strategies will set you on the right path.</p>
                    
                    <h4>Step-by-Step Guide:</h4>
                    
                    <h5>1. Get Your First Credit Card</h5>
                    <ul>
                        <li>Student credit cards</li>
                        <li>Secured credit cards</li>
                        <li>Become an authorized user</li>
                    </ul>
                    
                    <h5>2. Use Credit Responsibly</h5>
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p>✅ Pay full balance each month</p>
                        <p>✅ Keep utilization under 30%</p>
                        <p>✅ Set up automatic payments</p>
                        <p>✅ Check statements regularly</p>
                        <p>❌ Don't max out cards</p>
                        <p>❌ Don't miss payments</p>
                        <p>❌ Don't close old accounts</p>
                    </div>
                    
                    <h5>3. Monitor Your Credit</h5>
                    <ul>
                        <li>Check credit reports annually (free at annualcreditreport.com)</li>
                        <li>Use free credit monitoring services</li>
                        <li>Dispute errors immediately</li>
                    </ul>
                    
                    <h5>4. Diversify Credit Types</h5>
                    <p>Over time, add different types of credit:</p>
                    <ul>
                        <li>Credit cards</li>
                        <li>Auto loans</li>
                        <li>Student loans</li>
                        <li>Personal loans</li>
                    </ul>
                `
            },
            {
                title: "Managing Debt",
                content: `
                    <h4>Good Debt vs. Bad Debt</h4>
                    
                    <h5>Good Debt (Can Build Wealth):</h5>
                    <ul>
                        <li>Student loans (increases earning potential)</li>
                        <li>Mortgage (builds equity)</li>
                        <li>Business loans (generates income)</li>
                    </ul>
                    
                    <h5>Bad Debt (Drains Wealth):</h5>
                    <ul>
                        <li>High-interest credit cards</li>
                        <li>Payday loans</li>
                        <li>Unnecessary consumer debt</li>
                    </ul>
                    
                    <h4>Debt Payoff Strategies:</h4>
                    
                    <h5>1. Avalanche Method</h5>
                    <p>Pay off highest interest rate debt first. Saves most money.</p>
                    
                    <h5>2. Snowball Method</h5>
                    <p>Pay off smallest balance first. Provides psychological wins.</p>
                    
                    <h5>3. Debt Consolidation</h5>
                    <p>Combine multiple debts into one lower-interest loan.</p>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <h5>Sample Debt Payoff Plan:</h5>
                        <p>1. List all debts with balances and interest rates</p>
                        <p>2. Make minimum payments on all debts</p>
                        <p>3. Put extra money toward target debt</p>
                        <p>4. Once paid off, roll payment to next debt</p>
                        <p>5. Repeat until debt-free!</p>
                    </div>
                    
                    <h4>Avoiding Debt Traps:</h4>
                    <ul>
                        <li>Live below your means</li>
                        <li>Build an emergency fund</li>
                        <li>Avoid lifestyle inflation</li>
                        <li>Use credit cards wisely</li>
                        <li>Say no to unnecessary purchases</li>
                    </ul>
                `
            }
        ],
        quiz: {
            question: "What percentage of your credit score is determined by payment history?",
            options: ["15%", "25%", "35%", "50%"],
            correct: 2
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for transaction form
    document.getElementById('transactionDate').valueAsDate = new Date();
    
    // Load saved data
    loadTransactions();
    loadInvestments();
    loadGoals();
    updateDashboard();
    updateModuleProgress();
    
    // Setup navigation
    setupNavigation();
});

// Navigation
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    // Close any open modules
    closeModule();
}

// Transaction Management
function addTransaction(event) {
    event.preventDefault();
    
    const transaction = {
        id: Date.now(),
        type: document.getElementById('transactionType').value,
        category: document.getElementById('transactionCategory').value,
        amount: parseFloat(document.getElementById('transactionAmount').value),
        date: document.getElementById('transactionDate').value,
        description: document.getElementById('transactionDescription').value || '-'
    };
    
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Reset form
    document.getElementById('transactionForm').reset();
    document.getElementById('transactionDate').valueAsDate = new Date();
    
    // Update UI
    loadTransactions();
    updateDashboard();
}

function loadTransactions() {
    const tbody = document.getElementById('transactionTableBody');
    
    if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--gray);">No transactions yet. Add your first transaction above!</td></tr>';
        updateBudgetSummary();
        return;
    }
    
    // Sort by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = sortedTransactions.map(t => `
        <tr>
            <td>${new Date(t.date).toLocaleDateString()}</td>
            <td><span style="padding: 4px 8px; background: ${t.type === 'income' ? 'var(--secondary)' : 'var(--danger)'}; color: white; border-radius: 4px; font-size: 12px;">${t.type.toUpperCase()}</span></td>
            <td>${t.category}</td>
            <td>${t.description}</td>
            <td style="font-weight: 600; color: ${t.type === 'income' ? 'var(--secondary)' : 'var(--danger)'};">${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</td>
            <td><button class="btn btn-danger" style="padding: 6px 12px; font-size: 13px;" onclick="deleteTransaction(${t.id})">Delete</button></td>
        </tr>
    `).join('');
    
    updateBudgetSummary();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    loadTransactions();
    updateDashboard();
}

function clearTransactions() {
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactions();
        updateDashboard();
    }
}

function updateBudgetSummary() {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const net = income - expenses;
    
    document.getElementById('summaryIncome').textContent = `$${income.toFixed(2)}`;
    document.getElementById('summaryExpenses').textContent = `$${expenses.toFixed(2)}`;
    document.getElementById('summaryNet').textContent = `$${net.toFixed(2)}`;
    document.getElementById('summaryNet').style.color = net >= 0 ? 'var(--secondary)' : 'var(--danger)';
}

// Investment Management
function addInvestment(event) {
    event.preventDefault();
    
    const quantity = parseFloat(document.getElementById('investmentQuantity').value);
    const purchasePrice = parseFloat(document.getElementById('investmentPrice').value);
    const currentPrice = parseFloat(document.getElementById('investmentCurrentPrice').value);
    
    const investment = {
        id: Date.now(),
        type: document.getElementById('investmentType').value,
        symbol: document.getElementById('investmentSymbol').value.toUpperCase(),
        quantity: quantity,
        purchasePrice: purchasePrice,
        currentPrice: currentPrice,
        totalInvested: quantity * purchasePrice,
        currentValue: quantity * currentPrice
    };
    
    investments.push(investment);
    localStorage.setItem('investments', JSON.stringify(investments));
    
    // Reset form
    document.getElementById('investmentForm').reset();
    
    // Update UI
    loadInvestments();
    updateDashboard();
}

function loadInvestments() {
    const grid = document.getElementById('investmentGrid');
    
    if (investments.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--gray); grid-column: 1/-1; padding: 40px;">No investments yet. Add your first investment above!</p>';
        updateInvestmentSummary();
        return;
    }
    
    grid.innerHTML = investments.map(inv => {
        const gainLoss = inv.currentValue - inv.totalInvested;
        const gainLossPercent = ((gainLoss / inv.totalInvested) * 100).toFixed(2);
        const isPositive = gainLoss >= 0;
        
        return `
            <div class="investment-card">
                <div class="investment-header">
                    <div class="investment-symbol">${inv.symbol}</div>
                    <div class="investment-type">${inv.type.toUpperCase()}</div>
                </div>
                <div class="investment-value">$${inv.currentValue.toFixed(2)}</div>
                <div class="investment-change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '▲' : '▼'} $${Math.abs(gainLoss).toFixed(2)} (${isPositive ? '+' : ''}${gainLossPercent}%)
                </div>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 13px; color: var(--gray);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span>Quantity:</span>
                        <span>${inv.quantity}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span>Avg Cost:</span>
                        <span>$${inv.purchasePrice.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Current:</span>
                        <span>$${inv.currentPrice.toFixed(2)}</span>
                    </div>
                </div>
                <button class="btn btn-danger" style="width: 100%; margin-top: 12px; padding: 8px;" onclick="deleteInvestment(${inv.id})">Remove</button>
            </div>
        `;
    }).join('');
    
    updateInvestmentSummary();
}

function deleteInvestment(id) {
    investments = investments.filter(inv => inv.id !== id);
    localStorage.setItem('investments', JSON.stringify(investments));
    loadInvestments();
    updateDashboard();
}

function clearInvestments() {
    if (confirm('Are you sure you want to clear all investments?')) {
        investments = [];
        localStorage.setItem('investments', JSON.stringify(investments));
        loadInvestments();
        updateDashboard();
    }
}

function updateInvestmentSummary() {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
    const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const gainLoss = currentValue - totalInvested;
    const gainLossPercent = totalInvested > 0 ? ((gainLoss / totalInvested) * 100).toFixed(2) : 0;
    
    document.getElementById('totalInvested').textContent = `$${totalInvested.toFixed(2)}`;
    document.getElementById('currentValue').textContent = `$${currentValue.toFixed(2)}`;
    document.getElementById('totalGainLoss').textContent = `$${gainLoss.toFixed(2)} (${gainLoss >= 0 ? '+' : ''}${gainLossPercent}%)`;
    document.getElementById('totalGainLoss').style.color = gainLoss >= 0 ? 'var(--secondary)' : 'var(--danger)';
}

// Goals Management
function addGoal(event) {
    event.preventDefault();
    
    const goal = {
        id: Date.now(),
        name: document.getElementById('goalName').value,
        target: parseFloat(document.getElementById('goalTarget').value),
        current: parseFloat(document.getElementById('goalCurrent').value),
        date: document.getElementById('goalDate').value
    };
    
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    
    // Reset form
    document.getElementById('goalForm').reset();
    
    // Update UI
    loadGoals();
}

function loadGoals() {
    const container = document.getElementById('goalsList');
    
    if (goals.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 40px;">No goals yet. Create your first financial goal above!</p>';
        return;
    }
    
    container.innerHTML = goals.map(goal => {
        const progress = (goal.current / goal.target) * 100;
        const daysLeft = Math.ceil((new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="goal-item">
                <div class="goal-header">
                    <div class="goal-name">${goal.name}</div>
                    <div class="goal-amount">$${goal.current.toFixed(2)} / $${goal.target.toFixed(2)}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 13px; color: var(--gray);">
                    <span>${progress.toFixed(1)}% Complete</span>
                    <span>${daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                </div>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    <button class="btn btn-success" style="flex: 1; padding: 8px;" onclick="updateGoalProgress(${goal.id})">Update Progress</button>
                    <button class="btn btn-danger" style="padding: 8px;" onclick="deleteGoal(${goal.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateGoalProgress(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    
    const newAmount = prompt(`Update progress for "${goal.name}"\nCurrent: $${goal.current.toFixed(2)}\nEnter new amount:`, goal.current);
    
    if (newAmount !== null && !isNaN(newAmount)) {
        goal.current = parseFloat(newAmount);
        localStorage.setItem('goals', JSON.stringify(goals));
        loadGoals();
    }
}

function deleteGoal(id) {
    goals = goals.filter(g => g.id !== id);
    localStorage.setItem('goals', JSON.stringify(goals));
    loadGoals();
}

function clearGoals() {
    if (confirm('Are you sure you want to clear all goals?')) {
        goals = [];
        localStorage.setItem('goals', JSON.stringify(goals));
        loadGoals();
    }
}

// Dashboard Updates
function updateDashboard() {
    // Calculate totals
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    const investmentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
    const investmentChange = totalInvested > 0 ? (((investmentValue - totalInvested) / totalInvested) * 100).toFixed(2) : 0;
    
    // Update dashboard cards
    document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
    document.getElementById('monthlyIncome').textContent = `$${income.toFixed(2)}`;
    document.getElementById('monthlyExpenses').textContent = `$${expenses.toFixed(2)}`;
    document.getElementById('investmentValue').textContent = `$${investmentValue.toFixed(2)}`;
    document.getElementById('investmentChange').textContent = `${investmentChange >= 0 ? '+' : ''}${investmentChange}%`;
    
    // Update recent activity
    updateRecentActivity();
}

function updateRecentActivity() {
    const container = document.getElementById('recentActivity');
    const recentItems = [];
    
    // Get recent transactions
    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    recentTransactions.forEach(t => {
        recentItems.push({
            date: new Date(t.date),
            text: `${t.type === 'income' ? '💰' : '💸'} ${t.type === 'income' ? 'Received' : 'Spent'} $${t.amount.toFixed(2)} - ${t.category}`
        });
    });
    
    if (recentItems.length === 0) {
        container.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 20px;">No recent activity. Start by adding transactions or completing learning modules!</p>';
        return;
    }
    
    container.innerHTML = recentItems.map(item => `
        <div style="padding: 12px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <span>${item.text}</span>
            <span style="color: var(--gray); font-size: 13px;">${item.date.toLocaleDateString()}</span>
        </div>
    `).join('');
}

// Learning Module Functions
function updateModuleProgress() {
    Object.keys(moduleProgress).forEach(moduleKey => {
        const progress = moduleProgress[moduleKey];
        const progressBar = document.getElementById(`progress-${moduleKey}`);
        const progressText = document.getElementById(`progress-${moduleKey}-text`);
        
        if (progressBar && progressText) {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        }
    });
    
    // Update overall progress
    const totalProgress = Object.values(moduleProgress).reduce((sum, val) => sum + val, 0) / Object.keys(moduleProgress).length;
    document.getElementById('overallProgress').textContent = `${Math.round(totalProgress)}% Complete`;
    document.getElementById('overallProgressBar').style.width = `${totalProgress}%`;
}

function openModule(moduleKey) {
    const module = modules[moduleKey];
    if (!module) return;
    
    const moduleContent = document.getElementById('moduleContent');
    const moduleTitle = document.getElementById('moduleTitle');
    const moduleBody = document.getElementById('moduleBody');
    
    moduleTitle.textContent = `${module.icon} ${module.title}`;
    
    let content = '<div class="quiz-container">';
    
    // Add lessons
    module.lessons.forEach((lesson, index) => {
        content += `
            <div class="card" style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 16px;">Lesson ${index + 1}: ${lesson.title}</h3>
                ${lesson.content}
            </div>
        `;
    });
    
    // Add quiz
    content += `
        <div class="card">
            <h3 style="margin-bottom: 24px;">📝 Quiz Time!</h3>
            <div class="quiz-question">${module.quiz.question}</div>
            <div class="quiz-options" id="quiz-${moduleKey}">
                ${module.quiz.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectQuizOption('${moduleKey}', ${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="submitQuiz('${moduleKey}')" id="submit-${moduleKey}">Submit Answer</button>
            <div id="quiz-result-${moduleKey}" style="margin-top: 16px;"></div>
        </div>
    `;
    
    content += '</div>';
    
    moduleBody.innerHTML = content;
    moduleContent.classList.remove('hidden');
    
    // Hide module grid
    document.querySelector('.modules-grid').style.display = 'none';
}

let selectedQuizAnswer = null;

function selectQuizOption(moduleKey, optionIndex) {
    selectedQuizAnswer = optionIndex;
    const options = document.querySelectorAll(`#quiz-${moduleKey} .quiz-option`);
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
}

function submitQuiz(moduleKey) {
    if (selectedQuizAnswer === null) {
        alert('Please select an answer first!');
        return;
    }
    
    const module = modules[moduleKey];
    const isCorrect = selectedQuizAnswer === module.quiz.correct;
    const resultDiv = document.getElementById(`quiz-result-${moduleKey}`);
    const submitBtn = document.getElementById(`submit-${moduleKey}`);
    const options = document.querySelectorAll(`#quiz-${moduleKey} .quiz-option`);
    
    // Disable further selection
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === module.quiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedQuizAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    
    if (isCorrect) {
        resultDiv.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid var(--secondary); padding: 16px; border-radius: 8px; color: var(--secondary);">
                <strong>🎉 Correct!</strong> Great job! You've completed this module.
            </div>
        `;
        
        // Update progress
        if (moduleProgress[moduleKey] < 100) {
            moduleProgress[moduleKey] = 100;
            localStorage.setItem('moduleProgress', JSON.stringify(moduleProgress));
            updateModuleProgress();
        }
    } else {
        resultDiv.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid var(--danger); padding: 16px; border-radius: 8px; color: var(--danger);">
                <strong>❌ Not quite.</strong> Review the lessons and try again!
            </div>
        `;
    }
    
    selectedQuizAnswer = null;
}

function closeModule() {
    document.getElementById('moduleContent').classList.add('hidden');
    document.querySelector('.modules-grid').style.display = 'grid';
}
