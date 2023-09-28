import React from 'react'; // eslint-disable-line no-unused-vars
import styles from "./navbar.module.css"
import {clearCitiesList, setInputValue, setIsCitySelected} from "../../reducers/cities-slice.jsx";
import {useDispatch} from "react-redux";

function Navbar() {
    const dispatch = useDispatch();

    function handleClearData() {
        dispatch(setInputValue(''));
        dispatch(clearCitiesList());
        dispatch(setIsCitySelected(false));
    }

    return (
        <nav className={styles.navbar}>
            <button className={styles.logo} onClick={handleClearData}>Weather App</button>
        </nav>
    );
}

export default Navbar;