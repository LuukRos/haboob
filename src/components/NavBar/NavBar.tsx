import { FC } from 'react';

import SettingsSwitch from 'components/SettingsSwitch';
import ThemeSwitch from 'components/ThemeSwitch';

export const NavBar: FC = () => {
    return (
        <nav className="col-span-12">
            <div className="grid grid-cols-12">
                <p className="col-span-6 flex items-center font-regular text-2xl text-slate-600 dark:text-slate-300">
                    Haboob
                </p>

                <div className="col-span-6 flex items-center justify-end">
                    <ThemeSwitch />
                    <SettingsSwitch />
                </div>
            </div>
        </nav>
    );
};
