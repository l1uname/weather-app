import {createSlice} from "@reduxjs/toolkit";
import {clearCitiesList, clearUserData, setIsCitySelected} from "./cities-slice.jsx"

const API_KEY = "6330774db172682a33e2c0018854bd44";

const initialState = {
    forecastDataCurrent: null,
    forecastDataHourly: null,
    loading: false,
    apiError: false,
}

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setForecastDataCurrent: (state, action) => {
            state.forecastDataCurrent = action.payload;
        },
        setForecastDataHourly: (state, action) => {
            state.forecastDataHourly = action.payload;
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setApiError: (state, action) => {
            state.apiError = action.payload;
        },
    }
})

// Async function to fetch weather data from OpenWeatherMap API
export function fetchWeatherData(lat, lon) {
    return async function (dispatch) {
        // Initial dispatches to set loading and error states
        dispatch(setApiError(false));
        dispatch(setIsLoading(true));
        dispatch(clearCitiesList());
        try {
            // Check if latitude and longitude are provided
            if (!lat || !lon) {
                await dispatch(clearUserData());
                await dispatch(setIsCitySelected(false));
                throw new Error('No location found');
            }
            // Fetching current weather and forecast data
            const res1 = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const res2 = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const [data1, data2] = await Promise.all([res1, res2]);
            // Check if the fetch was successful
            if (!data1.ok || !data2.ok) {
                throw new Error('Failed to fetch weather data');
            }
            // Parse the response data to JSON
            const json1 = await data1.json();
            const json2 = await data2.json();
            // Dispatch the fetched data to the store
            dispatch(setForecastDataCurrent(json1));
            dispatch(setForecastDataHourly(json2));
        } catch (err) {
            console.log(err);
            dispatch(setApiError(true));
        } finally {
            // Reset the loading state
            dispatch(setIsLoading(false));
        }
    }
}

export const {
    setForecastDataCurrent,
    setForecastDataHourly,
    setIsLoading,
    setApiError
} = forecastSlice.actions

export default forecastSlice.reducer