// Educational content and quiz questions for asset categories

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer (0-3)
  hint: string;
}

export interface AssetEducationContent {
  category: string;
  title: string;
  description: string;
  questions: QuizQuestion[]; // Multiple questions per category
}

export const ASSET_EDUCATION_DATA: { [key: string]: AssetEducationContent } = {
  'SAVINGS_AC': {
    category: 'SAVINGS_AC',
    title: 'Savings Account',
    description: 'A savings account is a basic bank account that allows you to deposit money, keep it safe, and earn a small interest. It provides easy access to your funds whenever needed.',
    questions: [
      {
        question: 'What is the main benefit of a savings account?',
        options: [
          'High returns and growth',
          'Safe storage with guaranteed interest',
          'Tax-free income',
          'Double your money quickly'
        ],
        correctAnswer: 1,
        hint: 'Think about safety and guaranteed returns!'
      },
      {
        question: 'Can you withdraw money from a savings account at any time?',
        options: [
          'No, money is locked for 1 year',
          'Yes, with easy access anytime',
          'Only on weekends',
          'Only after 6 months'
        ],
        correctAnswer: 1,
        hint: 'Savings accounts offer liquidity!'
      },
      {
        question: 'What type of interest does a savings account typically earn?',
        options: [
          'No interest',
          'Very high interest (10%+)',
          'Low but guaranteed interest (3-4%)',
          'Variable negative interest'
        ],
        correctAnswer: 2,
        hint: 'Interest is modest but stable!'
      },
      {
        question: 'Is money in a savings account safe?',
        options: [
          'No, it can disappear',
          'Yes, protected by deposit insurance',
          'Only if you invest more than ₹1 lakh',
          'Safe only in private banks'
        ],
        correctAnswer: 1,
        hint: 'Banks provide insurance protection!'
      },
      {
        question: 'What happens to interest in a savings account?',
        options: [
          'Interest is paid annually',
          'Interest is lost after 1 year',
          'Interest compounds over time',
          'You must claim interest manually'
        ],
        correctAnswer: 2,
        hint: 'Interest earns more interest!'
      },
      {
        question: 'Who should use a savings account?',
        options: [
          'Only wealthy individuals',
          'Everyone for emergency funds',
          'Only business owners',
          'Only senior citizens'
        ],
        correctAnswer: 1,
        hint: 'Everyone needs emergency savings!'
      },
      {
        question: 'What is the minimum balance requirement in most savings accounts?',
        options: [
          'No minimum required',
          'Usually ₹1,000 - ₹10,000',
          'Minimum ₹1 lakh',
          'Minimum ₹10 lakhs'
        ],
        correctAnswer: 1,
        hint: 'Requirements are typically low!'
      },
      {
        question: 'How does inflation affect savings account returns?',
        options: [
          'Inflation increases returns',
          'No effect on savings',
          'Inflation may reduce real value over time',
          'Inflation doubles your money'
        ],
        correctAnswer: 2,
        hint: 'Inflation erodes purchasing power!'
      },
      {
        question: 'Can you have multiple savings accounts?',
        options: [
          'No, only one per person',
          'Yes, you can have multiple accounts',
          'Only if you are married',
          'Only in different countries'
        ],
        correctAnswer: 1,
        hint: 'You can diversify across banks!'
      },
      {
        question: 'What is the typical interest rate for savings accounts in India?',
        options: [
          '10-15% per year',
          '0.5-1% per year',
          '2.5-4% per year',
          '20% per year'
        ],
        correctAnswer: 2,
        hint: 'Rates are modest but stable!'
      }
    ]
  },

  'FIXED_DEPOSIT': {
    category: 'FIXED_DEPOSIT',
    title: 'Fixed Deposit (FD)',
    description: 'A Fixed Deposit is a safe investment where you lock your money for a fixed period (3 months, 1 year, or 3 years) and earn guaranteed interest. Higher interest than savings account, but penalty on early withdrawal.',
    questions: [
      {
        question: 'What happens if you break an FD before maturity?',
        options: [
          'You get bonus interest',
          'Nothing happens',
          'You pay a penalty',
          'You lose all money'
        ],
        correctAnswer: 2,
        hint: 'Breaking early comes with a cost!'
      },
      {
        question: 'What is the main advantage of a Fixed Deposit?',
        options: [
          'High liquidity',
          'Guaranteed fixed returns',
          'Tax-free income',
          'Daily withdrawals allowed'
        ],
        correctAnswer: 1,
        hint: 'FDs offer predictable returns!'
      },
      {
        question: 'Which FD tenure typically offers the highest interest rate?',
        options: [
          '1 month',
          '3 months',
          '1 year',
          '3 years or more'
        ],
        correctAnswer: 3,
        hint: 'Longer lock-in means better rates!'
      },
      {
        question: 'Are FD returns guaranteed?',
        options: [
          'No, they fluctuate daily',
          'Yes, interest rate is locked at start',
          'Only for government FDs',
          'Depends on stock market'
        ],
        correctAnswer: 1,
        hint: 'Rate is fixed when you invest!'
      },
      {
        question: 'What is the typical penalty for breaking an FD early?',
        options: [
          'No penalty',
          '50% of principal amount',
          '0.5-2% interest reduction',
          'You lose all interest earned'
        ],
        correctAnswer: 2,
        hint: 'Small penalty on interest rate!'
      },
      {
        question: 'Can you renew an FD automatically after maturity?',
        options: [
          'No, manual renewal only',
          'Yes, with auto-renewal option',
          'Only for 1-year FDs',
          'Only senior citizens can renew'
        ],
        correctAnswer: 1,
        hint: 'Auto-renewal is a common feature!'
      },
      {
        question: 'How is FD interest typically paid?',
        options: [
          'Daily',
          'Monthly, quarterly, or at maturity',
          'Only when you break the FD',
          'Never paid, only added to principal'
        ],
        correctAnswer: 1,
        hint: 'Multiple payout frequency options!'
      },
      {
        question: 'Who offers Fixed Deposits in India?',
        options: [
          'Only government',
          'Banks and some NBFCs',
          'Only private companies',
          'Only stock exchanges'
        ],
        correctAnswer: 1,
        hint: 'Multiple institutions offer FDs!'
      },
      {
        question: 'What is the deposit insurance limit for FDs in India?',
        options: [
          'No insurance',
          'Up to ₹1 lakh per depositor',
          'Up to ₹5 lakhs per depositor',
          'Unlimited insurance'
        ],
        correctAnswer: 2,
        hint: 'DICGC provides protection!'
      },
      {
        question: 'Can you take a loan against your FD?',
        options: [
          'No, never allowed',
          'Yes, typically up to 80-90% of FD value',
          'Only after 5 years',
          'Only for senior citizens'
        ],
        correctAnswer: 1,
        hint: 'FDs can be used as collateral!'
      }
    ]
  },

  'GOLD': {
    category: 'GOLD',
    title: 'Gold Investment',
    description: 'Gold is a precious metal used as an investment to protect against inflation. You can buy Physical Gold (jewelry, coins) or Digital Gold (online, backed by real gold). Gold traditionally holds value during economic uncertainty.',
    questions: [
      {
        question: 'Why do people invest in gold?',
        options: [
          'To get monthly income',
          'To protect against inflation',
          'To earn high interest',
          'For quick profits'
        ],
        correctAnswer: 1,
        hint: 'Gold protects your wealth when prices rise!'
      },
      {
        question: 'What are the two main types of gold investment?',
        options: [
          'Physical and Digital Gold',
          'Indian and Foreign Gold',
          'Old and New Gold',
          'Pure and Mixed Gold'
        ],
        correctAnswer: 0,
        hint: 'You can buy real or online gold!'
      },
      {
        question: 'Does gold provide regular income like dividends?',
        options: [
          'Yes, monthly dividends',
          'Yes, annual interest',
          'No, returns come from price appreciation',
          'Only during festivals'
        ],
        correctAnswer: 2,
        hint: 'Gold gains value over time!'
      },
      {
        question: 'When does gold typically perform well?',
        options: [
          'During economic uncertainty',
          'Only during weddings',
          'When stock market is rising',
          'Never performs well'
        ],
        correctAnswer: 0,
        hint: 'Safe haven during crisis!'
      },
      {
        question: 'What is the purity measure for gold?',
        options: [
          'Percentage',
          'Carats (e.g., 22K, 24K)',
          'Grams only',
          'Degrees'
        ],
        correctAnswer: 1,
        hint: 'Higher number means purer gold!'
      },
      {
        question: 'What storage costs are involved when physical gold is kept in a bank?',
        options: [
          'No storage costs',
          'Locker rent and insurance',
          'Only electricity cost',
          'Government pays for storage'
        ],
        correctAnswer: 1,
        hint: 'Security comes at a cost!'
      },
      {
        question: 'What is Digital Gold backed by?',
        options: [
          'Nothing, it is virtual',
          'Government promise',
          'Physical gold stored in vaults',
          'Cryptocurrency'
        ],
        correctAnswer: 2,
        hint: 'Real gold secures digital gold!'
      },
      {
        question: 'Can you sell gold easily when needed?',
        options: [
          'No, very difficult',
          'Yes, gold is highly liquid',
          'Only to government',
          'Only during business hours'
        ],
        correctAnswer: 1,
        hint: 'Gold is easy to convert to cash!'
      },
      {
        question: 'What is making charge on gold jewelry?',
        options: [
          'Tax on gold',
          'Cost for crafting jewelry',
          'Storage fee',
          'Delivery charge'
        ],
        correctAnswer: 1,
        hint: 'Jewelers charge for workmanship!'
      },
      {
        question: 'Which gold investment has lower making charges?',
        options: [
          'Jewelry',
          'Digital Gold',
          'Gold coins and bars',
          'All have same charges'
        ],
        correctAnswer: 2,
        hint: 'Simple forms have lower costs!'
      }
    ]
  },

  'STOCKS': {
    category: 'STOCKS',
    title: 'Stock Market',
    description: 'Stocks represent ownership in a company. When you buy shares, you become a part-owner and can profit from company growth. Stock prices fluctuate based on company performance and market conditions. Higher risk but potentially higher returns.',
    questions: [
      {
        question: 'What do you become when you buy stocks?',
        options: [
          'A company employee',
          'A part-owner of the company',
          'A lender to the company',
          'A customer of the company'
        ],
        correctAnswer: 1,
        hint: 'You own a piece of the company!'
      },
      {
        question: 'How do stock investors make money?',
        options: [
          'Only through salary',
          'Price appreciation and dividends',
          'Monthly fixed interest',
          'Government subsidy'
        ],
        correctAnswer: 1,
        hint: 'Two ways to profit from stocks!'
      },
      {
        question: 'What makes stock prices go up or down?',
        options: [
          'Government orders',
          'Company performance and market sentiment',
          'Time of day only',
          'Number of shareholders'
        ],
        correctAnswer: 1,
        hint: 'Performance and perception matter!'
      },
      {
        question: 'What is a dividend?',
        options: [
          'Company debt',
          'Share of company profits paid to shareholders',
          'Stock purchase fee',
          'Government tax'
        ],
        correctAnswer: 1,
        hint: 'Companies share profits with owners!'
      },
      {
        question: 'What is the risk level of stock investing?',
        options: [
          'No risk at all',
          'Higher risk, higher potential returns',
          'Same as savings account',
          'Only risk is paperwork'
        ],
        correctAnswer: 1,
        hint: 'Risk and reward go together!'
      },
      {
        question: 'Can you lose money in stocks?',
        options: [
          'No, stocks always go up',
          'Yes, if stock price falls',
          'Only if company closes',
          'Government protects all losses'
        ],
        correctAnswer: 1,
        hint: 'Prices can fall below purchase price!'
      },
      {
        question: 'What does market capitalization mean?',
        options: [
          'Company profits',
          'Total value of company shares',
          'CEO salary',
          'Number of employees'
        ],
        correctAnswer: 1,
        hint: 'Total worth of all shares!'
      },
      {
        question: 'What is diversification in stock investing?',
        options: [
          'Buying only one stock',
          'Spreading investments across multiple stocks',
          'Selling all stocks',
          'Trading every day'
        ],
        correctAnswer: 1,
        hint: 'Don\'t put all eggs in one basket!'
      },
      {
        question: 'What is a stock exchange?',
        options: [
          'A bank',
          'Marketplace where stocks are bought and sold',
          'Government office',
          'Company headquarters'
        ],
        correctAnswer: 1,
        hint: 'Where buyers meet sellers!'
      },
      {
        question: 'What does BSE and NSE stand for?',
        options: [
          'Bank Savings Entity',
          'Bombay/National Stock Exchange',
          'Business Sales Enterprise',
          'Basic Stock Establishment'
        ],
        correctAnswer: 1,
        hint: 'India\'s major stock exchanges!'
      }
    ]
  },

  'CRYPTO': {
    category: 'CRYPTO',
    title: 'Cryptocurrency',
    description: 'Cryptocurrencies like Bitcoin (BTC) and Ethereum (ETH) are digital currencies that operate on blockchain technology. They are highly volatile and speculative investments. Not regulated like traditional assets.',
    questions: [
      {
        question: 'What is the main characteristic of cryptocurrency?',
        options: [
          'Guaranteed returns',
          'Government backing',
          'High volatility and risk',
          'Fixed interest rate'
        ],
        correctAnswer: 2,
        hint: 'Crypto prices can swing wildly!'
      },
      {
        question: 'What technology powers cryptocurrency?',
        options: [
          'Traditional banking',
          'Blockchain technology',
          'Paper currency system',
          'Gold standard'
        ],
        correctAnswer: 1,
        hint: 'Distributed ledger technology!'
      },
      {
        question: 'Is cryptocurrency regulated in India?',
        options: [
          'Yes, fully regulated like banks',
          'Partially regulated, taxation applied',
          'No regulation exists',
          'Only Bitcoin is regulated'
        ],
        correctAnswer: 1,
        hint: 'Gray area with tax implications!'
      },
      {
        question: 'What is Bitcoin?',
        options: [
          'A bank',
          'First and most famous cryptocurrency',
          'A stock exchange',
          'Government currency'
        ],
        correctAnswer: 1,
        hint: 'The original crypto pioneer!'
      },
      {
        question: 'Can cryptocurrency prices crash suddenly?',
        options: [
          'No, prices are stable',
          'Yes, extreme volatility is common',
          'Only during weekends',
          'Government protects prices'
        ],
        correctAnswer: 1,
        hint: 'High risk, high reward asset!'
      },
      {
        question: 'Where do you store cryptocurrency?',
        options: [
          'In a bank account',
          'In a digital wallet',
          'In a physical safe',
          'In government treasury'
        ],
        correctAnswer: 1,
        hint: 'Digital assets need digital storage!'
      },
      {
        question: 'What is crypto mining?',
        options: [
          'Digging for gold',
          'Process of validating transactions and creating new coins',
          'Buying crypto on exchange',
          'Government printing money'
        ],
        correctAnswer: 1,
        hint: 'Computational work for rewards!'
      },
      {
        question: 'Are cryptocurrency transactions anonymous?',
        options: [
          'Completely anonymous',
          'Pseudonymous - traceable but not directly linked to identity',
          'Fully public with names',
          'Only government can see'
        ],
        correctAnswer: 1,
        hint: 'Public ledger, private identity!'
      },
      {
        question: 'What is the maximum supply of Bitcoin?',
        options: [
          'Unlimited',
          '21 million coins',
          '100 million coins',
          'Changes every year'
        ],
        correctAnswer: 1,
        hint: 'Limited supply creates scarcity!'
      },
      {
        question: 'Should beginners invest heavily in cryptocurrency?',
        options: [
          'Yes, invest all savings',
          'No, only invest what you can afford to lose',
          'Yes, guaranteed profits',
          'Only if friends recommend'
        ],
        correctAnswer: 1,
        hint: 'High risk means caution needed!'
      }
    ]
  },

  'COMMODITY': {
    category: 'COMMODITY',
    title: 'Commodities',
    description: 'Commodities are raw materials like Cotton, Wheat, Crude Oil, Silver, Natural Gas, Copper, and Aluminium. Their prices depend on global demand, weather, and economic conditions. Used for diversification and hedging against inflation.',
    questions: [
      {
        question: 'What are commodities?',
        options: [
          'Company stocks',
          'Bank deposits',
          'Raw materials like oil and metals',
          'Digital currencies'
        ],
        correctAnswer: 2,
        hint: 'Think about physical resources!'
      },
      {
        question: 'What factors affect commodity prices?',
        options: [
          'Only time of day',
          'Global demand, weather, and economic conditions',
          'Number of investors',
          'Government orders only'
        ],
        correctAnswer: 1,
        hint: 'Multiple real-world factors!'
      },
      {
        question: 'Which is an example of an agricultural commodity?',
        options: [
          'Bitcoin',
          'Wheat and Cotton',
          'Gold jewelry',
          'Real estate'
        ],
        correctAnswer: 1,
        hint: 'Grown on farms!'
      },
      {
        question: 'Which is an example of an energy commodity?',
        options: [
          'Silver',
          'Wheat',
          'Crude Oil and Natural Gas',
          'Stocks'
        ],
        correctAnswer: 2,
        hint: 'Powers vehicles and homes!'
      },
      {
        question: 'How do investors typically trade commodities?',
        options: [
          'By physically storing them',
          'Through futures contracts and commodity exchanges',
          'Only at grocery stores',
          'Cannot be traded'
        ],
        correctAnswer: 1,
        hint: 'Standardized contracts on exchanges!'
      },
      {
        question: 'What is a metal commodity example?',
        options: [
          'Cotton',
          'Crude Oil',
          'Copper and Aluminium',
          'Bitcoin'
        ],
        correctAnswer: 2,
        hint: 'Industrial metals!'
      },
      {
        question: 'Why invest in commodities?',
        options: [
          'Guaranteed daily income',
          'Diversification and inflation hedge',
          'No risk involved',
          'Tax-free returns'
        ],
        correctAnswer: 1,
        hint: 'Protection during inflation!'
      },
      {
        question: 'What can affect agricultural commodity prices?',
        options: [
          'Weather and crop yields',
          'Only government policy',
          'Stock market only',
          'Interest rates only'
        ],
        correctAnswer: 0,
        hint: 'Nature plays a big role!'
      },
      {
        question: 'Are commodity prices stable?',
        options: [
          'Yes, never change',
          'No, they can be quite volatile',
          'Only change annually',
          'Government fixes all prices'
        ],
        correctAnswer: 1,
        hint: 'Supply and demand fluctuate!'
      },
      {
        question: 'What is crude oil used for?',
        options: [
          'Only decoration',
          'Fuel, plastics, and various products',
          'Building houses',
          'Making jewelry'
        ],
        correctAnswer: 1,
        hint: 'Essential for modern economy!'
      }
    ]
  },

  'INDEX_FUND': {
    category: 'INDEX_FUND',
    title: 'Index Funds',
    description: 'Index Funds (ETFs) are passive investments that track market indices like Nifty 50. They provide instant diversification by investing in multiple companies at once. Low fees and less risky than individual stocks.',
    questions: [
      {
        question: 'What is the main advantage of index funds?',
        options: [
          'Guaranteed high returns',
          'Diversification across many companies',
          'No market risk',
          'Daily fixed income'
        ],
        correctAnswer: 1,
        hint: 'Don\'t put all eggs in one basket!'
      },
      {
        question: 'What does an index fund track?',
        options: [
          'A single company',
          'Market indices like Nifty 50 or Sensex',
          'Gold prices',
          'Fixed deposit rates'
        ],
        correctAnswer: 1,
        hint: 'Follows the whole market index!'
      },
      {
        question: 'What is the Nifty 50?',
        options: [
          'A savings account',
          'Index of top 50 companies on NSE',
          'A single company stock',
          'A government bond'
        ],
        correctAnswer: 1,
        hint: 'Top companies tracked together!'
      },
      {
        question: 'Are index funds actively or passively managed?',
        options: [
          'Actively managed by fund managers',
          'Passively managed to track an index',
          'Not managed at all',
          'Only government manages them'
        ],
        correctAnswer: 1,
        hint: 'Just follows the index automatically!'
      },
      {
        question: 'What are the fees like for index funds?',
        options: [
          'Very high fees',
          'Lower fees than actively managed funds',
          'No fees at all',
          'Fees change daily'
        ],
        correctAnswer: 1,
        hint: 'Passive management means lower costs!'
      },
      {
        question: 'Can you lose money in index funds?',
        options: [
          'No, they are risk-free',
          'Yes, if the overall market falls',
          'Only during weekends',
          'Government protects all losses'
        ],
        correctAnswer: 1,
        hint: 'Market risk still exists!'
      },
      {
        question: 'What is an ETF?',
        options: [
          'A type of savings account',
          'Exchange Traded Fund that trades like stocks',
          'A government scheme',
          'A cryptocurrency'
        ],
        correctAnswer: 1,
        hint: 'Traded on exchanges like stocks!'
      },
      {
        question: 'Who should invest in index funds?',
        options: [
          'Only experts',
          'Beginners and long-term investors',
          'Only wealthy people',
          'Only senior citizens'
        ],
        correctAnswer: 1,
        hint: 'Great for passive investors!'
      },
      {
        question: 'How many companies do you own in a Nifty 50 index fund?',
        options: [
          'Only 1 company',
          'All 50 companies in Nifty',
          '5 companies',
          '100 companies'
        ],
        correctAnswer: 1,
        hint: 'Own a piece of all 50!'
      },
      {
        question: 'Can index funds outperform the market?',
        options: [
          'Yes, they always beat the market',
          'No, they aim to match market returns',
          'Only in bull markets',
          'Depends on weather'
        ],
        correctAnswer: 1,
        hint: 'Goal is to match, not beat!'
      }
    ]
  },

  'MUTUAL_FUND': {
    category: 'MUTUAL_FUND',
    title: 'Mutual Funds',
    description: 'Mutual Funds pool money from many investors to invest in stocks, bonds, or other assets. Professional fund managers make investment decisions. Suitable for investors who don\'t want to pick individual stocks.',
    questions: [
      {
        question: 'Who manages mutual funds?',
        options: [
          'The investors themselves',
          'Bank managers',
          'Professional fund managers',
          'Government officials'
        ],
        correctAnswer: 2,
        hint: 'Experts handle your investments!'
      },
      {
        question: 'What is a mutual fund?',
        options: [
          'A single stock',
          'Pooled money invested by professionals',
          'A savings account',
          'A cryptocurrency'
        ],
        correctAnswer: 1,
        hint: 'Many investors pooling together!'
      },
      {
        question: 'What do mutual funds invest in?',
        options: [
          'Only gold',
          'Stocks, bonds, or mix of assets',
          'Only real estate',
          'Only government schemes'
        ],
        correctAnswer: 1,
        hint: 'Diversified portfolio of assets!'
      },
      {
        question: 'What is NAV in mutual funds?',
        options: [
          'Name of fund manager',
          'Net Asset Value - price per unit',
          'Number of investors',
          'New Account Value'
        ],
        correctAnswer: 1,
        hint: 'Price of one unit of the fund!'
      },
      {
        question: 'What is an equity mutual fund?',
        options: [
          'Invests only in gold',
          'Invests primarily in stocks',
          'Invests only in FDs',
          'Invests in real estate only'
        ],
        correctAnswer: 1,
        hint: 'Stock market focused fund!'
      },
      {
        question: 'What is a debt mutual fund?',
        options: [
          'Invests in stocks only',
          'Invests in bonds and fixed income',
          'Lends money to friends',
          'Invests in cryptocurrencies'
        ],
        correctAnswer: 1,
        hint: 'Lower risk fixed income!'
      },
      {
        question: 'Can you start a mutual fund SIP with small amounts?',
        options: [
          'No, minimum ₹1 lakh required',
          'Yes, can start with ₹500-₹1000',
          'Minimum ₹10 lakhs',
          'Only lumpsum allowed'
        ],
        correctAnswer: 1,
        hint: 'Accessible for small investors!'
      },
      {
        question: 'What is SIP in mutual funds?',
        options: [
          'Savings Interest Plan',
          'Systematic Investment Plan',
          'Stock Investment Portfolio',
          'Special Insurance Policy'
        ],
        correctAnswer: 1,
        hint: 'Regular monthly investments!'
      },
      {
        question: 'Are mutual fund returns guaranteed?',
        options: [
          'Yes, always guaranteed',
          'No, returns depend on market performance',
          'Only debt funds guaranteed',
          'Government guarantees all'
        ],
        correctAnswer: 1,
        hint: 'Market-linked, not guaranteed!'
      },
      {
        question: 'What is an expense ratio?',
        options: [
          'Your investment amount',
          'Annual fee charged by the fund',
          'Your profit percentage',
          'Government tax'
        ],
        correctAnswer: 1,
        hint: 'Cost of managing the fund!'
      }
    ]
  },

  'REIT': {
    category: 'REIT',
    title: 'Real Estate Investment Trust (REIT)',
    description: 'REITs allow you to invest in commercial real estate (office buildings, business parks) without buying property directly. They provide regular rental income and potential property value appreciation.',
    questions: [
      {
        question: 'What does a REIT invest in?',
        options: [
          'Gold and silver',
          'Stock market',
          'Commercial real estate',
          'Cryptocurrency'
        ],
        correctAnswer: 2,
        hint: 'Think about buildings and property!'
      },
      {
        question: 'What is a REIT?',
        options: [
          'A type of stock',
          'Real Estate Investment Trust',
          'Retirement Income Tax',
          'A mutual fund'
        ],
        correctAnswer: 1,
        hint: 'Invest in real estate collectively!'
      },
      {
        question: 'Can you invest in real estate without buying property?',
        options: [
          'No, must buy property',
          'Yes, through REITs',
          'Only through gold',
          'Only for rich people'
        ],
        correctAnswer: 1,
        hint: 'REITs make real estate accessible!'
      },
      {
        question: 'What type of properties do REITs typically own?',
        options: [
          'Only residential homes',
          'Commercial properties like offices and malls',
          'Only agricultural land',
          'Only parking lots'
        ],
        correctAnswer: 1,
        hint: 'Business and commercial spaces!'
      },
      {
        question: 'How do REIT investors make money?',
        options: [
          'Only from property sale',
          'Rental income and property appreciation',
          'Government grants',
          'Fixed interest only'
        ],
        correctAnswer: 1,
        hint: 'Rent and value growth!'
      },
      {
        question: 'Are REITs traded on stock exchanges?',
        options: [
          'No, only private sales',
          'Yes, publicly traded REITs exist',
          'Only on weekends',
          'Only to government'
        ],
        correctAnswer: 1,
        hint: 'Can buy and sell like stocks!'
      },
      {
        question: 'What is the minimum investment for REITs?',
        options: [
          'Must buy entire building',
          'Can start with small amounts',
          'Minimum ₹1 crore',
          'Only for companies'
        ],
        correctAnswer: 1,
        hint: 'Affordable for retail investors!'
      },
      {
        question: 'Do REITs provide regular income?',
        options: [
          'No income, only capital gains',
          'Yes, distribute rental income regularly',
          'Only annual income',
          'No income at all'
        ],
        correctAnswer: 1,
        hint: 'Rental income passed to investors!'
      },
      {
        question: 'What percentage of income must REITs distribute?',
        options: [
          'No requirement',
          'Typically 90% or more',
          '10% only',
          '50% maximum'
        ],
        correctAnswer: 1,
        hint: 'Most income goes to investors!'
      },
      {
        question: 'Are REITs more liquid than physical property?',
        options: [
          'No, same liquidity',
          'Yes, easier to buy and sell',
          'Less liquid than property',
          'Cannot be sold'
        ],
        correctAnswer: 1,
        hint: 'Traded easily on exchanges!'
      }
    ]
  }
};

// Helper function to get education content for a category
export const getEducationContent = (category: string): AssetEducationContent | null => {
  return ASSET_EDUCATION_DATA[category] || null;
};

// Helper function to get a random question for a category
export const getRandomQuestion = (category: string): QuizQuestion | null => {
  const content = ASSET_EDUCATION_DATA[category];
  if (!content || !content.questions || content.questions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * content.questions.length);
  return content.questions[randomIndex];
};

// Helper function to generate a random question set for all categories
// Returns a map of category -> question index for consistency across multiplayer
export const generateQuestionIndices = (): { [category: string]: number } => {
  const indices: { [category: string]: number } = {};

  Object.keys(ASSET_EDUCATION_DATA).forEach(category => {
    const content = ASSET_EDUCATION_DATA[category];
    if (content.questions && content.questions.length > 0) {
      indices[category] = Math.floor(Math.random() * content.questions.length);
    }
  });

  return indices;
};

// Helper function to get a specific question by index
export const getQuestionByIndex = (category: string, index: number): QuizQuestion | null => {
  const content = ASSET_EDUCATION_DATA[category];
  if (!content || !content.questions || index < 0 || index >= content.questions.length) {
    return null;
  }

  return content.questions[index];
};
