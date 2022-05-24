import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import { API_IMAGE_ENDPOINT } from 'shared/constants';
import { formatTemperature } from 'shared/helpers';

interface ForecastHourProps {
    forecastHour: ForecastHour;
    index: number;
}

export const ForecastHour: FC<ForecastHourProps> = ({
    forecastHour,
    index
}) => {
    const {
        settings: { units }
    } = useContext(AppContext);

    return (
        <li className="mx-1 flex flex-col items-center justify-between rounded-lg bg-sky-100 p-4 first-of-type:ml-0 last-of-type:mr-0 dark:bg-sky-800">
            <div className="text-slate-600 dark:text-slate-300">
                {index === 0 ? 'Now' : forecastHour.time}
            </div>

            <img
                src={`${API_IMAGE_ENDPOINT}${forecastHour.weather?.icon}@2x.png`}
                alt={forecastHour.weather.type}
                className="w-[3rem] max-w-[3rem]"
            />

            <div className="text-slate-600 dark:text-slate-300">
                {formatTemperature(forecastHour.temperature.value, units)}
            </div>
        </li>
    );
};
