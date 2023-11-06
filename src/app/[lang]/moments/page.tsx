// src/app/moments/[postSlug]/dashboard.Comments.tsx
import { useLoaderData, json } from 'next';

export default function DashboardPage() {
    const readData = useLoaderData();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <ul>
                {readData.map((read) => (
                    <li key={read.userId} className="mb-2">
                        User {read.userId} read this post on {new Date(read.readAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
