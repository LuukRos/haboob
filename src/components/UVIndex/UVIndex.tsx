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
        <div className="grid grid-cols-12 p-8 bg-sky-100 rounded-2xl">
            <div className="col-span-6">
                <h2 className="font-regular">UV Index</h2>
                <p className="font-light">Today's UV index</p>
                <p className="font-regular">{uvIndex}</p>
            </div>

            <div className="col-span-6 flex flex-col items-center justify-center">
                <div
                    className="h-4 w-full mb-2 p-[2px] relative rounded-2xl"
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
                        className="h-4 w-4 absolute top-1/2 transform-gpu -translate-y-1/2 rounded-2xl bg-white border-2 border-sky-100"
                        style={{
                            left: `${((uvIndex / 11) * 100).toFixed()}%`
                        }}
                    />
                </div>

                <p className="font-regular">{uvIndexObject.description}</p>
            </div>
        </div>
    );
};
