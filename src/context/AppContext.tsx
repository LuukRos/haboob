import { createContext, ReactNode, useEffect, useState } from 'react';

interface IAppContext {
    theme: string;
    handleThemeSwitch(): void;
    settings: Settings;
    handleMetricsChange(): void;
    locations: WeatherLocation[];
    addLocation(locationToAdd: WeatherLocation): void;
    deleteLocation(locationToDelete: WeatherLocation): void;
    updateLocation(locationToUpdate: WeatherLocation): void;
    selectLocation(locationToSelect: WeatherLocation): void;
    forecastDays: ForecastDay[];
    addForecastDays(forecastDaysToAdd: ForecastDay[]): void;
    forecastHours: ForecastHour[];
    addForecastHours(forecastHoursToAdd: ForecastHour[]): void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>(() =>
        localStorage.getItem('theme') ??
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    );
    const [settings, setSettings] = useState<Settings>({ units: 'metric' });

    const [locations, setLocations] = useState<WeatherLocation[]>(
        // @ts-ignore
        () => JSON.parse(localStorage.getItem('locations')) ?? []
    );
    const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
    const [forecastHours, setForecastHours] = useState<ForecastHour[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        switch (theme) {
            case 'light':
                setTheme('dark');
                document.documentElement.classList.add('dark');
                break;
            case 'dark':
                setTheme('light');
                document.documentElement.classList.remove('dark');
                break;
            default:
                break;
        }
    };

    const handleMetricsChange = () => {
        const units = settings.units;
        switch (units) {
            case 'imperial':
                setSettings({ ...settings, units: 'metric' });
                break;
            case 'metric':
                setSettings({ ...settings, units: 'imperial' });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (locations.length) {
            localStorage.setItem('locations', JSON.stringify(locations));
        }
    }, [locations]);

    const addLocation = (locationToAdd: WeatherLocation) => {
        const existingLocation = locations.find(
            (location) => location.name === locationToAdd.name
        );
        if (existingLocation) return;

        // Then unselect any current location(s).
        let updatedLocations = locations.map((location) => {
            return { ...location, isSelected: false };
        });

        // Then add the new location and make it the selected location.
        setLocations([
            ...updatedLocations,
            { ...locationToAdd, isSelected: true }
        ]);
    };

    const deleteLocation = (locationToDelete: WeatherLocation) => {
        let updatedLocations = locations.filter(
            (location) => location.name !== locationToDelete.name
        );

        updatedLocations = updatedLocations.map((location, index) => {
            if (index === 0) {
                return { ...location, isSelected: true };
            }

            return location;
        });

        setLocations(updatedLocations);
    };

    const updateLocation = (locationToUpdate: WeatherLocation) => {
        const updatedLocations = locations.map((location, index) => {
            if (location.name === locationToUpdate.name)
                return { ...location, ...locationToUpdate, isSelected: true };

            return location;
        });

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
        theme,
        handleThemeSwitch,
        settings,
        handleMetricsChange,
        locations,
        addLocation,
        deleteLocation,
        updateLocation,
        selectLocation,
        forecastDays,
        addForecastDays,
        forecastHours,
        addForecastHours
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
