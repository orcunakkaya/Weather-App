import { React, useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import './style.scss'
import { WeatherContext } from '../../Context/WeatherContext';
function DefaultHourlyWeather() {

    const { latitude, longitude, key } = useContext(WeatherContext)
    const [defaultHourlyWeather, setDefaultHourlyWeather] = useState({ clock: [], feel_weather: [], icon: [] });

    const getDefaultHourlyWeatherData = useCallback(
        (lat, lon) => {
            try {
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                    .then(data => setDefaultHourlyWeather({
                        clock: data.data.list.map((c) => c.dt_txt.slice(11, 16)).slice(0, 4),
                        feel_weather: data.data.list.map(f => f.main.feels_like).slice(0, 4),
                        icon: data.data.list.map(m => `https://openweathermap.org/img/wn/${m.weather[0].icon}@2x.png`).slice(0, 4)
                    }))
            } catch (error) {
                alert(error)
            }
        }, [key]
    )
    const zip = (a, b, c) => a.map((x, i) => [x, b[i], c[i]])
    useEffect(() => {
        (latitude && longitude) !== undefined ? 
        (getDefaultHourlyWeatherData(latitude, longitude)) 
        : (getDefaultHourlyWeatherData(41.0351, 28.9833))
    }, [latitude, longitude, getDefaultHourlyWeatherData])

    return (
        <div className="hourly-weather">
            <h3>Hourly Weather</h3>
            <div className="container">
                {
                    zip(defaultHourlyWeather.clock, defaultHourlyWeather.feel_weather, defaultHourlyWeather.icon).map((value, key) => (
                        <ul key={key} className="hourly-container">
                            <li className="clock">{value[0]}</li>
                            <li className="feels-like">{Math.round(value[1])}&deg;</li>
                            <li className="icon">
                                <img alt="" src={value[2]}></img>
                            </li>
                        </ul>
                    ))
                }
            </div>

        </div>
    )
}

export default DefaultHourlyWeather
