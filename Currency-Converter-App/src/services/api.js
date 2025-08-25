// Exchange Rates Data API (APILayer)
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

// Debug log - remove this in production
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

if (!API_KEY) {
  console.error('Exchange Rate API key is not set. Please check your .env file');
  console.error('Get a free API key from: https://apilayer.com/marketplace/exchangerates_data-api');
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      error
    });
    throw new Error(error.message || `Failed to fetch exchange rates (${response.status})`);
  }
  return response.json();
};

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await fetch(
      `${BASE_URL}/latest?base=${baseCurrency}`,
      {
        headers: {
          'apikey': API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    const data = await handleResponse(response);
    
    // The APILayer API returns rates directly in the response
    if (!data.rates) {
      throw new Error(data.message || 'Failed to fetch exchange rates');
    }
    
    return {
      rates: data.rates,
      lastUpdated: new Date().toISOString(),
      base: data.base,
      date: data.date,
    };
  } catch (error) {
    console.error('Error in fetchExchangeRates:', error);
    throw new Error(error.message || 'Failed to fetch exchange rates');
  }
};

// Cache for storing rates to avoid unnecessary API calls
const ratesCache = {
  data: null,
  timestamp: null,
  base: 'USD',
  CACHE_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
};

export const getCachedRates = async (baseCurrency = 'USD') => {
  const now = Date.now();
  
  // Return cached data if it exists and is not expired
  if (
    ratesCache.data && 
    ratesCache.timestamp && 
    (now - ratesCache.timestamp) < ratesCache.CACHE_DURATION &&
    ratesCache.base === baseCurrency
  ) {
    return ratesCache.data;
  }
  
  // Otherwise, fetch fresh data
  try {
    const data = await fetchExchangeRates(baseCurrency);
    ratesCache.data = data;
    ratesCache.timestamp = now;
    ratesCache.base = baseCurrency;
    return data;
  } catch (error) {
    // If there's an error but we have cached data, return that instead
    if (ratesCache.data) {
      console.warn('Using cached data due to error:', error.message);
      return ratesCache.data;
    }
    throw error;
  }
};

export default {
  fetchExchangeRates,
  getCachedRates,
};
