import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeatherData} from './reducers/forecast-slice.jsx';
import {setCoords, setIsCityFound, setIsCitySelected} from "./reducers/cities-slice.jsx";
import styles from "./App.module.css"
import Searchbar from './components/searchbar/searchbar.jsx';
import Navbar from "./components/navbar/navbar.jsx";
import CurrentWeather from "./components/weather/current-weather/current-weather.jsx";
import HourlyForecast from "./components/weather/hourly-forecast/hourly-forecast/hourly-forecast.jsx";
import LoadingSpinner from "./components/loading-spinner/loading-spinner.jsx";

function App() {
    const dispatch = useDispatch();

    // Selecting necessary states from the store
    const lat = useSelector(state => state.cities.city.coords.lat);
    const lon = useSelector(state => state.cities.city.coords.lon);
    const isLoading = useSelector(state => state.forecast.loading);
    const cityList = useSelector(state => state.cities.citiesList);
    const isCityFound = useSelector(state => state.cities.city.isCityFound);

    // Fetching weather data when coordinates change
    useEffect(() => {
        if (lat && lon) {
            dispatch(fetchWeatherData(lat, lon));
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                }));
                dispatch(setIsCityFound(true));
                dispatch(setIsCitySelected(true));
            }, (error) => {
                console.log(error);
            });
        }
    }, [dispatch, lat, lon]);

    return (
        <div className={styles.appContainer}>
            <Navbar/>
            <div className={styles.contentContainer}>
                <Searchbar/>
                {isLoading && cityList.length === 0 ? <LoadingSpinner/> : <div>
                    {isCityFound &&
                        <>
                            <CurrentWeather/>
                            <HourlyForecast/>
                        </>
                    }
                </div>}
            </div>
        </div>
    );
}

export default App;