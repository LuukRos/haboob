import { FC } from 'react';

import { CircleGraph } from 'shared/graphs/CircleGraph';
import { formatRainProbability } from 'shared/helpers';

interface RainProps {
    location: WeatherLocation;
}

export const Rain: FC<RainProps> = ({ location }) => {
    return (
        <div className="grid grid-cols-12 p-8 bg-blue-100 rounded-2xl">
            <div className="col-span-6">
                {formatRainProbability(location.rain.probability)}
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
