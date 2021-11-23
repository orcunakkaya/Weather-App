import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import { WeatherContext } from "../../Context/WeatherContext";

function Weather({ setIsOnSubmit }) {
  const { setInputPosition, key, city } = useContext(WeatherContext);
  const [weather, setWeather] = useState({
    feels_like: "",
    humidity: "",
    windSpeed: "",
    description: "",
    pressure: "",
    lon: "",
    lat: "",
    icon: "",
  });

  useEffect(() => {
    try {
      const data = async () => {
        await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
        ).then((data) =>
          setWeather({
            feels_like: data.data.main.feels_like,
            humidity: data.data.main.humidity,
            windSpeed: data.data.wind.speed,
            description:
              data.data.weather[0].description[0].toUpperCase() +
              data.data.weather[0].description.substring(1),
            pressure: data.data.main.pressure,
            lon: data.data.coord.lon,
            lat: data.data.coord.lat,
            icon: `https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
          })
        ).catch(err => {
          setIsOnSubmit(false);
          alert("Please enter valid city or region name...")
        });
      };
      data();
    } catch (error) {
      alert(error);
    }
  }, [city, key, setIsOnSubmit]);

  useEffect(() => {
    setInputPosition({ lon: weather.lon, lat: weather.lat });
  }, [weather, setInputPosition]);

  return (
    <div className="weather">
      <h3 className="city-name">{city.toUpperCase()}</h3>
      <div className="current-weather">
        <div className="feel-weather">
          <span>Feels Like</span>
          <div>{Math.round(weather.feels_like)}&deg;</div>
          <img
            alt=""
            src={weather.icon}
          ></img>
        </div>
        <div className="detailed-values">
          <table>
            <tbody>
              <tr>
                <td>Weather</td>
                <td>{weather.description}</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather.humidity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weather.pressure} mb</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{weather.windSpeed} km/h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Weather;
