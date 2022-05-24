import { MONTHS, WEEKDAYS } from './constants';

export const convertMetricToImperial = (temperature: number): number =>
    temperature * 1.8 + 32;

export const formatTemperature = (temperature: number, units: string): string =>
    units === 'metric'
        ? `${temperature.toFixed()}ºC`
        : `${convertMetricToImperial(temperature).toFixed()}ºF`;

export const formatDay = (date: Date): string => WEEKDAYS[date.getDay()];

export const formatDate = (date: Date): string =>
    `${date.getDate()} ${MONTHS[date.getMonth()]}`;

export const formatWindSpeed = (windSpeed: number): string =>
    `${((windSpeed * 18) / 5).toFixed()}km/h`;

export const formatRainProbability = (rainProbability: number): string =>
    `${(rainProbability * 100).toFixed()}%`;

export const formatPressure = (pressure: number): string => `${pressure} hPa`;

export const formatHumidity = (humidity: number): string => `${humidity}%`;
