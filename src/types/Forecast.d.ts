export {};

declare global {
    interface ForecastDay {
        date: Date;
        temperature: {
            value: number;
            min: number;
            max: number;
        };
        weather: {
            type: string;
            icon: string;
        };
    }

    interface ForecastHour {
        date: Date;
        time: string;
        temperature: {
            value: number;
        };
        weather: {
            type: string;
            icon: string;
        };
    }
}
