import { useState, useRef } from "react";
import "./weatherData.css";

function Weather() {
  // useState to declare state variables
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // useRef to create a reference to the input field
  const inputRef = useRef(null);

  // API KEY
  const apiKey = "67c36b1afa334f35abb84933242705";

  // Handle City Input
  const handleAreaInput = (event) => {
    setCity(event.target.value);
  };

  // Async function to fetch weather data
  const fetchWeather = async () => {
    setError(null);

    // Try Catch block for Weather API data fetching
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }

      const weatherData = await response.json();
      setWeather(weatherData);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data"); 
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">🌦️ Weather App 🌦️</h1>
      <input
        className="cityInput"
        type="text"
        value={city}
        onChange={handleAreaInput}
        placeholder="Enter city"
        ref={inputRef}
      />
      <button className="weatherButton" onClick={fetchWeather}>
        Get Weather
      </button>

      {error && <p>{error}</p>}
      {weather && (
        <div className="weatherCard">
          <h2 className="weatherLocation">{weather.location.name}</h2>
          <p className="weatherText">{weather.current.condition.text}</p>
          <p className="weatherText">{weather.current.temp_c}°C</p>
          <p className="weatherText">{weather.current.humidity}% Humidity</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}

export default Weather;
