import { FC } from 'react';

import { formatWindSpeed } from 'shared/helpers';

interface WindProps {
    location: WeatherLocation;
}

export const Wind: FC<WindProps> = ({ location }) => {
    return (
        <div className="grid h-full grid-cols-12 rounded-lg bg-sky-100 p-6 dark:bg-sky-800">
            <div className="col-span-6">
                <h2 className="font-regular text-slate-600 dark:text-slate-300">
                    Wind
                </h2>

                <p className="font-light text-slate-600 dark:text-slate-300">
                    Today's wind speed and direction
                </p>

                <p className="font-regular text-slate-600 dark:text-slate-300">
                    {formatWindSpeed(location?.wind.speed)}
                </p>
            </div>

            <div className="col-span-6">
                <div className="compass relative ml-auto h-24 w-24 rounded-full border-[0.5px] border-dashed border-slate-600 dark:border-slate-300">
                    <div className="direction direction--north absolute top-0 left-1/2 -translate-x-1/2 translate-y-0 transform-gpu px-[2px] font-light text-xs text-slate-600 dark:text-slate-300">
                        N
                    </div>

                    <div className="direction direction--east absolute top-1/2 right-0 translate-x-0 -translate-y-1/2 transform-gpu px-[2px] font-light text-xs text-slate-600 dark:text-slate-300">
                        E
                    </div>

                    <div className="direction direction--south absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 transform-gpu px-[2px] font-light text-xs text-slate-600 dark:text-slate-300">
                        S
                    </div>

                    <div className="direction direction--west absolute top-1/2 left-0 translate-x-0 -translate-y-1/2 transform-gpu px-[2px] font-light text-xs text-slate-600 dark:text-slate-300">
                        W
                    </div>
                    <div
                        className="wind-direction after:content[''] absolute left-1/2 top-1/2 h-full w-[1px] transform-gpu bg-slate-600 transition-transform after:absolute after:-left-[4.5px] after:top-[85px] after:block after:h-0 after:w-0 after:border-t-[10px] after:border-l-[5px] after:border-b-0 after:border-r-[5px] after:border-solid after:border-transparent after:border-t-slate-600 dark:bg-slate-300 dark:after:border-t-slate-300"
                        style={{
                            transform: `translate3d(-50%, -50%, 0) rotate(${location.wind.direction}deg)`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
