import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import ForecastDay from 'components/ForecastDay';
import ForecastHour from 'components/ForecastHour';

interface ForecastProps {}

export const Forecast: FC<ForecastProps> = () => {
    const { locations } = useContext(AppContext);
    if (!locations.length) return null;

    const location = locations.find((location) => location.isSelected);
    if (!location) return null;

    const forecastDays = location.forecastDays;
    const forecastHours = location.forecastHours;

    return (
        <div className="col-span-12 md:col-span-3">
            <ul className="flex overflow-x-scroll">
                {forecastHours &&
                    forecastHours.map((forecastHour, index) => (
                        <ForecastHour
                            forecastHour={forecastHour}
                            index={index}
                            key={index}
                        />
                    ))}
            </ul>

            <ul className="mt-4 grid grid-cols-12 rounded-lg bg-sky-100 px-4 dark:bg-sky-800">
                {forecastDays &&
                    forecastDays.map((forecastDay, index) => (
                        <ForecastDay forecastDay={forecastDay} key={index} />
                    ))}
            </ul>
        </div>
    );
};
