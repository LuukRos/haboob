import { FC } from 'react';

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
    return (
        <li className="flex flex-col justify-between items-center p-4 mx-1 first-of-type:ml-0 last-of-type:mr-0 bg-slate-300 rounded-xl">
            <div>
                {index === 0
                    ? 'Now'
                    : forecastHour.date.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                      })}
            </div>

            <img
                src={`${API_IMAGE_ENDPOINT}${forecastHour.weather?.icon}@2x.png`}
                alt={forecastHour.weather.type}
                className="w-[3rem] max-w-[3rem]"
            />

            <div>{formatTemperature(forecastHour.temperature.value)}</div>
        </li>
    );
};
