import { FC } from 'react';

import ForecastDay from 'components/ForecastDay';
import ForecastHour from 'components/ForecastHour';

interface ForecastProps {
    forecastDays: ForecastDay[];
    forecastHours: ForecastHour[];
}

export const Forecast: FC<ForecastProps> = ({
    forecastDays,
    forecastHours
}) => {
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
