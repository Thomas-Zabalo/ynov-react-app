import './index.css'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router';
import Favorites from "./pages/Favorites.tsx";
import Error404 from "./pages/404/Error404.tsx";
import Home from "./pages/Home.tsx";

export default function AppRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="favoris" element={<Favorites/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
);