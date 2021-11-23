import { React, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import { WeatherContext } from '../../Context/WeatherContext';

function DefaultWeather() {
    const { latitude, longitude, key } = useContext(WeatherContext)
    const [defaultWeather, setDefaultWeather] = useState({ cityName: "", feels_like: "", humidity: "", windSpeed: "", description: "", pressure: "", icon: `` });

    const getWeatherData = useCallback(
        (lat, lon) => {
            try {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                    .then((data) => setDefaultWeather({
                        cityName: data.data.name.toUpperCase(), feels_like: data.data.main.feels_like, humidity: data.data.main.humidity,
                        windSpeed: data.data.wind.speed, description: data.data.weather[0].description[0].toUpperCase() + data.data.weather[0].description.substring(1),
                        pressure: data.data.main.pressure, icon: `https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
                    })) 
            } catch (error) {
                alert(error)
            }
        }, [key]
    )
    useEffect(() => {
        (latitude && longitude) !== undefined ? 
        (getWeatherData(latitude, longitude)) 
        : (getWeatherData(41.0351, 28.9833))
    }, [latitude, longitude, getWeatherData])

    return (
        <div className="weather">
            {
                    <>
                        <h3 className="city-name">{defaultWeather.cityName}</h3>
                        <div className="current-weather">
                            <div className="feel-weather">
                                <span>Feels Like</span>
                                <div>{Math.round(defaultWeather.feels_like)}&deg;</div>
                                <img alt="" src={defaultWeather.icon}></img>
                            </div>
                            <div className="detailed-values">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Weather</td>
                                            <td>{defaultWeather.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Humidity</td>
                                            <td>{defaultWeather.humidity}%</td>
                                        </tr>
                                        <tr>
                                            <td>Pressure</td>
                                            <td>{defaultWeather.pressure} mb</td>
                                        </tr>
                                        <tr>
                                            <td>Wind Speed</td>
                                            <td>{defaultWeather.windSpeed} km/h</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default DefaultWeather;