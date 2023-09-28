import {configureStore} from "@reduxjs/toolkit"
import citiesSlice from "./reducers/cities-slice.jsx";
import forecastSlice from "./reducers/forecast-slice.jsx";

export const storeConfig = {
    reducer: {
        cities: citiesSlice,
        forecast: forecastSlice,
    }
};

const store = configureStore(storeConfig);

export default store;