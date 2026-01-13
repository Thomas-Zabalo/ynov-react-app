import {NavLink} from "react-router";

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between px-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-1 justify-start">
                <NavLink to="/" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Ynov react app</NavLink>
            </div>
        </header>
    )
}