// app/api/view/[slug]/route.ts
import { db } from '../../../lib/firebase';
import {getGeolocationData } from '../../../lib/getInfo'
import {
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    setDoc,
    FirestoreError,
} from 'firebase/firestore';

// Function to update user statistics by slug
async function updateUserStatsById(slug: string, data: any) {
    const userStatsRef = doc(db, 'userStats', slug);
    await updateDoc(userStatsRef, data);
}

// Function to delete user statistics by slug
async function deleteUserStatsById(slug: string) {
    const userStatsRef = doc(db, 'userStats', slug);
    await deleteDoc(userStatsRef);
}
async function recordUserViewStats(slug: string, data: any) {
    const userStatsRef = doc(db, 'userStats', slug);
    // Use setDoc with merge option to update or create the document
    await setDoc(userStatsRef, data, { merge: true });
}
// GET request handler to fetch a single user's statistics by ID
export async function GET(request: Request, context: { params: { slug: string } }) {
    const { slug } = context.params;
    const userStatsRef = doc(db, 'userStats', slug);
    const userStatsSnap = await getDoc(userStatsRef);

    if (!userStatsSnap.exists()) {
        return new Response(JSON.stringify({ error: 'User statistics not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ id: slug, ...userStatsSnap.data() }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// PUT request handler to update a single user's statistics by ID
export async function PUT(request: Request, context: { params: { slug: string } }) {
    const { slug } = context.params;
    const data = await request.json();
    try {
        await updateUserStatsById(slug, data);
        return new Response(JSON.stringify({ id: slug, ...data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const { code, message } = error as FirestoreError;
        return new Response(JSON.stringify({ error: message, code }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// DELETE request handler to delete a single user's statistics by ID
export async function DELETE(request: Request, context: { params: { slug: string } }) {
    const { slug } = context.params;
    try {
        await deleteUserStatsById(slug);
        return new Response(JSON.stringify({ message: 'User statistics deleted successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const { code, message } = error as FirestoreError;
        return new Response(JSON.stringify({ error: message, code }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
export async function POST(request: Request, context: { params: { slug: string } }) {
    const { slug } = context.params;
    const data = await request.json();

    // Attempt to get the IP address from the request
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'Unavailable';
    const geo = await getGeolocationData(ip)

    try {
        // Add the IP address to the data
        const viewData = { ...data, ip, geo };

        await recordUserViewStats(slug, viewData);
        return new Response(JSON.stringify({ message: 'User view recorded successfully' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const { code, message } = error as FirestoreError;
        return new Response(JSON.stringify({ error: message, code }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
