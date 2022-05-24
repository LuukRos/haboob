import { FC } from 'react';
import { formatPressure } from 'shared/helpers';

interface PressureProps {
    location: WeatherLocation;
}

export const Pressure: FC<PressureProps> = ({ location }) => {
    return (
        <div className="grid grid-cols-12 rounded-lg bg-sky-100 p-6 dark:bg-sky-800">
            <div className="col-span-6">
                <h2 className="font-regular text-slate-600 dark:text-slate-300">
                    Pressure
                </h2>

                <p className="font-light text-slate-600 dark:text-slate-300">
                    Today's air pressure
                </p>

                <p className="font-regular text-slate-600 dark:text-slate-300">
                    {formatPressure(location.various.pressure)}
                </p>
            </div>

            <div className="col-span-6"></div>
        </div>
    );
};
