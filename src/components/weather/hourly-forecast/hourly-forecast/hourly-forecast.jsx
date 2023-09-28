import React from 'react'; // eslint-disable-line no-unused-vars
import {useSelector} from "react-redux";
import styles from "./hourly-forecast.module.css"
import ForecastItem from "../forecast-item/forecast-item.jsx";

export default function HourlyForecast() {
    // Selecting necessary states from the store
    const isCitySelected = useSelector(state => state.cities.city.isCitySelected);
    const forecastDataHourly = useSelector(state => state.forecast.forecastDataHourly);

    let forecasts = [];

    // Preparing forecasts data
    if (forecastDataHourly && forecastDataHourly.list) {
        const timezone = forecastDataHourly.city.timezone;
        forecasts = forecastDataHourly.list.slice(1, 9).map(forecast => {
            const {
                main: {temp, feels_like, temp_min, temp_max, humidity},
                weather,
                wind: {speed: windSpeed},
                dt_txt
            } = forecast;

            return {
                main: weather[0].main,
                description: weather[0].description,
                icon: weather[0].icon,
                temp,
                feels_like,
                temp_min,
                temp_max,
                humidity,
                windSpeed,
                dt_txt,
                timezone
            };
        });
    }

    return (
        <div>
            {
                // Displaying hourly forecasts if a city is selected
                isCitySelected && <div className={styles.forecastContainer}>
                    {forecasts.map((forecast, index) => (
                        <ForecastItem key={index} {...forecast} />
                    ))}
                </div>
            }
        </div>
    );
}