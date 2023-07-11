import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export default function AppFrame() {
    return (
        <div className="app-frame">
            <Header />
            <div className="app-content">
                <Outlet />
            </div>
        </div>
    );
}
