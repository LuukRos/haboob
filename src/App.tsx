import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';

import { API_ENDPOINT, API_GEO_ENDPOINT, API_KEY } from 'shared/constants';

import Forecast from 'components/Forecast';
import LocationDetails from 'components/LocationDetails';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import './App.css';

const App = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [locations, setLocations] = useState<WeatherLocation[]>([]);
    const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
    const [forecastHours, setForecastHours] = useState<ForecastHour[]>([]);

    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const { get: getOneCall } = useFetch(API_ENDPOINT);
    const { get: getGeo } = useFetch(API_GEO_ENDPOINT);

    const onGeoLocationSuccess = (position: GeolocationPosition): void => {
        const {
            coords: { latitude, longitude }
        } = position;

        if (latitude) setLatitude(latitude);
        if (longitude) setLongitude(longitude);
    };

    const onGeoLocationError = (error: GeolocationPositionError): void => {
        console.error(error);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onGeoLocationSuccess,
            onGeoLocationError
        );
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            let geoLocation: GeoLocation;
            getGeo(
                `reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            )
                .then((response) => {
                    const apiGeoLocation = response[0];
                    geoLocation = {
                        countryCode: apiGeoLocation.country,
                        name: apiGeoLocation.name
                    };

                    return geoLocation;
                })
                .catch((error) => console.error(error));

            getOneCall(
                `onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
            )
                .then(
                    ({
                        current: apiCurrent,
                        hourly: apiForecastHours,
                        daily: apiForecastDays
                    }) => {
                        console.log(new Date(apiForecastDays[0].dt * 1000));
                        // Map current weather
                        const location: WeatherLocation = {
                            name: geoLocation.name,
                            date: new Date(apiCurrent.dt * 1000),
                            countryCode: geoLocation.countryCode,
                            coords: {
                                latitude,
                                longitude
                            },
                            temperature: {
                                value: apiCurrent.temp,
                                perceived: apiCurrent.feels_like
                            },
                            rain: {
                                probability: apiForecastDays[0].pop
                            },
                            wind: {
                                speed: apiCurrent.wind_speed,
                                direction: apiCurrent.wind_deg
                            },
                            various: {
                                humidity: apiCurrent.pressure,
                                pressure: apiCurrent.humidity,
                                uvIndex: apiCurrent.uvi
                            },
                            times: {
                                sunrise: apiCurrent.sunrise,
                                sunset: apiCurrent.sunset
                            },
                            isSelected: true
                        };

                        if (
                            !locations.filter(
                                (existingLocation) =>
                                    existingLocation.name === location.name
                            ).length
                        ) {
                            setLocations([...locations, location]);
                        }

                        // Map forecast days
                        const forecastDays: ForecastDay[] = apiForecastDays.map(
                            (apiForecastDay: any): ForecastDay => ({
                                date: new Date(apiForecastDay.dt * 1000),
                                temperature: {
                                    value:
                                        (apiForecastDay.temp.min +
                                            apiForecastDay.temp.max) /
                                        2,
                                    min: apiForecastDay.temp.min,
                                    max: apiForecastDay.temp.max
                                },
                                weather: {
                                    type: apiForecastDay.weather[0].main,
                                    icon: apiForecastDay.weather[0].icon
                                }
                            })
                        );

                        if (forecastDays.length) {
                            // forecastDays.shift(); // Remove the first day as this is not actually a 'forecast'.

                            setForecastDays(forecastDays);
                        }

                        // Map forecast hours
                        const forecastHours: ForecastHour[] =
                            apiForecastHours.map(
                                (apiForecastHour: any): ForecastHour => ({
                                    date: new Date(apiForecastHour.dt * 1000),
                                    temperature: {
                                        value: apiForecastHour.temp
                                    },
                                    weather: {
                                        type: apiForecastHour.weather[0].main,
                                        icon: apiForecastHour.weather[0].icon
                                    }
                                })
                            );

                        if (forecastHours.length) {
                            setForecastHours(forecastHours);
                        }

                        setIsLoading(false);
                    }
                )
                .catch((error) => console.error(error));
        }
    }, [latitude, longitude]);

    if (isLoading || !locations || !locations.length) return null;

    return (
        <div className={`h-screen bg-red-500`}>
            <NavBar />

            <div className="container grid grid-cols-12 gap-4 mx-auto">
                <SideBar locations={locations} />

                <LocationDetails
                    location={locations.find((location) => location.isSelected)}
                />

                <Forecast
                    forecastDays={forecastDays}
                    forecastHours={forecastHours}
                />
            </div>
        </div>
    );
};

export default App;
