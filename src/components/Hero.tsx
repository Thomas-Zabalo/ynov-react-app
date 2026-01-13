interface HeroProps {
    title?: string
    subtitle?: string
}

export default function Hero({title, subtitle}: HeroProps) {
    return (
        <div
            className="relative overflow-hidden pt-12 pb-20">
            <div className="mx-auto max-w-7xl px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}