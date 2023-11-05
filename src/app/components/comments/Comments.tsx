// src/app/components/comments/Comments.tsx
"use client";
import {useEffect, useState} from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// Make sure to receive `slug` as a prop
const CommentsComponent = ({slug}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch initial comments from the server-side API
        async function fetchComments() {
            try {
                // Use template literals to insert the `slug`
                console.log("fetching comments for slug", slug)
                const response = await fetch(`/api/comments/${slug}`);

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
        const newCommentData = {
            content: comment,
            slug, // Add `slug` here
            ...additionalInfo,
        };

        try {
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

    const handleDeleteComment = async (commentId) => {
        console.log("Deleting comment", commentId)
        try {
            const response = await fetch(`/api/comments/edit/${commentId}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Update the comments list by filtering out the deleted comment
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            } else {
                console.error("Failed to edit the comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Function to handle editing a comment
    const handleEditComment = async (commentId, newText) => {
        try {
            const response = await fetch(`/api/comments/eidt/${commentId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: newText}),
            });
            if (response.ok) {
                const updatedComment = await response.json();
                // Update the comments list with the updated comment
                setComments((prevComments) =>
                    prevComments.map((comment) => (comment.id === commentId ? updatedComment : comment))
                );
            } else {
                console.error("Failed to update the comment");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
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
                console.log("saved comment", savedComment)
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
            <CommentForm handleNewComment={handleNewComment} slug={slug}/>
            <CommentList comments={comments} onDelete={handleDeleteComment} onEdit={handleEditComment}/>
        </div>
    );
};

export default CommentsComponent;
