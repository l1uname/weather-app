import React from 'react'; // eslint-disable-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {storeConfig} from '../../../store';
import CurrentWeather from './current-weather';

test('renders temperature correctly', () => {
    const store = configureStore({
        ...storeConfig,
        preloadedState: {
            forecast: {
                forecastDataCurrent: { // set the forecastDataCurrent
                    timezone: 'Test/Timezone',
                    name: 'Test City',
                    sys: {country: 'Test Country'},
                    weather: [{icon: 'test-icon', description: 'Test Description'}],
                    main: {temp: 20, feels_like: 18, humidity: 80},
                    wind: {speed: 5},
                },
            },
            cities: {
                city: {
                    isCitySelected: true,
                },
            },
        },
    });

    render(
        <Provider store={store}>
            <CurrentWeather/>
        </Provider>
    );

    const temperatureElement = screen.getByText(/20/i);
    expect(temperatureElement).toBeInTheDocument();
});