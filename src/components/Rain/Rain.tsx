import { FC } from 'react';

import { CircleGraph } from 'shared/graphs/CircleGraph';
import { formatRainProbability } from 'shared/helpers';

interface RainProps {
    location: WeatherLocation;
}

export const Rain: FC<RainProps> = ({ location }) => {
    return (
        <div className="grid grid-cols-12 p-8 bg-sky-100 rounded-2xl">
            <div className="col-span-6">
                <h2 className="font-regular">Rain</h2>
                <p className="font-light">Today's chance of rain</p>
                <p className="font-regular">
                    {formatRainProbability(location.rain.probability)}
                </p>
            </div>

            <div className="col-span-6">
                <CircleGraph
                    percentage={location.rain.probability * 100}
                    color="blue"
                />
            </div>
        </div>
    );
};
