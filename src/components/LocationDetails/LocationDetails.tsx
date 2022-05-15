import { FC } from 'react';

import Wind from 'components/Wind';
import Rain from 'components/Rain';

interface LocationDetailsProps {
    location: WeatherLocation | undefined;
}

export const LocationDetails: FC<LocationDetailsProps> = ({ location }) => {
    return (
        <main className="col-span-6">
            <div className="grid grid-cols-12">
                <div className="col-span-6">{location?.name}</div>
            </div>

            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    {location?.wind && <Wind location={location} />}
                </div>

                <div className="col-span-6">
                    {location?.rain && <Rain location={location} />}
                </div>
            </div>

            <div className="grid grid-cols-12">
                <div className="col-span-6">Pressure</div>

                <div className="col-span-6">UV Index</div>
            </div>
        </main>
    );
};
