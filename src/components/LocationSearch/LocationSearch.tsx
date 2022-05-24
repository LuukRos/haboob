import { FC, FormEvent, useContext, useEffect, useState } from 'react';

import useFetch from 'hooks/useFetch';
import { AppContext } from 'context/AppContext';

import { API_ENDPOINT, API_GEO_ENDPOINT, API_KEY } from 'shared/constants';
import Search from 'assets/icons/Search';

interface LocationSearchProps {}

export const LocationSearch: FC<LocationSearchProps> = () => {
    const [searchInput, setSearchInput] = useState('');
    const [foundLocation, setFoundLocation] = useState<GeoLocation>();
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();

    const { get: getOneCall } = useFetch(API_ENDPOINT);
    const { get: getGeo } = useFetch(API_GEO_ENDPOINT);

    const context = useContext(AppContext);

    useEffect(() => {
        if (foundLocation && latitude && longitude) {
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
                            name: foundLocation.name,
                            date: new Date(apiCurrent.dt * 1000),
                            time: new Date(
                                apiCurrent.dt * 1000
                            ).toLocaleTimeString('nl-NL', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: timezone
                            }),
                            countryCode: foundLocation.country,
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
                                humidity: apiCurrent.pressure,
                                pressure: apiCurrent.humidity,
                                uvIndex: apiCurrent.uvi
                            },
                            times: {
                                sunrise: apiCurrent.sunrise,
                                sunset: apiCurrent.sunset
                            },
                            isSelected: true,
                            isCurrentLocation: false,
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
    }, [foundLocation, latitude, longitude]);

    const handleLocationSearchSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (searchInput) {
            getGeo(`direct?q=${searchInput}&limit=1&appid=${API_KEY}`)
                .then((response) => {
                    if (!response.length) {
                        console.error('No results found');
                        return;
                    }

                    const {
                        name,
                        country,
                        lat: latitude,
                        lon: longitude
                    } = response[0];
                    setFoundLocation({
                        name,
                        country
                    });
                    setLatitude(latitude);
                    setLongitude(longitude);
                })
                .catch((error) => console.error(error))
                .finally(() => setSearchInput(''));
        }
    };

    return (
        <form className="relative mb-4" onSubmit={handleLocationSearchSubmit}>
            <input
                type="text"
                placeholder="Search for a city..."
                className="h-8 w-full rounded-lg bg-sky-800 px-4 py-8 text-slate-300 placeholder:text-slate-300 dark:bg-sky-100 dark:text-slate-600 dark:placeholder:text-slate-600"
                value={searchInput}
                onChange={({ target: { value } }) => setSearchInput(value)}
            />

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 transform-gpu text-slate-300 dark:text-slate-600"
                type="submit"
            >
                <Search />
            </button>
        </form>
    );
};
