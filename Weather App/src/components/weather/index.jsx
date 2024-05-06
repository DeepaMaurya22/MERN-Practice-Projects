import { useState } from "react";
import Search from "../search/index";
import "../search/styles.css";
import { useEffect } from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const APP_ID = "e73cb4993dcc070f9817a872e275ab9f";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${APP_ID}`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      console.log(data, "data");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  useEffect(() => {
    fetchWeatherData("mumbai");
  }, []);
  return (
    <div className="weatherApp">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          <div className="cityName">
            <h2>
              {weatherData?.name} <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">{getCurrentDate()}</div>
          <div className="temp">{weatherData?.main?.temp}</div>
          <div className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </div>
          <div className="weatherInfo">
            <div className="wind">
              <p>Wind Speed</p>
              {weatherData?.wind?.speed}
            </div>
            <div className="humidity">
              <p>Humidity%</p>
              {weatherData?.main?.humidity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
