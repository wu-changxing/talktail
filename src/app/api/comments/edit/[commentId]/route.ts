// app/api/comments/edit/[commentId]/route.ts
import { db } from '../../../../lib/firebase';
import {
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    FirestoreError,
} from 'firebase/firestore';

// Function to update a comment by commentId
async function updateCommentById(commentId: string, data: any) {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, data);
}

// Function to delete a comment by commentId
async function deleteCommentById(commentId: string) {
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef);
}

// GET request handler to fetch a single comment by ID
export async function GET(request: Request, context: { context: { params: { commentId: string } } }) {
    const { commentId } = context.params;
    const commentRef = doc(db, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) {
        return new Response(JSON.stringify({ error: 'Comment not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ id: commentId, ...commentSnap.data() }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// PUT request handler to update a single comment by ID
export async function PUT(request: Request, context: { context: { params: { commentId: string } } }) {
    const { commentId } = context.params;
    const data = await request.json();
    try {
        await updateCommentById(commentId, data);
        return new Response(JSON.stringify({ id: commentId, ...data }), {
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

// DELETE request handler to delete a single comment by ID
export async function DELETE(request: Request,  context : { context: { params: { commentId: string } } }) {
    const { commentId } = context.params;
    try {
        await deleteCommentById(commentId);
        return new Response(JSON.stringify({ message: 'Comment deleted successfully' }), {
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
