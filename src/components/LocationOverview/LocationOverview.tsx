import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { WEEKDAYS } from 'shared/constants';
import {
    convertMetricToImperial,
    formatHumidity,
    formatPressure,
    formatRainProbability,
    formatTemperature,
    formatWindSpeed
} from 'shared/helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LocationOverviewProps {
    location: WeatherLocation;
}

export const LocationOverview: FC<LocationOverviewProps> = ({ location }) => {
    const {
        theme,
        settings: { units }
    } = useContext(AppContext);

    const labels = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const options = {
        plugins: {
            legend: {
                display: true,
                label: {
                    color: 'white'
                }
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                id: 'temperature',
                label: 'Temperature',
                data: [
                    units === 'metric'
                        ? location.temperature.day.morning
                        : convertMetricToImperial(
                              location.temperature.day.morning
                          ),
                    units === 'metric'
                        ? location.temperature.day.afternoon
                        : convertMetricToImperial(
                              location.temperature.day.afternoon
                          ),
                    units === 'metric'
                        ? location.temperature.day.evening
                        : convertMetricToImperial(
                              location.temperature.day.evening
                          ),
                    units === 'metric'
                        ? location.temperature.day.night
                        : convertMetricToImperial(
                              location.temperature.day.night
                          )
                ],
                tension: 0.25,
                fill: false,
                backgroundColor:
                    theme === 'light' ? 'rgb(71 85 105)' : 'rgb(203 213 225)',
                borderColor:
                    theme === 'light' ? 'rgb(71 85 105)' : 'rgb(203 213 225)'
            }
        ]
    };

    if (!location) return null;

    return (
        <>
            <div className="col-span-12 flex flex-col justify-between md:col-span-6">
                <div className="flex items-center justify-between">
                    <span className="font-regular text-slate-600 dark:text-slate-300">
                        {location.name}
                    </span>

                    <span className="font-light text-slate-600 dark:text-slate-300">
                        {WEEKDAYS[new Date(location.date).getDay()]}{' '}
                        {location.time}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="py-8 font-regular text-8xl text-slate-600 dark:text-slate-300">
                        {formatTemperature(location.temperature.value, units)}
                    </div>

                    <span className="text-md font-light text-slate-600 dark:text-slate-300">
                        (Perceived as{' '}
                        {formatTemperature(
                            location.temperature.perceived,
                            units
                        )}
                        )
                    </span>

                    <div className="font-light text-lg text-slate-600 dark:text-slate-300">
                        {location.weather.type}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 font-light text-lg text-slate-600 dark:text-slate-300">
                        {formatWindSpeed(location.wind.speed)}
                    </div>

                    <div className="col-span-3 font-light text-lg text-slate-600 dark:text-slate-300">
                        {formatRainProbability(location.rain.probability)}
                    </div>

                    <div className="col-span-3 font-light text-lg text-slate-600 dark:text-slate-300">
                        {formatPressure(location.various.pressure)}
                    </div>

                    <div className="col-span-3 font-light text-lg text-slate-600 dark:text-slate-300">
                        {formatHumidity(location.various.humidity)}
                    </div>
                </div>
            </div>

            <div className="col-span-12 flex items-center justify-center rounded-lg bg-sky-50 bg-opacity-50 p-4 dark:bg-sky-700 md:col-span-6">
                {/* @ts-ignore */}
                <Line data={data} options={options} />
            </div>
        </>
    );
};
