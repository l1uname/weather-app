import {createSlice} from "@reduxjs/toolkit"
import {setApiError} from "./forecast-slice.jsx";

const initialState = {
    citiesList: [],
    city: {
        name: null,
        coords: {
            lat: null,
            lon: null,
        },
        isCitySelected: false,
        isCityFound: false,
    },
    inputValue: '',
}

const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.citiesList = action.payload;
        },
        setCoords: (state, action) => {
            state.city.coords.lat = action.payload.lat;
            state.city.coords.lon = action.payload.lon;
        },
        setIsCitySelected: (state, action) => {
            state.city.isCitySelected = action.payload;
        },
        setIsCityFound: (state, action) => {
            state.city.isCityFound = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        clearCitiesList: (state) => {
            state.citiesList = [];
        },
        clearUserData: (state) => {
            state.city.coords.lat = null;
            state.city.coords.lon = null;
            state.citiesList = [];
            state.inputValue = '';
            state.city.isCityFound = false;
            state.city.isCitySelected = false;
        },
    }
});

// Async function to fetch cities data from OpenDataSoft API
export function fetchingCities(userInput) {
    return async function (dispatch) {
        dispatch(setApiError(false));
        try {
            const res = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${userInput}&rows=10`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('City not found');
                } else {
                    throw new Error('An error occurred while fetching the data');
                }
            }
            const {records} = await res.json();
            const cities = records.map(record => ({
                name: record.fields.name,
                coords: {
                    lon: record.geometry.coordinates[0],
                    lat: record.geometry.coordinates[1]
                }
            }));
            dispatch(setCities(cities));
        } catch (err) {
            console.log(err);
            dispatch(setApiError(true));
        }
    }
}

// Async function to fetch city coordinates from OpenDataSoft API
export function fetchCityCoords(userInput) {
    return async function (dispatch) {
        dispatch(setApiError(false));
        try {
            const res = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${userInput}&rows=10`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('City not found');
                } else {
                    throw new Error('An error occurred while fetching the data');
                }
            }
            const {records} = await res.json();
            const cities = records.map(record => ({
                name: record.fields.name,
                coords: {
                    lon: record.geometry.coordinates[0],
                    lat: record.geometry.coordinates[1]
                }
            }));
            const city = cities.find(city => city.name.toLowerCase() === userInput.toLowerCase());
            if (city) {
                dispatch(setCoords(city.coords));
                dispatch(setIsCityFound(true));
                return city.coords;
            } else {
                dispatch(setIsCityFound(false));
            }
        } catch (err) {
            console.log(err);
            dispatch(setApiError(true));
        }
    }
}

export const {
    setInputValue,
    setCities,
    setCoords,
    setIsCitySelected,
    clearCitiesList,
    clearUserData,
    setIsCityFound,
} = citiesSlice.actions
export default citiesSlice.reducer