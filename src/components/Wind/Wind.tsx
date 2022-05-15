import { FC } from 'react';

import { formatWindSpeed } from 'shared/helpers';

interface WindProps {
    location: WeatherLocation;
}

export const Wind: FC<WindProps> = ({ location }) => {
    return (
        <div className="grid grid-cols-12 p-8 bg-blue-100 rounded-2xl">
            <div className="col-span-6">
                {formatWindSpeed(location?.wind.speed)}
            </div>

            <div className="col-span-6">
                <div className="compass border-dashed border-[0.5px] border-blue-500 h-32 w-32 rounded-full relative ml-auto">
                    <div className="direction direction--north absolute top-0 left-1/2 transform-gpu -translate-x-1/2 translate-y-0 p-[2px] text-xs">
                        N
                    </div>

                    <div className="direction direction--east absolute top-1/2 right-0 transform-gpu translate-x-0 -translate-y-1/2 p-[2px] text-xs">
                        E
                    </div>

                    <div className="direction direction--south absolute bottom-0 left-1/2 transform-gpu -translate-x-1/2 translate-y-0 p-[2px] text-xs">
                        S
                    </div>

                    <div className="direction direction--west absolute top-1/2 left-0 transform-gpu translate-x-0 -translate-y-1/2 p-[2px] text-xs">
                        W
                    </div>
                    <div
                        className="wind-direction h-full w-[1px] bg-blue-700 absolute left-1/2 top-1/2 after:content[''] after:block after:absolute after:w-0 after:h-0 after:border-solid after:border-t-[20px] after:border-l-[10px] after:border-b-0 after:border-r-[10px] after:border-t-blue-700 after:border-transparent after:-left-[8px] after:top-[108px]"
                        style={{
                            transform: `translate3d(-50%, -50%, 0) rotate(${location.wind.direction}deg)`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
