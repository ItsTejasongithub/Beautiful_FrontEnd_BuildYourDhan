import { AssetData, FDRate } from '../types';

export const loadCSV = async (path: string): Promise<string> => {
  const response = await fetch(path);
  const text = await response.text();
  return text;
};

export const parseAssetCSV = (csvText: string): AssetData[] => {
  const lines = csvText.trim().split('\n');
  const data: AssetData[] = [];

  // Skip first 3 header rows
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(',');
    if (parts.length >= 2) {
      const date = parts[0];
      const closePrice = parseFloat(parts[1]);

      if (date && !isNaN(closePrice)) {
        data.push({
          date: date,
          price: closePrice
        });
      }
    }
  }

  return data;
};

export const parseFDRates = (csvText: string): FDRate[] => {
  const lines = csvText.trim().split('\n');
  const rates: FDRate[] = [];

  for (let i = 3; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(',');
    if (parts.length >= 4) {
      const dateRange = parts[0];
      const yearMatch = dateRange.match(/\d{4}/);
      if (yearMatch) {
        rates.push({
          year: parseInt(yearMatch[0]),
          threeMonth: parseFloat(parts[1]) || 0,
          oneYear: parseFloat(parts[2]) || 0,
          threeYear: parseFloat(parts[3]) || 0
        });
      }
    }
  }

  return rates;
};

export const getAssetPriceAtDate = (assetData: AssetData[], year: number, month: number): number => {
  if (!assetData || assetData.length === 0) {
    return 0;
  }

  const targetDate = new Date(year, month - 1);

  let closestData = assetData[0];
  let minDiff = Number.MAX_VALUE;

  for (const data of assetData) {
    const dataDate = new Date(data.date);
    const diff = Math.abs(dataDate.getTime() - targetDate.getTime());

    if (diff < minDiff) {
      minDiff = diff;
      closestData = data;
    }
  }

  return closestData?.price || 0;
};

export const getFDRateForYear = (fdRates: FDRate[], year: number, duration: 3 | 12 | 36): number => {
  if (!fdRates || fdRates.length === 0) {
    // Default rates if no data available
    if (duration === 3) return 6.9;
    if (duration === 12) return 7.0;
    return 7.5;
  }

  const rate = fdRates.find(r => r.year <= year) || fdRates[fdRates.length - 1];

  if (!rate) {
    // Fallback to default rates
    if (duration === 3) return 6.9;
    if (duration === 12) return 7.0;
    return 7.5;
  }

  if (duration === 3) return rate.threeMonth;
  if (duration === 12) return rate.oneYear;
  return rate.threeYear;
};
