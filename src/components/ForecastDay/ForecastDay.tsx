import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import { API_IMAGE_ENDPOINT } from 'shared/constants';
import { formatDate, formatDay, formatTemperature } from 'shared/helpers';

interface ForecastDayProps {
    forecastDay: ForecastDay;
}

export const ForecastDay: FC<ForecastDayProps> = ({ forecastDay }) => {
    const {
        settings: { units }
    } = useContext(AppContext);

    return (
        <li className="col-span-12 grid grid-cols-12 items-center justify-between">
            <div className="col-span-4">
                <div className="font-regular text-slate-600 dark:text-slate-300">
                    {formatDay(new Date(forecastDay.date))}
                </div>

                <div className="font-light text-slate-500 dark:text-slate-200">
                    {formatDate(new Date(forecastDay.date))}
                </div>
            </div>

            <div className="col-span-4 text-center font-light text-slate-500 dark:text-slate-300">
                {formatTemperature(forecastDay.temperature.value, units)}
            </div>

            <div className="col-span-4 flex justify-end">
                <img
                    src={`${API_IMAGE_ENDPOINT}${forecastDay.weather?.icon}@2x.png`}
                    alt={forecastDay.weather.type}
                    className="mr-0"
                />
            </div>
        </li>
    );
};
