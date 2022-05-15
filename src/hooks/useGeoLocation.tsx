import { useEffect } from 'react';

const onGeoLocationSuccess = (position: GeolocationPosition) => {
    console.log(position);
};

const onGeoLocationError = (error: GeolocationPositionError) => {
    console.error(error);
};

const useGeoLocation = () => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onGeoLocationSuccess,
            onGeoLocationError
        );
    });
};

export default useGeoLocation;
