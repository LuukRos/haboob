import { FC } from 'react';

import Pressure from 'components/Pressure';
import Rain from 'components/Rain';
import UVIndex from 'components/UVIndex';
import Wind from 'components/Wind';

interface LocationDetailsProps {
    location: WeatherLocation | undefined;
}

export const LocationDetails: FC<LocationDetailsProps> = ({ location }) => {
    return (
        <main className="col-span-6">
            <div className="grid grid-cols-12">
                <div className="col-span-6">{location?.name}</div>
            </div>

            <div className="grid grid-cols-12 gap-4 my-4">
                {location?.wind && (
                    <div className="col-span-6">
                        <Wind location={location} />
                    </div>
                )}

                {location?.wind && (
                    <div className="col-span-6">
                        <Rain location={location} />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-12 gap-4 my-4">
                {location?.various.pressure && (
                    <div className="col-span-6">
                        <Pressure location={location} />
                    </div>
                )}

                {location?.various?.uvIndex && (
                    <div className="col-span-6">
                        <UVIndex location={location} />
                    </div>
                )}
            </div>
        </main>
    );
};
