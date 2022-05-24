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
            day: {
                morning: number;
                afternoon: number;
                evening: number;
                night: number;
            };
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
        isCurrentLocation: boolean;
        isSelected: boolean;
        forecastDays: ForecastDay[];
        forecastHours: ForecastHour[];
        weather: {
            type: string;
            icon: string;
        };
    }

    interface GeoLocation {
        country: string;
        name: string;
    }
}
