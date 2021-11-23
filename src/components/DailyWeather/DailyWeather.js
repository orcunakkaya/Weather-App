import {React, useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { WeatherContext } from '../../Context/WeatherContext';
function DailyWeather() {
    const { inputPosition, key} = useContext(WeatherContext)
    const [dailyWeather, setDailyWeather] = useState({feels_like: [], icon:[]});

        useEffect(()=>{
            if(inputPosition.lat && inputPosition.lon){
                const getWeatherData = async(lat, lon) => {
                    try{
                        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                        .then((data) => setDailyWeather({feels_like: data.data.daily.map((temp => Math.round(temp.temp.max))).slice(0,4),
                            icon: data.data.daily.map((des => `https://openweathermap.org/img/wn/${des.weather[0].icon}@2x.png`)).slice(0,4)}))
                   }catch(error){
                        alert(error)
                   }
                 }
                 getWeatherData(inputPosition.lat, inputPosition.lon)
            }
     },[inputPosition, key])

     const zip = (a, b, c) => a.map((x, i) => [x, b[i], c[i]])

     const Day = (add) => {
        var date = new Date();
        date.setDate(new Date().getDate()+add)
        var d = date.toJSON().slice(5,10);
        var day = d.slice(3, 5)
        var month = d.slice(0, 2)
        return day+"/"+month;
     }

    return (
        <div className="daily-weather">
            <h3>Daily Weather</h3>
            <div className="container">
                {
                    (inputPosition.lat && inputPosition.lon) && (
                    zip([Day(0),Day(1),Day(2),Day(3)], dailyWeather.feels_like, dailyWeather.icon).map((value, key) => (
                        <ul key={key} className="daily-container" >
                            <li className="day">{value[0]}</li>
                            <li className="feels-like">{value[1]}&deg;</li>
                            <li className="icon">
                                <img alt="" src={value[2]}></img>
                            </li>
                        </ul>
                    ))
                    )
                }
            </div>
        </div>
    )
}

export default DailyWeather;