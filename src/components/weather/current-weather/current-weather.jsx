import React from 'react'; // eslint-disable-line no-unused-vars
import {useSelector} from "react-redux";
import styles from "./current-weather.module.css"
import formatDateCurrentWeather from "../../../utils/date-format-current-weather.js";
import {selectForecastData} from "../../../utils/forecast-data.js";

function CurrentWeather() {
    // Selecting necessary states from the store
    const isCitySelected = useSelector(state => state.cities.city.isCitySelected);
    const forecastData = useSelector(selectForecastData);


    // Getting current time and formatting it
    const currentTime = new Date();
    const {formattedDate, formattedTime} = formatDateCurrentWeather(currentTime, forecastData?.timezone);

    return (
        <div className={styles.weatherContainer}>
            {
                isCitySelected && forecastData && (
                    <div className={styles.forecast}>
                        <div className={styles.date}>
                            {formattedDate} {formattedTime}
                        </div>
                        <div className={styles.location}>
                            {`${forecastData.name}, ${forecastData.country}`}
                        </div>
                        <div className={styles.weatherContentTemp}>
                            <img alt={forecastData.icon} src={`../../src/images/${forecastData.icon}@2x.png`}/>
                            <p className={styles.temp}>{`${Math.floor(forecastData.temp)} °C`}</p>
                        </div>
                        <div className={styles.description}>
                            {`${forecastData.description}. Feels like ${Math.floor(forecastData.feels_like)} °C.`}
                        </div>
                        <div className={styles.wind}>
                            {`Wind speed: ${Number(forecastData.speed).toFixed(1)}m/s SSE`}
                        </div>
                        <div className={styles.humidity}>
                            {`Humidity: ${forecastData.humidity}%`}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CurrentWeather;