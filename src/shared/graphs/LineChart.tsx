import { FC } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    data: any; // TODO: fix this
    options: any; // TODO: fix this
}

export const LineChart: FC<LineChartProps> = ({ data, options = null }) => {
    return <Line data={data} options={options} />;
};
