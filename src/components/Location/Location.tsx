import { FC } from 'react';

import CountryFlag from 'components/CountryFlag';

interface LocationProps {
    location: WeatherLocation;
}

export const Location: FC<LocationProps> = ({ location }) => {
    return (
        <li className="flex content-center justify-start p-4 bg-white rounded-lg">
            <CountryFlag countryCode={location.countryCode} />

            <span className="ml-2 my-auto">{location.name}</span>
        </li>
    );
};
