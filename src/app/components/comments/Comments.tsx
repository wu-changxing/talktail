// src/app/components/comments/Comments.tsx
"use client";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// Make sure to receive `slug` as a prop
const CommentsComponent = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch initial comments from the server-side API
    async function fetchComments() {
      try {
        // Use template literals to insert the `slug`
        const response = await fetch(`/api/comments?slug=${slug}`);
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
  }, [slug]); // Add `slug` to the dependency array

  const handleNewComment = async (comment, additionalInfo) => {
    // Include the `slug` in the new comment data
    const newCommentData = {
      text: comment,
      slug, // Add `slug` here
      ...additionalInfo,
    };

    try {
      // Update the fetch URL to include the `slug`
      const response = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });

      if (response.ok) {
        const savedComment = await response.json();
        // Update the state with the new comment
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
        <CommentForm onNewComment={handleNewComment} slug={slug} />
        <CommentList comments={comments} />
      </div>
  );
};

export default CommentsComponent;
