// app/api/comments/[postId].ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// Function to fetch comments from Firestore by post ID
async function getCommentsByPostId(postId) {
    const commentsCol = collection(db, "comments");
    const q = query(commentsCol, where("postId", "==", postId));
    const commentSnapshot = await getDocs(q);
    const commentList = commentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return commentList;
}

// Handle GET requests
export async function GET(request: NextRequest) {
    const postId = request.nextUrl.searchParams.get("postId");
    if (!postId) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    const comments = await getCommentsByPostId(postId);
    return NextResponse.json(comments);
}
