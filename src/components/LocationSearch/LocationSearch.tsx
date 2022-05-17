import { FC, FormEvent, useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';

import { API_ENDPOINT, API_GEO_ENDPOINT, API_KEY } from 'shared/constants';

interface LocationSearchProps {}

export const LocationSearch: FC<LocationSearchProps> = () => {
    const [searchInput, setSearchInput] = useState('');
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();

    const { get: getOneCall } = useFetch(API_ENDPOINT);
    const { get: getGeo } = useFetch(API_GEO_ENDPOINT);

    useEffect(() => {
        if (latitude && longitude) {
            getOneCall(
                `onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
            )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.error(error));
        }
    }, [latitude, longitude]);

    const handleLocationSearchSubmit = (event: FormEvent) => {
        event.preventDefault();

        console.log(searchInput);
        if (searchInput) {
            getGeo(`direct?q=${searchInput}&limit=1&appid=${API_KEY}`)
                .then((response) => {
                    if (!response.length) {
                        // TODO: finish this.
                        console.error('No results found');
                        return;
                    }

                    const { lat: latitude, lon: longitude } = response[0];
                    setLatitude(latitude);
                    setLongitude(longitude);
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <form className="relative" onSubmit={handleLocationSearchSubmit}>
            <input
                type="text"
                placeholder="Search for a city..."
                className="w-full h-8 mb-4 px-4 py-8 rounded-lg"
                value={searchInput}
                onChange={({ target: { value } }) => setSearchInput(value)}
            />

            <button className="absolute right-0 top-0" type="submit">
                Search
            </button>
        </form>
    );
};
