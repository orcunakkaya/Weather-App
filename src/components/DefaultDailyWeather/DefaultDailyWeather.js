import { React, useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { WeatherContext } from "../../Context/WeatherContext";
import "./style.scss";
function DefaultDailyWeather() {
  const { latitude, longitude, key } = useContext(WeatherContext);
  const [defaultDailytWeather, setDefaultDailytWeather] = useState({
    feels_like: [],
    icon: [],
  });

  const getDefaultDailyWeatherData = useCallback(
    (lat, lon) => {
      try {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
          .then((data) =>
            setDefaultDailytWeather({
              feels_like: data.data.daily
                .map((temp) => Math.round(temp.temp.max))
                .slice(0, 4),
              icon: data.data.daily
                .map((des) => `https://openweathermap.org/img/wn/${des.weather[0].icon}@2x.png`)
                .slice(0, 4),
            })
          );
      } catch (error) {
        alert(error);
      }
    },
    [key]
  );
  const Day = (add) => {
    var date = new Date();
    date.setDate(new Date().getDate() + add);
    var d = date.toJSON().slice(5, 10);
    var day = d.slice(3, 5);
    var month = d.slice(0, 2);
    return day + "/" + month;
  }

  useEffect(() => {
    (latitude && longitude) !== undefined ? 
        (getDefaultDailyWeatherData(latitude, longitude)) 
        : (getDefaultDailyWeatherData(41.0351, 28.9833))
  }, [latitude, longitude, getDefaultDailyWeatherData]);

  const zip = (a, b, c) => a.map((x, i) => [x, b[i], c[i]]);

  return (
    <div className="daily-weather">
      <h3>Daily Weather</h3>
      <div className="container">
        {zip([Day(0), Day(1), Day(2), Day(3)], defaultDailytWeather.feels_like, defaultDailytWeather.icon).map((value, key) => (
          <ul key={key} className="daily-container">
            <li className="day">{value[0]}</li>
            <li className="feels-like">{value[1]}&deg;</li>
            <li className="icon">
              <img
                alt=""
                src={value[2]}
              ></img>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default DefaultDailyWeather;
