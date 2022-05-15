import { FC } from 'react';

import { COUNTRIES, OFFSET } from 'shared/constants';

interface CountryFlagProps {
    countryCode: string;
}

interface Country {
    countryCode: string;
    displayName: string;
}

export const CountryFlag: FC<CountryFlagProps> = ({ countryCode }) => {
    const country: Country | undefined = COUNTRIES.find(
        (country: Country) => country.countryCode === countryCode
    );

    if (!country) return null;

    const countryFlag = country?.countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + OFFSET)
        );

    if (!countryFlag) return null;

    return (
        <>
            <span className="sr-only">{country?.displayName}</span>
            <span title={country?.displayName} className="text-4xl">
                {countryFlag}
            </span>
        </>
    );
};
