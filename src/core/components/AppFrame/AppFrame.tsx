import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export default function AppFrame() {
    const [ darkTheme, setDarkTheme ] = useState<boolean>(false);

    return (
        <div className={`app-frame ${darkTheme? 'dark-theme' : ''}`}>
            <Header setDarkTheme={setDarkTheme} isDarkTheme={darkTheme} />
            <div className="app-content">
                <Outlet />
            </div>
        </div>
    );
}
