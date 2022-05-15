import { MONTHS, WEEKDAYS } from './constants';

export const formatTemperature = (temperature: number): string =>
    `${temperature.toFixed()}ºC`;

export const formatDay = (date: Date): string => WEEKDAYS[date.getDay()];

export const formatDate = (date: Date): string =>
    `${date.getDate()} ${MONTHS[date.getMonth()]}`;

export const formatWindSpeed = (windSpeed: number): string =>
    `${((windSpeed * 18) / 5).toFixed()}km/h`;

export const formatRainProbability = (rainProbability: number): string =>
    `${rainProbability * 100}%`;
