import { FC } from 'react';

import { UV_INDEX } from 'shared/constants';

interface UVIndexProps {
    location: WeatherLocation;
}

export const UVIndex: FC<UVIndexProps> = ({ location }) => {
    const uvIndex = location.various.uvIndex;
    const uvIndexObject = UV_INDEX.reduce((result, current) =>
        Math.abs(result.value - uvIndex) > Math.abs(current.value - uvIndex)
            ? current
            : result
    );

    return (
        <div className="grid grid-cols-12 rounded-lg bg-sky-100 p-6 dark:bg-sky-800">
            <div className="col-span-6">
                <h2 className="font-regular text-slate-600 dark:text-slate-300">
                    UV Index
                </h2>

                <p className="font-light text-slate-600 dark:text-slate-300">
                    Today's UV index
                </p>

                <p className="font-regular text-slate-600 dark:text-slate-300">
                    {uvIndex}
                </p>
            </div>

            <div className="col-span-6 flex flex-col items-center justify-center">
                <div
                    className="relative mb-2 h-4 w-full rounded-lg p-[2px]"
                    style={{
                        background: `linear-gradient(
                                90deg,
                                #3ea72d 0%,
                                #fff300 25%,
                                #f18b00 50%,
                                #e53210 75%,
                                #b567a4 100%
                            )`
                    }}
                >
                    <div
                        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-lg border-2 border-sky-100 bg-white transition-transform dark:border-sky-800 dark:bg-slate-300"
                        style={{
                            left: `${
                                (uvIndex / 11) * 100 >= 100
                                    ? 100
                                    : (uvIndex / 11) * 100
                            }%`
                        }}
                    />
                </div>

                <p className="font-regular text-slate-600 dark:text-slate-300">
                    {uvIndexObject.description}
                </p>
            </div>
        </div>
    );
};
