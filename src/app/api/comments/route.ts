// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

// Function to fetch comments from Firestore
async function getComments() {
  const commentsCol = collection(db, "comments");
  const commentSnapshot = await getDocs(commentsCol);
  const commentList = commentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return commentList;
}

// Function to add a new comment to Firestore
async function addCommentToDb(commentData) {
  const commentsCol = collection(db, "comments");
  const docRef = await addDoc(commentsCol, commentData);
  return { id: docRef.id, ...commentData };
}

// Handle GET requests
export async function GET() {
  const comments = await getComments();
  return NextResponse.json(comments);
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const commentData = await request.json();
    const newComment = await addCommentToDb(commentData);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

// Optionally, for edge runtime
// export const config = {
//   runtime: 'experimental-edge',
// };
