import React from 'react';

import { render, screen } from '@testing-library/react';

import { ThemeSwitch } from './ThemeSwitch';

describe('<ThemeSwitch />', () => {
    test('Should render correctly', () => {
        render(<ThemeSwitch />);

        expect(screen.getByText('Switch theme')).toBeInTheDocument();
    });
});
