// app/comments/CommentList.tsx
//
//

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date; // or string if you store it in a different format
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="p-2 my-2 border-b border-gray-300">
          <p className="text-sm text-gray-600">{comment.text}</p>
          <div className="text-xs text-gray-500">
            Posted by {comment.author} on{" "}
            {new Date(comment.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
