/* eslint-disable react/prop-types */
import React from 'react'; // eslint-disable-line no-unused-vars
import styles from "./forecast-item.module.css";
import capitalizeWords from "../../../../utils/capitalize-words.js";
import formatDateForecastItem from "../../../../utils/date-format-forecast-item.js";

// ForecastItem component to display forecast data for a specific time
export default function ForecastItem({
                                         description,
                                         icon,
                                         temp,
                                         feels_like,
                                         temp_min,
                                         temp_max,
                                         humidity,
                                         windSpeed,
                                         dt_txt,
                                         timezone
                                     }) {
    // Formatting the date and description
    const date = new Date(dt_txt);
    const {hour, day} = formatDateForecastItem(date, timezone);
    description = capitalizeWords(description);

    return (
        <div className={styles.forecastItem}>
            <div className={styles.dateContainer}>
                <div className={styles.hourDiv}>
                    <div className={styles.hour}>{hour.split(' ')[0]}</div>
                    <div className={styles.hour}>{hour.split(' ')[1]}</div>
                </div>
                <div className={styles.dayDiv}>
                    <div className={styles.day}>{day.split(' ')[0]}</div>
                    <div className={styles.dateNum}>{day.split(' ')[1]}</div>
                </div>
            </div>
            <div className={styles.IconTempDescription}>
                <img alt={icon} src={`../../src/images/${icon}.png`}/>
                <div>
                    <div className={styles.temp}>{`${Math.round(temp)} °C`}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </div>
            <div className={styles.feelsLike}>{`Feels like ${Math.round(feels_like)} °C`}</div>
            <div className={styles.tempMin}>{`min: ${temp_min} °C`}</div>
            <div className={styles.tempMax}>{`max: ${temp_max} °C`}</div>
            <div className={styles.windSpeed}>{`Wind: ${windSpeed}m/s`}</div>
            <div className={styles.humidity}>{`Humidity: ${humidity}%`}</div>
        </div>
    )
}