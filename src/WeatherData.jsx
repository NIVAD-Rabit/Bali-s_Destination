import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'jiUp0pZGkggYDhzoK7S1FGqZysF6pCxq';
        const location = 'bali';
        const weatherApiUrl = `https://api.tomorrow.io/v4/weather/realtime?units=metric&location=${location}&apikey=${apiKey}`;

        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData({
          temperature: data.data.values.temperature,
          condition: getWeatherCondition(data.data.values.weatherCode),
          humidity: data.data.values.humidity,
          windSpeed: data.data.values.windSpeed,
          icon: getWeatherIcon(data.data.values.weatherCode)
        });
        setCurrentDateTime(getCurrentDateTime());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getCurrentDateTime = () => {
    const currentTime = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 1000:
        return '/components/clear-sky.png';
      case 1001:
        return '/components/cloudy.png';
      case 1100:
        return '/components/mostly-clear-sky.png';
      case 1101:
        return '/components/partly-cloudy.png';
      case 1102:
        return '/components/mostly-cloudy.png';
      case 2000:
        return '/components/fog.png';
      case 2100:
        return '/components/light-fog.png';
      case 3000:
        return '/components/light-wind.png';
      case 3001:
        return '/components/wind.png';
      case 3002:
        return '/components/heavy-wind.png';
      case 4000:
        return '/components/drizzle.png';
      case 4001:
        return '/components/rain.png';
      case 4200:
        return '/components/light-rain.png';
      case 4201:
        return '/components/heavy-rain.png';
      default:
        return 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ABlack_question_mark.png&psig=AOvVaw06blXE-zFPke-t1DQ8Xcgh&ust=1714984644605000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJienuiN9oUDFQAAAAAdAAAAABAE';
    }
  };

  const getWeatherCondition = (weatherCode) => {
    switch (weatherCode) {
      case 1000:
        return 'Clear';
      case 1001:
        return 'Cloudy';
      case 1100:
        return 'Mostly Clear';
      case 1101:
        return 'Partly Cloudy';
      case 1102:
        return 'Mostly Cloudy';
      case 2000:
        return 'Fog';
      case 2100:
        return 'Light Fog';
      case 3000:
        return 'Light Wind';
      case 3001:
        return 'Wind';
      case 3002:
        return 'Strong Wind';
      case 4000:
        return 'Drizzle';
      case 4001:
        return 'Rain';
      case 4200:
        return 'Light Rain';
      case 4201:
        return 'Heavy Rain';
      default:
        return 'Unknown';
    }
  };

  return (
    <div id="weatherData" className="container text-center">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div className="weather-info justify-content-centered">
          <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
          <p className="temperature">
            {weatherData.temperature}°C, {weatherData.condition}
          </p>
          {currentDateTime && (
            <p className="time-info">{currentDateTime}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherData;
