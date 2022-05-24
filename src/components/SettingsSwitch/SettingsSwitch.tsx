import { FC, useContext, useState } from 'react';
import { AppContext } from 'context/AppContext';

import Settings from 'assets/icons/Settings';

export const SettingsSwitch: FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    const context = useContext(AppContext);

    return (
        <button
            className={`relative ml-2 ${
                showSettings ? 'rounded-b-none' : ''
            } z-50 rounded-lg bg-sky-100 p-2 text-3xl dark:bg-sky-800`}
            onClick={() => setShowSettings(!showSettings)}
        >
            <Settings
                className={`transform-gpu transition-transform ${
                    showSettings ? 'rotate-45' : ''
                }`}
            />

            <div
                className={`absolute top-full right-0 w-40 transform-gpu rounded-lg rounded-tr-none bg-sky-100 p-4 dark:bg-sky-800 ${
                    showSettings ? 'block' : 'hidden'
                }`}
            >
                <button
                    onClick={context.handleMetricsChange}
                    className="font-regular text-base text-slate-600 dark:text-slate-300"
                >
                    <span
                        className={
                            context.settings.units === 'metric'
                                ? 'underline'
                                : ''
                        }
                    >
                        Metric
                    </span>{' '}
                    |{' '}
                    <span
                        className={
                            context.settings.units === 'imperial'
                                ? 'underline'
                                : ''
                        }
                    >
                        Imperial
                    </span>
                </button>
            </div>
        </button>
    );
};
