// /api/user/route.ts
import { NextResponse } from "next/server";
import { db, auth} from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getGeolocationData } from '../../lib/getInfo'
import {
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    setDoc,
    FirestoreError,
} from 'firebase/firestore';

// Function to update user statistics by slug
export async function POST(request: Request) {
    try {
        const { email, password, nickname } = await request.json();

        // Initialize Firebase Authentication

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user details in Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            nickname,
            email,
            createdAt: new Date()
        });

        return new Response(JSON.stringify({ message: 'User successfully registered', uid: user.uid }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in user registration', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
