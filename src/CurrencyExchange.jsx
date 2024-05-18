import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.currencyfreaks.com/latest', {
          params: {
            apikey: 'daf5e71917614d3e89e4cc558cb764e4',
            symbols: 'AUD,CNY,INR,KRW,USD',
          },
        });
        setExchangeRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch exchange rates');
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertCurrency = (currency) => {
    if (!exchangeRates) return null;
    const rate = exchangeRates[currency];
    return (100 * rate).toFixed(2); // Convert 100 units of the given currency to IDR
  };

  return (
    <div className="table-container mt-5">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {exchangeRates && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Currency</th>
                <th>Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 Australian Dollar (AUD)</td>
                <td>{convertCurrency('AUD')} IDR</td>
              </tr>
              <tr>
                <td>100 Chinese Yuan (CNY)</td>
                <td>{convertCurrency('CNY')} IDR</td>
              </tr>
              <tr>
                <td>100 Indian Rupee (INR)</td>
                <td>{convertCurrency('INR')} IDR</td>
              </tr>
              <tr>
                <td>100 South Korean Won (KRW)</td>
                <td>{convertCurrency('KRW')} IDR</td>
              </tr>
              <tr>
                <td>100 United States Dollar (USD)</td>
                <td>{convertCurrency('USD')} IDR</td>
              </tr>
              <tr className="centered-link-row">
                <td colSpan="2">
                  <center>
                    <a href="https://www.x-rates.com/table/?from=IDR&amount=1" target="_blank" rel="noopener noreferrer">
                      More Information
                    </a>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
