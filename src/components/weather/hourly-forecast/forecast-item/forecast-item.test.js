import React from 'react'; // eslint-disable-line no-unused-vars
import {render, screen} from '@testing-library/react';
import ForecastItem from './forecast-item';

test('renders forecast item correctly', () => {
    render(
        <ForecastItem
            description="Test Description"
            icon="test-icon"
            temp={20}
            feels_like={18}
            temp_min={15}
            temp_max={25}
            humidity={80}
            windSpeed={5}
            dt_txt="2022-03-01T12:00:00"
            timezone="Test/Timezone"
        />
    );

    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/20 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 18 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/min: 15 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/max: 25 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 5m\/s/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 80%/i)).toBeInTheDocument();
});