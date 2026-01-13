import {useEffect, useState} from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchFn()
            .then((res) => setData(res))
            .catch((err) => setError(err.message || "Erreur"))
            .finally(() => setLoading(false));
    }, deps);

    return { data, loading, error };
}
