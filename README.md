# Weather App

This is a weather application built with React and Redux. It allows users to search for a city and view the current weather and hourly forecast for that city.

## Features

- Search for a city by name
- View current weather for the selected city
- View hourly forecast for the selected city
- Clear user data and reset the application state
- Handle API errors and display appropriate error messages

## Structure

The application is structured into several components and Redux slices:

### Components

- **Navbar**: Displays the application logo and a button to clear user data and reset the application state.
- **Searchbar**: Allows users to search for a city. It also handles input validation and displays a list of matching cities as the user types.
- **CurrentWeather**: Displays the current weather for the selected city.
- **HourlyForecast**: Displays the hourly forecast for the selected city.
- **LoadingSpinner**: Displays a loading spinner while the weather data is being fetched.

### Redux Slices

- **cities-slice**: Manages the state related to cities, including the list of cities, selected city, and user input.
- **forecast-slice**: Manages the state related to weather data, including the current weather and hourly forecast.

## Testing

This application uses Jest and React Testing Library for testing. 

To run the tests, use the command `npm test`.

## Dependencies

- React
- Redux
- Redux Toolkit
- React Redux
- Axios
- Reselect
- Jest
- React Testing Library

## Dev Dependencies

- Babel
- ESLint
- Vite
- Jest
- Babel Jest
- React Testing Library
- Vite Plugin ESLint

## Installation

1. Clone the repository
2. Install the dependencies with `npm install`
3. Start the development server with `npm start`
4. Run tests with `npm test`

## Usage

1. Enter a city name in the search bar.
2. Select a city from the dropdown list.
3. View the current weather and hourly forecast for the selected city.
