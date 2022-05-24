import { AppContext } from 'context/AppContext';
import { FC, useContext } from 'react';

import { CircleChart } from 'shared/graphs/CircleChart';
import { formatRainProbability } from 'shared/helpers';

interface RainProps {
    location: WeatherLocation;
}

export const Rain: FC<RainProps> = ({ location }) => {
    const { theme } = useContext(AppContext);

    const data = {
        datasets: [
            {
                id: 'rainProbability',
                label: 'Rain probability',
                data: [
                    (location.rain.probability * 100).toFixed(),
                    (100 - location.rain.probability * 100).toFixed()
                ],
                borderWidth: 0,
                backgroundColor: [
                    theme === 'light' ? 'rgb(71 85 105)' : 'rgb(203 213 225)',
                    theme === 'light' ? 'rgb(224 242 254)' : 'rgb(12 74 110)',
                    'white'
                ],
                cutout: 60
            }
        ]
    };

    return (
        <div className="grid grid-cols-12 rounded-lg bg-sky-100 p-6 dark:bg-sky-800">
            <div className="col-span-6">
                <h2 className="font-regular text-slate-600 dark:text-slate-300">
                    Rain
                </h2>

                <p className="font-light text-slate-600 dark:text-slate-300">
                    Today's chance of rain
                </p>

                <p className="font-regular text-slate-600 dark:text-slate-300">
                    {formatRainProbability(location.rain.probability)}
                </p>
            </div>

            <div className="col-span-6">
                <div className="relative">
                    <CircleChart data={data} />

                    <span className="absolute top-[52.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu font-regular text-2xl text-slate-600 dark:text-slate-300">
                        {formatRainProbability(location.rain.probability)}
                    </span>
                </div>
            </div>
        </div>
    );
};
