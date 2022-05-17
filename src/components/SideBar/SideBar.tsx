import { FC } from 'react';

import Location from 'components/Location';
import LocationSearch from 'components/LocationSearch';

interface SideBarProps {
    locations: WeatherLocation[];
}

export const SideBar: FC<SideBarProps> = ({ locations }) => {
    return (
        <aside className="col-span-3 p-4 bg-neutral-200">
            <LocationSearch />

            <ul>
                {locations.map((location) => (
                    <Location key={location.name} location={location} />
                ))}
            </ul>
        </aside>
    );
};
