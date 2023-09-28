import React from 'react'; // eslint-disable-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import HourlyForecast from './hourly-forecast';

test('renders hourly forecast correctly', () => {
    const store = configureStore({
        reducer: {
            cities: () => ({city: {isCitySelected: true}}),
            forecast: () => ({
                forecastDataHourly: {
                    city: {timezone: 'Test/Timezone'},
                    list: [
                        {
                            main: {temp: 20, feels_like: 18, temp_min: 15, temp_max: 25, humidity: 80},
                            weather: [{main: 'Test Main', description: 'Test Description', icon: 'test-icon'}],
                            wind: {speed: 5},
                            dt_txt: '2022-03-01T12:00:00',
                        },
                    ],
                },
            }),
        },
    });

    render(
        <Provider store={store}>
            <HourlyForecast/>
        </Provider>
    );

    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/20 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 18 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/min: 15 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/max: 25 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 5m\/s/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 80%/i)).toBeInTheDocument();
});
