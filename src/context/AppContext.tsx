import { createContext, ReactNode, useState } from 'react';

interface IAppContext {
    locations: WeatherLocation[];
    addLocation(locationToAdd: WeatherLocation): void;
    deleteLocation(locationToDelete: WeatherLocation): void;
    selectLocation(locationToSelect: WeatherLocation): void;
    forecastDays: ForecastDay[];
    addForecastDays(forecastDaysToAdd: ForecastDay[]): void;
    forecastHours: ForecastHour[];
    addForecastHours(forecastHoursToAdd: ForecastHour[]): void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [locations, setLocations] = useState<WeatherLocation[]>([]);
    const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
    const [forecastHours, setForecastHours] = useState<ForecastHour[]>([]);

    const addLocation = (locationToAdd: WeatherLocation) => {
        // First check if this location should be added and is not a duplicate.
        const existingLocation = locations.find(
            (location) => location.name === locationToAdd.name
        );

        if (existingLocation) return;

        // Then select any current location(s).
        const updatedLocations = locations.map((location) => {
            return { ...location, isSelected: false };
        });

        // Then add the new location and make it the selected location.
        setLocations([
            ...updatedLocations,
            { ...locationToAdd, isSelected: true }
        ]);
    };

    const deleteLocation = (locationToDelete: WeatherLocation) => {
        const updatedLocations = locations.filter(
            (location) => location.name !== locationToDelete.name
        );

        setLocations(updatedLocations);
    };

    const selectLocation = (locationToSelect: WeatherLocation) => {
        // Then select any current location(s).
        const updatedLocations = locations.map((location) => {
            if (location.name === locationToSelect.name)
                return { ...location, isSelected: true };

            return { ...location, isSelected: false };
        });

        // Then add the new location and make it the selected location.
        setLocations(updatedLocations);
    };

    const addForecastDays = (forecastDaysToAdd: ForecastDay[]) => {
        setForecastDays(forecastDaysToAdd);
    };

    const addForecastHours = (forecastHoursToAdd: ForecastHour[]) => {
        setForecastHours(forecastHoursToAdd);
    };

    const value = {
        locations,
        addLocation,
        deleteLocation,
        selectLocation,
        forecastDays,
        addForecastDays,
        forecastHours,
        addForecastHours
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
