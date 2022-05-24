import { FC, useContext } from 'react';
import { AppContext } from 'context/AppContext';

import Dark from 'assets/icons/Dark';
import Light from 'assets/icons/Light';

export const ThemeSwitch: FC = () => {
    const { handleThemeSwitch } = useContext(AppContext);

    return (
        <button
            className="rounded-lg bg-sky-100 p-2 text-3xl dark:bg-sky-800"
            onClick={handleThemeSwitch}
        >
            <span className="hidden dark:inline">
                <Dark />
            </span>

            <span className="dark:hidden">
                <Light />
            </span>
        </button>
    );
};
