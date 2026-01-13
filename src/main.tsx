import './index.css'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router';
import Favorites from "./pages/Favorites.tsx";
import Error404 from "./pages/404/Error404.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./components/navigation/Menu.tsx";

export default function AppRouter() {
    return (
        <div className="isolate">
            <main className="flex min-h-dvh flex-col bg-white">
                <div
                    className="relative isolate grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[var(--sidebar-width)_var(--gutter-width)_auto_var(--gutter-width)] [--sidebar-width:0] 2xl:[--sidebar-width:--spacing(72)] [--gutter-width:--spacing(6)] 2xl:[--gutter-width:--spacing(10)]">
                    <div
                        className="col-start-2 row-span-full row-start-1 max-2xl:hidden border-x border-gray-200 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(243_244_246)_0,rgb(243_244_246)_1px,transparent_0,transparent_50%)]">
                    </div>

                    <div
                        className="col-start-4 row-span-full row-start-1 max-2xl:hidden border-x border-gray-200 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(243_244_246)_0,rgb(243_244_246)_1px,transparent_0,transparent_50%)]">
                    </div>
                    <Menu/>
                    <div className="col-start-3 row-start-1 max-2xl:col-span-full max-2xl:col-start-1">
                        <div className="mx-auto mt-24 max-w-7xl 2xl:mt-20">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="favoris" element={<Favorites/>}/>
                                <Route path='*' element={<Error404/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
);