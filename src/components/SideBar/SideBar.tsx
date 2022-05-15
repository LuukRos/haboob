import { FC } from 'react';

import Location from 'components/Location';

interface SideBarProps {
    locations: WeatherLocation[];
}

export const SideBar: FC<SideBarProps> = ({ locations }) => {
    return (
        <aside className="col-span-3 p-4 bg-neutral-200">
            <input
                type="text"
                placeholder="Search for a city..."
                className="w-full h-8 mb-4 px-4 py-8 rounded-lg"
            />

            <ul>
                {locations.map((location) => (
                    <Location key={location.name} location={location} />
                ))}
            </ul>
        </aside>
    );
};
