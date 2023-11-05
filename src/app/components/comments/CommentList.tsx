// app/components/comments/CommentList.tsx

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date; // or string if you store it in a different format
}

interface CommentListProps {
  comments: Comment[];
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentList({ comments, onEdit, onDelete }: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  console.log("comments", comments)
  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert to JavaScript Date
    return date.toLocaleString(); // Format the date as a string
  };
  // Toggle editing for a comment
  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.content);
  };

  // Handle the save after editing
  const handleSave = (id: string) => {
    onEdit(id, editedText);
    setEditingCommentId(null); // Exit editing mode
  };

  // Handle the cancel button
  const handleCancel = () => {
    setEditingCommentId(null);
  };

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
      <div>
        {comments.map((comment) => (
            <div key={comment.id} className="p-2 my-2 border-b border-gray-300">
              {editingCommentId === comment.id ? (
                  <div>
              <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="p-2 w-full border border-gray-300"
              />
                    <button onClick={() => handleSave(comment.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
              ) : (
                  <>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                    <div className="text-xs text-gray-500">
                      Posted by {comment.author} on {formatCreatedAt(comment.createdAt)}
                  </div>
                    <button onClick={() => handleEditClick(comment)}>Edit</button>
                    <button onClick={() => onDelete(comment.id)}>Delete</button>
                  </>
              )}
            </div>
        ))}
      </div>
  );
}
