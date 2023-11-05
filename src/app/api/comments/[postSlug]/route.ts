// app/api/comments/[postSlug]/route.ts
import { db } from '../../../lib/firebase';
import {
    query,
    collection,
    getDocs,
    where,
    addDoc,
    Timestamp
} from 'firebase/firestore';

// Function to get comments by postSlug
async function getCommentsBySlug(postSlug: string) {
    const commentsCol = collection(db, 'comments');
    const q = query(commentsCol, where('postSlug', '==', postSlug));
    const commentSnapshot = await getDocs(q);
    return commentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

// Function to post a new comment
async function postCommentBypostSlug(postSlug: string, data: any) {
    const commentsCol = collection(db, 'comments');

    // Destructure the expected fields from data
    const {
        content,
        browserInfo,
        deviceInfo,
        networkInfo,
        performanceMetrics,
        timeZone
    } = data;

    // Create a new comment object with the destructured fields
    const newComment = {
        content, // Previously it was ...data, now it's the individual fields
        postSlug,
        browserInfo,
        deviceInfo,
        networkInfo,
        performanceMetrics,
        timeZone,
        createdAt: Timestamp.now() // Assuming you want to save the creation date
    };

    const docRef = await addDoc(commentsCol, newComment);
    return { id: docRef.id, ...newComment };
}

// GET request handler
export async function GET(request, context: { params } ) {
    const postSlug = context.params.postSlug
    if (!postSlug) {
        return new Response(JSON.stringify({ error: 'postSlug is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    try {
        const comments = await getCommentsBySlug(postSlug);
        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to fetch comments', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// POST request handler
export async function POST(request:Request, context: { params }) {
    const  postSlug  = context.params.postSlug;
    const data = await request.json();
    if (!postSlug) {
        return new Response(JSON.stringify({ error: 'postSlug is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const newComment = await postCommentBypostSlug(postSlug, data);
        return new Response(JSON.stringify(newComment), {
            status: 201, // 201 Created
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to post new comment', error);
        return new Response(JSON.stringify({ error: 'Failed to post new comment' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
