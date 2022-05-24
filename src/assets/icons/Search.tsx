import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

interface SearchProps {
    [rest: string]: any;
}

const Search: FC<SearchProps> = ({ ...rest }) => {
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
                    ? 'rgb(71, 85, 105)'
                    : 'rgb(203, 213, 225)'
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
};

export default Search;
