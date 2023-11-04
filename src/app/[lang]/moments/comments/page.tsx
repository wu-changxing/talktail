// src/app/comments/page.tsx
"use client";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch initial comments from the server-side API
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments");
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, []);

  const handleNewComment = async (comment, additionalInfo) => {
    const newCommentData = {
      text: comment,
      ...additionalInfo, // Spread the additional info into the object
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments((prevComments) => [...prevComments, savedComment]);
      } else {
        console.error("Failed to post new comment");
      }
    } catch (error) {
      console.error("Error posting new comment:", error);
    }
  };


  return (
    <div className="container my-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Comments</h1>
      <CommentForm onNewComment={handleNewComment} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsPage;
