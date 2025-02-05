"use client"; // Error boundaries must be Client Components

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <pre className="text-wrap">{JSON.stringify(error, null, 2)}</pre>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
