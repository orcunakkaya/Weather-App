import { createContext, useState } from "react";
import { usePosition } from 'use-position';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const { latitude, longitude } = usePosition();
    const [city, setCity] = useState("");
    const [inputPosition, setInputPosition] = useState({lon: "", lat: ""})
    const [inputValue, setInputValue] = useState("");
    
    const values = {
        key,
        latitude,
        longitude,
        city,
        setCity,
        inputPosition,
        setInputPosition,
        inputValue,
        setInputValue,
    }

    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}