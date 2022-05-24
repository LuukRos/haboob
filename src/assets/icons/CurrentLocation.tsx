import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

interface CurrentLocationProps {
    [rest: string]: any;
}

const CurrentLocation: FC<CurrentLocationProps> = ({ ...rest }) => {
    const context = useContext(AppContext);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
                context.theme === 'dark'
                    ? 'rgb(203, 213, 225)'
                    : 'rgb(71, 85, 105)'
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
    );
};

export default CurrentLocation;
