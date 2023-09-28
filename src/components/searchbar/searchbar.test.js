import React from 'react'; // eslint-disable-line no-unused-vars
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import citiesReducer from '../../reducers/cities-slice.jsx';
import forecastReducer from '../../reducers/forecast-slice.jsx';
import Searchbar from './searchbar.jsx';

test('renders Searchbar and allows typing into the input field', async () => {
    const store = configureStore({
        reducer: {
            cities: citiesReducer,
            forecast: forecastReducer,
        },
    });

    render(
        <Provider store={store}>
            <Searchbar/>
        </Provider>
    );

    const input = screen.getByPlaceholderText('Search for a city...');
    userEvent.type(input, 'Sofia');

    await waitFor(() => expect(input.value).toBe('Sofia'));
});

test('clears input field when clear button is clicked', () => {
    const store = configureStore({
        reducer: {
            cities: citiesReducer,
            forecast: forecastReducer,
        },
    });

    render(
        <Provider store={store}>
            <Searchbar/>
        </Provider>
    );

    const input = screen.getByPlaceholderText('Search for a city...');
    userEvent.type(input, 'Sofia');

    const clearButton = screen.getByRole('button', {name: /Search/i});
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
});