export {};

declare global {
    interface WeatherLocation {
        name: string;
        date: Date;
        time: string;
        countryCode: string;
        coords: {
            latitude: number;
            longitude: number;
        };
        temperature: {
            value: number;
            perceived: number;
        };
        rain: {
            probability: number;
        };
        wind: {
            speed: number;
            direction: number;
        };
        various: {
            humidity: number;
            pressure: number;
            uvIndex: number;
        };
        times: {
            sunrise: number;
            sunset: number;
        };
        isSelected: boolean;
        forecastDays: ForecastDay[];
        forecastHours: ForecastHour[];
    }

    interface GeoLocation {
        country: string;
        name: string;
    }
}
