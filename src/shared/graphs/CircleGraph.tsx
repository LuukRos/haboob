import { FC } from 'react';

interface CircleProps {
    color: string;
    percentage: number;
}

const Circle: FC<CircleProps> = ({ color, percentage }) => {
    const radius = 75;
    const circle = 2 * Math.PI * radius;
    const strokePercentage = ((100 - percentage) * circle) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
        <circle
            r={radius}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePercentage !== circle ? color : ''} // remove color as 0% sets full circumference
            strokeWidth="5px"
            strokeDasharray={circle}
            strokeDashoffset={percentage ? strokePercentage : 0}
            strokeLinecap="round"
        ></circle>
    );
};

interface TextProps {
    percentage: number;
}

const Text: FC<TextProps> = ({ percentage }) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={'1.5em'}
        >
            {percentage.toFixed(0)}%
        </text>
    );
};

interface CircleGraphProps {
    color: string;
    percentage: number;
}

export const CircleGraph: FC<CircleGraphProps> = ({ color, percentage }) => {
    return (
        <svg width={200} height={200}>
            <g transform={`rotate(-90 ${'100 100'})`}>
                <Circle color="lightgrey" percentage={100} />
                <Circle color={color} percentage={percentage} />
            </g>

            <Text percentage={percentage} />
        </svg>
    );
};
