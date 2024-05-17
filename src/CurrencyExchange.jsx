import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const CurrencyExchange = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const apiKey = 'cb8ab5b8660a1c5f4cb3f51fc11ab6a8';
        const currencies = 'AUD,CNY,INR,KRW,USD';
        const source = 'IDR';
        const format = 1;

        const apiUrl = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=${currencies}&source=${source}&format=${format}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(`API error: ${data.error.info}`);
        }
        setExchangeRates(data.quotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertCurrency = (currencyCode) => {
    if (exchangeRates && exchangeRates[`IDR${currencyCode}`]) {
      const exchangeRate = exchangeRates[`IDR${currencyCode}`];
      const converted = 100 / exchangeRate;
      return converted.toFixed(2);
    } else {
      return 'N/A';
    }
  };

  return (
    <div className="container mt-5">
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
                  <center><a href="http://www.x-rates.com/table/?from=IDR&amount=1" target="_blank" rel="noopener noreferrer">
                      More Information
                  </a></center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CurrencyExchange;
