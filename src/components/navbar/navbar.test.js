import React from 'react'; // eslint-disable-line no-unused-vars
import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import {storeConfig} from '../../store.js';
import Navbar from './navbar.jsx';

// Import the actual slices
import * as citiesSlice from '../../reducers/cities-slice.jsx';

// Mock the action creators
jest.spyOn(citiesSlice, 'setInputValue').mockImplementation(() => ({type: 'mock-setInputValue'}));
jest.spyOn(citiesSlice, 'clearCitiesList').mockImplementation(() => ({type: 'mock-clearCitiesList'}));
jest.spyOn(citiesSlice, 'setIsCitySelected').mockImplementation(() => ({type: 'mock-setIsCitySelected'}));

describe('Navbar', () => {
    it('renders correctly', () => {
        const store = configureStore(storeConfig);
        const {getByText} = render(
            <Provider store={store}>
                <Navbar/>
            </Provider>
        );

        expect(getByText('Weather App')).toBeInTheDocument();
    });

    it('calls handleClearData on button click', () => {
        const store = configureStore(storeConfig);
        const {getByText} = render(
            <Provider store={store}>
                <Navbar/>
            </Provider>
        );

        fireEvent.click(getByText('Weather App'));

        expect(citiesSlice.setInputValue).toHaveBeenCalledWith('');
        expect(citiesSlice.clearCitiesList).toHaveBeenCalled();
        expect(citiesSlice.setIsCitySelected).toHaveBeenCalledWith(false);
    });
});