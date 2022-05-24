import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import LocationOverview from 'components/LocationOverview';
import Pressure from 'components/Pressure';
import Rain from 'components/Rain';
import UVIndex from 'components/UVIndex';
import Wind from 'components/Wind';

interface LocationDetailsProps {}

export const LocationDetails: FC<LocationDetailsProps> = () => {
    const { locations } = useContext(AppContext);
    if (!locations.length) return null;

    const location = locations.find((location) => location.isSelected);
    if (!location) return null;

    return (
        <main className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-12 gap-4 rounded-lg bg-sky-100 p-6 dark:bg-sky-800">
                <LocationOverview location={location} />
            </div>

            <div className="my-4 grid grid-cols-12 gap-4">
                {location?.wind && (
                    <div className="col-span-12 md:col-span-6">
                        <Wind location={location} />
                    </div>
                )}

                {location?.wind && (
                    <div className="col-span-12 md:col-span-6">
                        <Rain location={location} />
                    </div>
                )}
            </div>

            <div className="my-4 mb-0 grid grid-cols-12 gap-4">
                {location?.various.pressure && (
                    <div className="col-span-12 md:col-span-6">
                        <Pressure location={location} />
                    </div>
                )}

                {location?.various?.uvIndex > 0 && (
                    <div className="col-span-12 md:col-span-6">
                        <UVIndex location={location} />
                    </div>
                )}
            </div>
        </main>
    );
};
