import { useContext, useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import { AppContext } from 'context/AppContext';

import {
    API_ENDPOINT,
    API_GEO_ENDPOINT,
    API_KEY,
    TEMPERATURE_COLORS
} from 'shared/constants';

import Forecast from 'components/Forecast';
import LocationDetails from 'components/LocationDetails';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import './App.css';

const App = () => {
    const context = useContext(AppContext);
    const [locations, setLocations] = useState<WeatherLocation[]>(
        // @ts-ignore
        () => JSON.parse(localStorage.getItem('locations'))
    );
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();

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
        if (!locations || !locations.length) {
            // Get current position of user.
            navigator.geolocation.getCurrentPosition(
                onGeoLocationSuccess,
                onGeoLocationError
            );
        } else {
            // Restore locations from local storage.
            locations.forEach((location) => {
                context.addLocation(location);
            });
        }
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
                        country: apiGeoLocation.country,
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
                        timezone,
                        current: apiCurrent,
                        hourly: apiForecastHours,
                        daily: apiForecastDays
                    }) => {
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

                        // Map forecast hours
                        const forecastHours: ForecastHour[] =
                            apiForecastHours.map(
                                (apiForecastHour: any): ForecastHour => ({
                                    date: new Date(apiForecastHour.dt * 1000),
                                    time: new Date(
                                        apiForecastHour.dt * 1000
                                    ).toLocaleTimeString('nl-NL', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: timezone
                                    }),
                                    temperature: {
                                        value: apiForecastHour.temp
                                    },
                                    weather: {
                                        type: apiForecastHour.weather[0].main,
                                        icon: apiForecastHour.weather[0].icon
                                    }
                                })
                            );

                        // Map current weather and the forecast hours and days
                        const location: WeatherLocation = {
                            name: geoLocation.name,
                            date: new Date(apiCurrent.dt * 1000),
                            time: new Date(
                                apiCurrent.dt * 1000
                            ).toLocaleTimeString('nl-NL', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: timezone
                            }),
                            countryCode: geoLocation.country,
                            coords: {
                                latitude,
                                longitude
                            },
                            temperature: {
                                value: apiCurrent.temp,
                                perceived: apiCurrent.feels_like,
                                day: {
                                    morning: apiForecastDays[0].feels_like.morn,
                                    afternoon:
                                        apiForecastDays[0].feels_like.day,
                                    evening: apiForecastDays[0].feels_like.eve,
                                    night: apiForecastDays[0].feels_like.night
                                }
                            },
                            rain: {
                                probability: apiForecastDays[0].pop
                            },
                            wind: {
                                speed: apiCurrent.wind_speed,
                                direction: apiCurrent.wind_deg
                            },
                            various: {
                                humidity: apiCurrent.humidity,
                                pressure: apiCurrent.pressure,
                                uvIndex: apiCurrent.uvi
                            },
                            times: {
                                sunrise: apiCurrent.sunrise,
                                sunset: apiCurrent.sunset
                            },
                            isSelected: true,
                            isCurrentLocation: true,
                            forecastDays: forecastDays,
                            forecastHours: forecastHours,
                            weather: {
                                type: apiCurrent.weather[0].main,
                                icon: apiCurrent.weather[0].icon
                            }
                        };

                        context.addLocation(location);
                    }
                )
                .catch((error) => console.error(error));
        }
    }, [latitude, longitude]);

    return (
        <div className="container mx-auto grid grid-cols-12 gap-4 p-4 md:p-0 md:py-4">
            <NavBar />

            <SideBar />

            <LocationDetails />

            <Forecast />
        </div>
    );
};

export default App;
