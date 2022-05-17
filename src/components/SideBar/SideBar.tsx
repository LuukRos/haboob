import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import Location from 'components/Location';
import LocationSearch from 'components/LocationSearch';

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { locations } = useContext(AppContext);

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
