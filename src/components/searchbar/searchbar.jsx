import React, {useEffect, useRef, useState} from 'react'; // eslint-disable-line no-unused-vars
import {useDispatch, useSelector} from 'react-redux';
import styles from "./searchbar.module.css"
import {
    clearCitiesList,
    fetchCityCoords,
    fetchingCities,
    setCoords,
    setInputValue,
    setIsCityFound,
    setIsCitySelected,
} from "../../reducers/cities-slice.jsx";


function Searchbar() {
    const dispatch = useDispatch();

    // Selecting necessary states from the store
    const cities = useSelector(state => state.cities.citiesList);
    const isCitySelected = useSelector(state => state.cities.city.isCitySelected);
    const inputValue = useSelector(state => state.cities.inputValue);
    const isCityFound = useSelector(state => state.cities.city.isCityFound);
    const apiError = useSelector(state => state.forecast.apiError);

    const searchBarRef = useRef(null);
    const timeoutId = useRef(null);
    const [hasSpecialChars, setHasSpecialChars] = useState(false);

    // Handler for input change event
    const handleInputChange = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        const specialCharsRegex = /[!@#$%^&*()_+={};':"\\|,.<>/?]+/;

        if (value === '') dispatch(clearCitiesList());
        if (specialCharsRegex.test(value)) {
            setHasSpecialChars(true);
            dispatch(clearCitiesList());
        } else {
            setHasSpecialChars(false);
        }

        dispatch(setInputValue(value));
        dispatch(setIsCitySelected(false));
    };

    // Handler for input focus event
    const handleInputFocus = () => {
        if (inputValue.length > 1 && !isCitySelected && !hasSpecialChars) {
            dispatch(fetchingCities(inputValue));
        }
    };

    // Handler for form submit event
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '' && !hasSpecialChars && !apiError) {
            clearTimeout(timeoutId.current);
            await dispatch(fetchCityCoords(inputValue));
            dispatch(setIsCitySelected(true));
            dispatch(clearCitiesList());
        }
    };

    // Handler for selecting city from drop-down menu
    const handleCityClick = (city) => {
        dispatch(setInputValue(city.name));
        dispatch(setCoords(city.coords));
        dispatch(setIsCitySelected(true));
        dispatch(setIsCityFound(true));
        dispatch(clearCitiesList());
    };

    // Fetch cities data after a delay when input value changes
    useEffect(() => {
        timeoutId.current = setTimeout(() => {
            if (inputValue.length > 1 && !isCitySelected && !hasSpecialChars) {
                dispatch(fetchingCities(inputValue));
            }
        }, 300)
        return () => clearTimeout(timeoutId.current)
    }, [dispatch, inputValue, isCitySelected, hasSpecialChars]);

    // Clearing cities list when clicking outside the search bar
    useEffect(() => {
        function handleClickOutside(e) {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
                dispatch(clearCitiesList());
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    // Function to render error messages
    function renderErrorMessage() {
        if (apiError) {
            return <div className={styles.warning}>Failed to fetch data. Please try again later.</div>;
        } else if (!isCityFound && isCitySelected) {
            return <div className={styles.warning}>City not found.</div>;
        } else if (hasSpecialChars) {
            return <div className={styles.warning}>Special characters are not allowed.</div>;
        } else {
            return null;
        }
    }

    return (
        <div className={styles.searchBarContainer} ref={searchBarRef}>
            <div>
                <div className={styles.searchBarWrapper}>
                    <input type='text'
                           className={styles.searchInput}
                           autoFocus
                           placeholder={'Search city...'}
                           onChange={handleInputChange}
                           onFocus={handleInputFocus}
                           value={inputValue}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   e.preventDefault();
                                   handleSubmit(e);
                               }
                           }}
                    />
                    <button className={styles.btn} onClick={(e) => handleSubmit(e)}>Search</button>
                    {cities.length > 0 && (
                        <div className={styles.citiesAutoComplete}>
                            {cities.map((city, index) => (
                                <div key={index} onClick={() => handleCityClick(city)}>
                                    {city.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {renderErrorMessage()}
            </div>
        </div>
    );
}

export default Searchbar;