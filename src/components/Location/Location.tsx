import { FC, useContext } from 'react';

import CountryFlag from 'components/CountryFlag';
import { AppContext } from 'context/AppContext';

interface LocationProps {
    location: WeatherLocation;
}

export const Location: FC<LocationProps> = ({ location }) => {
    const { selectLocation } = useContext(AppContext);

    const handleLocationSelection = (selectedLocation: WeatherLocation) => {
        selectLocation(selectedLocation);
    };

    return (
        <li
            className={`flex content-center justify-start p-4 rounded-lg mb-4 ${
                location.isSelected ? 'bg-sky-100' : 'bg-white'
            }`}
            onClick={() => handleLocationSelection(location)}
        >
            <CountryFlag countryCode={location.countryCode} />

            <span className="ml-2 my-auto">{location.name}</span>
        </li>
    );
};
