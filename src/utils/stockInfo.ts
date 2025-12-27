// Stock information database with company details
export interface StockInfo {
  fullName: string;
  sector: string;
  description: string;
}

export const STOCK_INFO_DATABASE: { [key: string]: StockInfo } = {
  // 1996 batch - IT Giants & Banks
  'INFY': {
    fullName: 'Infosys Limited',
    sector: 'Information Technology',
    description: 'Global leader in consulting, technology, and outsourcing solutions'
  },
  'WIPRO': {
    fullName: 'Wipro Limited',
    sector: 'Information Technology',
    description: 'Leading IT services, consulting, and business process services company'
  },
  'HDFCBANK': {
    fullName: 'HDFC Bank Limited',
    sector: 'Banking & Finance',
    description: "India's largest private sector bank by assets"
  },
  'SBIN': {
    fullName: 'State Bank of India',
    sector: 'Banking & Finance',
    description: 'Largest public sector bank in India with nationwide presence'
  },
  'RELIANCE': {
    fullName: 'Reliance Industries Limited',
    sector: 'Conglomerate',
    description: 'Diversified conglomerate in energy, petrochemicals, retail, and telecom'
  },
  'ONGC': {
    fullName: 'Oil and Natural Gas Corporation',
    sector: 'Oil & Gas',
    description: "India's largest crude oil and natural gas exploration company"
  },
  'M&M': {
    fullName: 'Mahindra & Mahindra Limited',
    sector: 'Automotive',
    description: 'Leading manufacturer of tractors, utility vehicles, and commercial vehicles'
  },
  'HINDUNILVR': {
    fullName: 'Hindustan Unilever Limited',
    sector: 'FMCG',
    description: "India's largest FMCG company with iconic consumer brands"
  },
  'ITC': {
    fullName: 'ITC Limited',
    sector: 'Conglomerate',
    description: 'Diversified conglomerate in FMCG, hotels, paperboards, and agri-business'
  },
  'TATACONSUM': {
    fullName: 'Tata Consumer Products Limited',
    sector: 'FMCG',
    description: 'Leading consumer goods company with brands like Tata Tea and Tata Salt'
  },
  'TITAN': {
    fullName: 'Titan Company Limited',
    sector: 'Consumer Durables',
    description: 'Leading manufacturer of watches, jewelry, and eyewear'
  },
  'TATASTEEL': {
    fullName: 'Tata Steel Limited',
    sector: 'Metals & Mining',
    description: "India's largest integrated steel producer"
  },
  'HINDALCO': {
    fullName: 'Hindalco Industries Limited',
    sector: 'Metals & Mining',
    description: 'Leading aluminum and copper manufacturer in India'
  },
  'SUNPHARMA': {
    fullName: 'Sun Pharmaceutical Industries',
    sector: 'Pharmaceuticals',
    description: "India's largest pharmaceutical company by market cap"
  },
  'Hindustan Construction': {
    fullName: 'Hindustan Construction Company',
    sector: 'Infrastructure',
    description: 'Pioneer in infrastructure development and construction'
  },

  // 1997-1998
  'GAIL': {
    fullName: 'GAIL (India) Limited',
    sector: 'Oil & Gas',
    description: 'Largest state-owned natural gas processing and distribution company'
  },
  'AXISBANK': {
    fullName: 'Axis Bank Limited',
    sector: 'Banking & Finance',
    description: 'Third largest private sector bank in India'
  },

  // 2001-2002
  'KOTAKBANK': {
    fullName: 'Kotak Mahindra Bank Limited',
    sector: 'Banking & Finance',
    description: 'Leading private sector bank with diverse financial services'
  },
  'ICICIBANK': {
    fullName: 'ICICI Bank Limited',
    sector: 'Banking & Finance',
    description: 'Second largest private sector bank in India'
  },
  'INDUSINDBK': {
    fullName: 'IndusInd Bank Limited',
    sector: 'Banking & Finance',
    description: 'New generation private sector bank with innovative banking solutions'
  },
  'BAJFINANCE': {
    fullName: 'Bajaj Finance Limited',
    sector: 'Financial Services',
    description: 'Leading non-banking financial company in consumer finance'
  },
  'SHRIRAMFIN': {
    fullName: 'Shriram Finance Limited',
    sector: 'Financial Services',
    description: 'Leading commercial vehicle financing company'
  },
  'BAJAJ-AUTO': {
    fullName: 'Bajaj Auto Limited',
    sector: 'Automotive',
    description: 'Leading manufacturer of motorcycles and three-wheelers'
  },
  'HEROMOTOCO': {
    fullName: 'Hero MotoCorp Limited',
    sector: 'Automotive',
    description: "World's largest manufacturer of motorcycles and scooters"
  },
  'ASIANPAINT': {
    fullName: 'Asian Paints Limited',
    sector: 'Paints & Coatings',
    description: 'Largest paint company in India with pan-Asia presence'
  },
  'APOLLOHOSP': {
    fullName: 'Apollo Hospitals Enterprise',
    sector: 'Healthcare',
    description: "India's leading integrated healthcare services provider"
  },
  'LT': {
    fullName: 'Larsen & Toubro Limited',
    sector: 'Infrastructure',
    description: 'Leading engineering, construction, and technology conglomerate'
  },
  'GRASIM': {
    fullName: 'Grasim Industries Limited',
    sector: 'Diversified',
    description: 'Flagship company of Aditya Birla Group in cement and chemicals'
  },
  'BHARTIARTL': {
    fullName: 'Bharti Airtel Limited',
    sector: 'Telecommunications',
    description: "India's second largest telecom operator with global presence"
  },
  'ADANIENT': {
    fullName: 'Adani Enterprises Limited',
    sector: 'Conglomerate',
    description: 'Flagship company of Adani Group in infrastructure and commodities'
  },
  'BEL': {
    fullName: 'Bharat Electronics Limited',
    sector: 'Defense & Aerospace',
    description: 'State-owned aerospace and defense electronics company'
  },
  'TRENT': {
    fullName: 'Trent Limited',
    sector: 'Retail',
    description: 'Leading retail chain operating Westside, Zudio, and Star stores'
  },
  'TCS': {
    fullName: 'Tata Consultancy Services',
    sector: 'Information Technology',
    description: 'Largest IT services and consulting company in India'
  },
  'HCLTECH': {
    fullName: 'HCL Technologies Limited',
    sector: 'Information Technology',
    description: 'Global IT services company specializing in digital transformation'
  },
  'BAJAJFINSV': {
    fullName: 'Bajaj Finserv Limited',
    sector: 'Financial Services',
    description: 'Diversified financial services holding company'
  },
  'NESTLEIND': {
    fullName: 'Nestlé India Limited',
    sector: 'FMCG',
    description: 'Leading food and beverage company with brands like Maggi and Nescafé'
  },
  'ULTRACEMCO': {
    fullName: 'UltraTech Cement Limited',
    sector: 'Cement',
    description: 'Largest cement manufacturer in India'
  },
  'JSWSTEEL': {
    fullName: 'JSW Steel Limited',
    sector: 'Metals & Mining',
    description: "India's leading integrated steel manufacturer"
  },
  'MARUTI': {
    fullName: 'Maruti Suzuki India Limited',
    sector: 'Automotive',
    description: 'Largest passenger car manufacturer in India'
  },
  'NTPC': {
    fullName: 'NTPC Limited',
    sector: 'Power Generation',
    description: 'Largest power generation company in India'
  },
  'TECHM': {
    fullName: 'Tech Mahindra Limited',
    sector: 'Information Technology',
    description: 'Leading IT services and consulting provider with telecom expertise'
  },
  'POWERGRID': {
    fullName: 'Power Grid Corporation of India',
    sector: 'Power Transmission',
    description: 'Central transmission utility responsible for national power grid'
  },
  'ADANIPORTS': {
    fullName: 'Adani Ports and SEZ Limited',
    sector: 'Infrastructure',
    description: 'Largest private sector port and logistics company in India'
  },
  'INDIGO': {
    fullName: 'InterGlobe Aviation (IndiGo)',
    sector: 'Aviation',
    description: "India's largest airline by market share and fleet size"
  },
  'SBILIFE': {
    fullName: 'SBI Life Insurance Company',
    sector: 'Insurance',
    description: 'Leading private life insurance company in India'
  },

  // High-risk/Penny stocks
  'Yes Bank': {
    fullName: 'Yes Bank Limited',
    sector: 'Banking & Finance',
    description: 'Private sector bank that faced crisis in 2020, now recovering'
  },
  'Suzlon Energy': {
    fullName: 'Suzlon Energy Limited',
    sector: 'Renewable Energy',
    description: 'Wind turbine manufacturer facing financial challenges'
  },
  'Vodafone Idea': {
    fullName: 'Vodafone Idea Limited',
    sector: 'Telecommunications',
    description: 'Telecom operator struggling with debt and market share loss'
  },
  'Reliance Power': {
    fullName: 'Reliance Power Limited',
    sector: 'Power Generation',
    description: 'Power generation company with execution challenges'
  },
  'Vakrangee': {
    fullName: 'Vakrangee Limited',
    sector: 'Technology',
    description: 'Technology company providing banking and retail solutions'
  },
  'Ksolves India': {
    fullName: 'Ksolves India Limited',
    sector: 'Information Technology',
    description: 'IT services company specializing in cloud and data solutions'
  },
  'Vertoz': {
    fullName: 'Vertoz Advertising Limited',
    sector: 'Digital Marketing',
    description: 'Programmatic advertising and marketing technology company'
  },
  'Jindal Stainless': {
    fullName: 'Jindal Stainless Limited',
    sector: 'Metals & Mining',
    description: 'Leading stainless steel manufacturer in India'
  },

  // Default fallback for any stock not in database
};

// Helper function to get stock info with fallback
export const getStockInfo = (stockSymbol: string): StockInfo => {
  return STOCK_INFO_DATABASE[stockSymbol] || {
    fullName: stockSymbol,
    sector: 'Diversified',
    description: 'Indian equity stock'
  };
};
