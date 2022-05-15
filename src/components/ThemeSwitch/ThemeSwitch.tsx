import React, { FC, useEffect, useState } from 'react';

import Dark from '../../assets/icons/Dark';
import Light from '../../assets/icons/Light';

export const ThemeSwitch: FC = () => {
    const [theme, setTheme] = useState<string>(
        () => localStorage.getItem('theme') ?? 'light'
    );

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        switch (theme) {
            case 'light':
                setTheme('dark');
                document.documentElement.classList.add('dark');
                break;
            case 'dark':
                setTheme('light');
                document.documentElement.classList.remove('dark');
                break;
            default:
                break;
        }
    };

    return (
        <button
            className="text-3xl bg-neutral-200 dark:bg-neutral-700 rounded-xl p-2 shadow-neumorph shadow-neutral-200 dark:shadow-neutral-600"
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
