import { FC } from 'react';
import { formatPressure } from 'shared/helpers';

interface PressureProps {
    location: WeatherLocation;
}

export const Pressure: FC<PressureProps> = ({ location }) => {
    return (
        <div className="grid grid-cols-12 p-8 bg-sky-100 rounded-2xl">
            <div className="col-span-6">
                <h2 className="font-regular">Pressure</h2>
                <p className="font-light">Today's air pressure</p>
                <p className="font-regular">
                    {formatPressure(location.various.pressure)}
                </p>
            </div>

            <div className="col-span-6"></div>
        </div>
    );
};
