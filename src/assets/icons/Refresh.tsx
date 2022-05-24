import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

interface RefreshProps {
    onClick(): void;
    [rest: string]: any;
}

const Refresh: FC<RefreshProps> = ({ onClick, ...rest }) => {
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
            onClick={onClick}
            {...rest}
        >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
    );
};

export default Refresh;
