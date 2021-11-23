
import './App.css';
import { useState } from 'react'
import DefaultHourlyWeather from './components/DefaultHourlyWeather/DefaultHourlyWeather';
import DefaultDailyWeather from './components/DefaultDailyWeather/DefaultDailyWeather';
import HourlyWeather from './components/HourlyWeather/HourlyWeather'
import DailyWeather from './components/DailyWeather/DailyWeather'
import Header from './components/Header/Header';
import DefaultWeather from './components/DefaultWeather/DefaultWeather';
import Weather from './components/Weather/Weather';

function App() {
  const [isOnSubmit, setIsOnSubmit] = useState(false);
  return (
    <div className="App">
      <Header isOnSubmit={isOnSubmit} setIsOnSubmit={setIsOnSubmit} />
      {
        isOnSubmit === false ? 
        <>
          <DefaultWeather /> 
          <DefaultHourlyWeather /> 
          <DefaultDailyWeather />
        </>
        :
        <>
          <Weather setIsOnSubmit={setIsOnSubmit}/>
          <HourlyWeather />
          <DailyWeather  />
        </>
      }
    </div>
  );
}

export default App;
