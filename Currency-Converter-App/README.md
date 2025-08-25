# ALX Capstone Project Documentation
**Project Name: Currency Converter App
**Author: Dorwu Gabriel
**Date: August 2025

# CURRENCY CONVERTER APP
A responsive web application that enables users to convert between various currencies in real-time using live exchange rate data from a public API. Built with React, Zustand for state management, and Tailwind CSS for styling. Deployed on Vercel.

# 📌 Project Overview
The Currency Converter App allows users to select source and target currencies, enter an amount, and view the converted result using the ExchangeRate-API.

# 🛠 Tech Stack
React | Zustand | Tailwind CSS | ExchangeRate-API | Vercel

# ✨ Features
•	Real-time currency conversion
•	Responsive design
•	State management with Zustand
•	Error handling for invalid inputs/network issues

# 📦 Installation & Setup
git clone https://github.com/yourusername/Currency-Converter-App.git
cd Currency-Converter-App
npm install

# Add your API key to .env
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here

npm run dev

# 🔗 API Integration
Endpoint:
https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD

# 📂 Project Structure
Currency-Converter-App/
│
├── public/                 # Static assets
│   └── favicon.ico
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CurrencySelector.jsx
│   │   ├── AmountInput.jsx
│   │   └── ResultDisplay.jsx
│   │
│   ├── store/              # Zustand store for state management
│   │   └── currencyStore.js
│   │
│   ├── pages/              # Page components
│   │   └── Home.jsx
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Tailwind CSS imports
│   └── utils/
│       └── api.js          # API call logic
│
├── .env                    # API key (excluded from git)
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation

# 🌐 Deployment
npm run build
vercel
Ensure environment variables are set in Vercel.

# 🔮 Future Improvements
•	Historical exchange rate charts
•	Dark mode
•	Offline mode with cached rates
•	Multi-language support

# 📜 License
MIT License

# 🙏 Acknowledgements
•	ExchangeRate-API
•	Tailwind CSS
•	Zustand
