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
        <div className="col-span-3 bg-white">
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

            <ul className="grid grid-cols-12">
                {forecastDays &&
                    forecastDays.map((forecastDay, index) => (
                        <ForecastDay forecastDay={forecastDay} key={index} />
                    ))}
            </ul>
        </div>
    );
};
