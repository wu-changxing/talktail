// app/components/BlogContent.tsx
import {AiOutlineCalendar, AiOutlineUser} from "react-icons/ai";
const BlogContent = ({ post }) => {
return (
    <article className="max-w-4xl mx-auto p-4 lg:p-8">
        <h1 className="text-4xl text-center font-bold my-6">{post.title}</h1>
        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
        <div className="text-sm text-gray-500 mt-4 mb-2">
            Content for {post.meta.locale}
        </div>
    </article>
);
};
export default BlogContent;