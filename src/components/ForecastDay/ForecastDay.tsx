import { FC } from 'react';

import { API_IMAGE_ENDPOINT } from 'shared/constants';
import { formatDate, formatDay, formatTemperature } from 'shared/helpers';

interface ForecastDayProps {
    forecastDay: ForecastDay;
}

export const ForecastDay: FC<ForecastDayProps> = ({ forecastDay }) => {
    return (
        <li className="col-span-12 justify-between items-center grid grid-cols-12">
            <div className="col-span-4">
                <div className="font-regular text-black">
                    {formatDay(forecastDay.date)}
                </div>

                <div className="font-light text-gray-500">
                    {formatDate(forecastDay.date)}
                </div>
            </div>

            <div className="col-span-4 font-light text-center">
                {formatTemperature(forecastDay.temperature.value)}
            </div>

            <div className="col-span-4">
                <img
                    src={`${API_IMAGE_ENDPOINT}${forecastDay.weather?.icon}@2x.png`}
                    alt={forecastDay.weather.type}
                    className="mr-0"
                />
            </div>
        </li>
    );
};
