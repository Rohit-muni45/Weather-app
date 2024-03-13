import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'
import { RotatingLines } from 'react-loader-spinner';

const API_KEY = '8d5c948655d8767e361ddb3b664e8f07';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false)

  
  const handleSearch = async () => {
    setLoader(true)
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
      setError(false)
      setLoader(false)
      // console.log(response.data)
    } catch (error) {
      // console.error('Error fetching data:', error);
      setError(error)
      setWeatherData(null)
      setLoader(false)

    }
  };

  return (
    <>
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        className='input'
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
 
      {loader ? (<RotatingLines
        visible={true}
        height="400"
        width='200'
        strokeColor='aqua'
        animationDuration='2'
        ariaLabel="rotating-lines-loading"
        wrapperClass='spinner' />) :
     
      weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
          <p className='temp'>  {weatherData.main.temp.toFixed(1)}°C</p>
          <p className='weather'>Weather: {weatherData.weather[0].main}</p>
          <p className='des'>Description: {weatherData.weather[0].description}</p>

        </div>
      )}
      {error && (
        <p className='error'>{error.response.data.message}</p>
      )}
    </div>
    </>
  );
};

export default Weather;
