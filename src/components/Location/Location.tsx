import { FC, useContext } from 'react';

import useFetch from 'hooks/useFetch';
import { AppContext } from 'context/AppContext';

import CountryFlag from 'components/CountryFlag';
import Delete from 'assets/icons/Delete';
import Refresh from 'assets/icons/Refresh';
import CurrentLocation from 'assets/icons/CurrentLocation';
import { API_ENDPOINT, API_KEY } from 'shared/constants';

interface LocationProps {
    location: WeatherLocation;
}

export const Location: FC<LocationProps> = ({ location }) => {
    const { locations, deleteLocation, updateLocation, selectLocation } =
        useContext(AppContext);
    const { get: getOneCall } = useFetch(API_ENDPOINT);

    const handleLocationSelection = (selectedLocation: WeatherLocation) => {
        selectLocation(selectedLocation);
    };

    const handleLocationRefresh = (location: WeatherLocation) => {
        const {
            name,
            countryCode: country,
            coords: { latitude, longitude }
        } = location;
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
                    const forecastHours: ForecastHour[] = apiForecastHours.map(
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
                        name: name,
                        date: new Date(apiCurrent.dt * 1000),
                        time: new Date(apiCurrent.dt * 1000).toLocaleTimeString(
                            'nl-NL',
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: timezone
                            }
                        ),
                        countryCode: country,
                        coords: {
                            latitude,
                            longitude
                        },
                        temperature: {
                            value: apiCurrent.temp,
                            perceived: apiCurrent.feels_like,
                            day: {
                                morning: apiForecastDays[0].feels_like.morn,
                                afternoon: apiForecastDays[0].feels_like.day,
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
                            humidity: apiCurrent.pressure,
                            pressure: apiCurrent.humidity,
                            uvIndex: apiCurrent.uvi
                        },
                        times: {
                            sunrise: apiCurrent.sunrise,
                            sunset: apiCurrent.sunset
                        },
                        isSelected: true,
                        isCurrentLocation: !!locations.find(
                            (location) => location.name === name
                        )?.isCurrentLocation,
                        forecastDays: forecastDays,
                        forecastHours: forecastHours,
                        weather: {
                            type: apiCurrent.weather[0].main,
                            icon: apiCurrent.weather[0].icon
                        }
                    };

                    updateLocation(location);
                }
            )
            .catch((error) => console.error(error));
    };

    return (
        <li
            className={`mb-4 flex items-center justify-between rounded-lg border-l-8 bg-sky-100 p-4 last-of-type:mb-0 dark:bg-sky-800 ${
                location.isSelected
                    ? 'border-l-sky-800 dark:border-l-sky-100'
                    : 'border-l-transparent'
            }`}
        >
            <span
                className="flex cursor-pointer items-center"
                onClick={() => handleLocationSelection(location)}
            >
                <CountryFlag countryCode={location.countryCode} />

                <span className="my-auto ml-2 text-slate-600 dark:text-slate-300">
                    {location.name}
                </span>
            </span>

            <span className="flex items-center justify-between">
                {location.isCurrentLocation && (
                    <CurrentLocation className="mr-2" />
                )}

                {location.isSelected && (
                    <Refresh
                        onClick={() => handleLocationRefresh(location)}
                        className="mr-2 cursor-pointer"
                    />
                )}

                <Delete
                    onClick={() => deleteLocation(location)}
                    className="cursor-pointer"
                />
            </span>
        </li>
    );
};
