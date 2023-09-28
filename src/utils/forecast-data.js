import {createSelector} from 'reselect';
import capitalizeWords from "./capitalize-words.js";

const getForecastDataState = (state) => state.forecast.forecastDataCurrent;

export const selectForecastData = createSelector(
    [getForecastDataState],
    (forecastData) => {
        if (!forecastData) return null;
        const {
            timezone,
            name,
            sys: {country},
            weather,
            main: {temp, feels_like, humidity},
            wind: {speed}
        } = forecastData;
        const icon = weather.at(0).icon;
        const description = capitalizeWords(weather.at(0).description);
        return {timezone, name, country, icon, description, temp, feels_like, humidity, speed};
    }
);