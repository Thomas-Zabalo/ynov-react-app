const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

export default function MockBadge() {
    return (
        <div className="fixed top-4 right-4 z-[1000]">
            <span
                className={`
                    px-3 py-1.5 rounded-md text-xs font-bold tracking-wide
                    shadow-lg
                    ${
                    IS_MOCK_MODE
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-emerald-500 text-white'
                }
                `}
            >
                {IS_MOCK_MODE ? 'MOCK MODE' : 'API MODE'}
            </span>
        </div>
    );
}
