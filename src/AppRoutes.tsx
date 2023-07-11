import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppFrame from './core/components/AppFrame/AppFrame';
import { ScrollToTop } from './core/components/ScrollToTop/ScrollToTop';
import Game from './pages/Game/Game';
import Welcome from './pages/Welcome/Welcome';

/**
 * Application routes.
 */
export const routes = {
    Welcome: { route: '/' },
    Game: { route: '/game' },
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ScrollToTop />}>
                    <Route path={'/'} element={< AppFrame />}>
                        <Route path={routes.Welcome.route} element={<Welcome />} />
                        <Route path={routes.Game.route} element={<Game />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}