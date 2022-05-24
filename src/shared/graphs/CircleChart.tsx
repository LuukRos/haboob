import { FC } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
    data: any; // TODO: fix this
    options?: any; // TODO: fix this
}

export const CircleChart: FC<CircleChartProps> = ({ data, options = null }) => {
    return <Doughnut data={data} options={options} />;
};
