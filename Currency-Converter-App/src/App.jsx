import './App.css'
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';

function App() {
  const {
    amount,
    fromCurrency,
    toCurrency,
    loading,
    error,
    lastUpdated,
    darkMode,
    setAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
    fetchExchangeRates,
    getConvertedAmount,
    getCurrentRate,
    toggleDarkMode,
  } = useStore();

  // Fetch exchange rates when component mounts or when fromCurrency changes
  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency, fetchExchangeRates]);

  // Toggle dark mode on the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const convertedAmount = getConvertedAmount();
  const currentRate = getCurrentRate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <img 
              src="/logo.png" 
              alt="Currency Converter Logo" 
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white">
              Currency-Converter
            </h1>
          </div>
          <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-300">
            Convert between different currencies with live exchange rates
          </p>
        </header>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Amount Input */}
            <div className="mb-6">
              <AmountInput 
                amount={amount}
                onAmountChange={setAmount}
                loading={loading}
              />
            </div>

            {/* Currency Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <CurrencySelector
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  disabled={loading}
                />
              </div>
              
              <div className="flex items-center justify-center md:justify-end pt-6">
                <button
                  onClick={swapCurrencies}
                  disabled={loading}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Swap currencies"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <CurrencySelector
                  value={toCurrency}
                  onChange={setToCurrency}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Conversion Result */}
            <div className="mt-8">
              <ConversionResult 
                amount={amount}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                convertedAmount={convertedAmount}
                rate={currentRate}
                loading={loading}
                lastUpdated={lastUpdated}
              />
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-100 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <button
                onClick={toggleDarkMode}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {lastUpdated && (
                  <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p className="font-medium">© {new Date().getFullYear()} Currency-Converter</p>
          <p>Created By Dorwu-Gabriel</p>
          <p>Exchange rates data provided by <a 
            href="https://apilayer.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            APILayer
          </a></p>
          {lastUpdated && (
            <p className="text-xs opacity-75 mt-2">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
          )}
        </footer>
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-200">Loading exchange rates...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
