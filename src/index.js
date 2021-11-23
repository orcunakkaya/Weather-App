import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WeatherProvider } from './Context/WeatherContext';

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
    <App />
    </WeatherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
