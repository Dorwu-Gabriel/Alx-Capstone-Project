import { create } from 'zustand';
import { getCachedRates } from '../services/api';

export const useStore = create((set, get) => ({
  // State
  amount: 1,
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  exchangeRates: {},
  loading: false,
  error: null,
  lastUpdated: null,
  timeNextUpdate: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  // Actions
  setAmount: (amount) => set({ amount: parseFloat(amount) || 0 }),
  setFromCurrency: (currency) => set({ fromCurrency: currency }),
  setToCurrency: (currency) => set({ toCurrency: currency }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Swap currencies
  swapCurrencies: () => set((state) => ({
    fromCurrency: state.toCurrency,
    toCurrency: state.fromCurrency
  })),
  
  // Fetch exchange rates
  fetchExchangeRates: async () => {
    const { fromCurrency } = get();
    set({ loading: true, error: null });
    
    try {
      const { rates, date } = await getCachedRates(fromCurrency);
      
      set({
        exchangeRates: rates,
        lastUpdated: date,
        loading: false,
        error: null
      });
      
      return rates;
    } catch (error) {
      console.error('Error in fetchExchangeRates:', error);
      set({ 
        error: error.message || 'Failed to fetch exchange rates',
        loading: false 
      });
      throw error;
    }
  },
  
  // Calculate converted amount
  getConvertedAmount: () => {
    const { amount, fromCurrency, toCurrency, exchangeRates } = get();
    
    if (!exchangeRates || !exchangeRates[toCurrency] || fromCurrency === toCurrency) {
      return amount.toFixed(2);
    }
    
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const result = amount * rate;
    
    // Format the result to show appropriate decimal places
    if (result >= 1000) {
      return result.toFixed(2);
    } else if (result >= 1) {
      return result.toFixed(4);
    } else {
      return result.toFixed(6);
    }
  },
  
  // Get exchange rate for the current pair
  getCurrentRate: () => {
    const { fromCurrency, toCurrency, exchangeRates } = get();
    
    if (!exchangeRates || !exchangeRates[toCurrency] || fromCurrency === toCurrency) {
      return '1.00';
    }
    
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    
    // Format the rate to show appropriate decimal places
    if (rate >= 1000) {
      return rate.toFixed(2);
    } else if (rate >= 1) {
      return rate.toFixed(4);
    } else {
      return rate.toFixed(6);
    }
  },
  
  // Format currency amount with proper formatting
  formatCurrency: (value, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(value);
  }
}));
