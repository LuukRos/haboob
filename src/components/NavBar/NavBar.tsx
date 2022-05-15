import { FC } from 'react';
import ThemeSwitch from '../ThemeSwitch';

export const NavBar: FC = () => {
    return (
        <nav className="container flex justify-between items-center mx-auto py-4">
            <p>Haboob</p>

            <ThemeSwitch />
        </nav>
    );
};
