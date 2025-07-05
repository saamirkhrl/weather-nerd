import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter city ..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p className="greet-msg">
            Welcome to Weather Nerd! Enter in a city to get the weather.
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}&#176;F</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? <p>City not found</p> : <></>}

      <a className="github-link" href="https://github.com/samir-kharel" target="_blank">
        <img
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*N1fmHtI8gmkH_2Vu.png"
          alt="GitHub Repository"
        />
      </a>
    </div>
  );
}

export default App;
