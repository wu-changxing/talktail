// src/app/components/comments/CommentForm.tsx

import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { collectUserInfo } from "./UserInfoCollector"; // Import the user info collector

interface CommentFormProps {
  handleNewComment: (comment: string, additionalInfo: object, slug: string) => void;
  isSubmitting: boolean;
  slug: string; // Add slug to the props
}

export default function CommentForm({ handleNewComment, isSubmitting, slug }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState({});

  useEffect(() => {
    // Collect user information asynchronously
    collectUserInfo().then(info => setAdditionalInfo(info));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment) {
      console.log("the data is", comment, additionalInfo, slug)
      handleNewComment(comment, additionalInfo, slug); // Pass the slug here

      setComment("");
    }
  };

  return (
      <form onSubmit={handleSubmit} className="mb-6">
      <textarea
          className="p-2 w-full border border-gray-300"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={300} // Example max length
      />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{comment.length}/300</span>
          <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
          >
            Send <IoSend />
          </button>
        </div>
      </form>
  );
}
