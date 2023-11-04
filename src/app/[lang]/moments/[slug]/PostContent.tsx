import { AiOutlineCalendar, AiOutlineLink, AiOutlineUser } from 'react-icons/ai';
import BlogContent from "@/app/components/BlogContent";

const PostContent = ({ post }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const isBlogPost = post.meta.type === 'blog.BlogPage';

    return (
        <article className="flex flex-col items-center max-w-4xl mx-auto p-4 lg:p-8">
            {/* Author information */}
            <div className="self-start space-y-2 mt-4">
                {post.blog_authors.map((author, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                        <AiOutlineUser className="mr-2" />
                        Author: {author.author_name}
                    </div>
                ))}
            </div>

            {/* Blog Content */}
            <div className="w-full">
                {isBlogPost && (
                <BlogContent post={post} />
                    )}
            </div>

            {/* Meta Information */}
            <div className="self-start text-sm text-gray-500 mt-6 space-y-2">
                <div className="flex items-center">
                    <AiOutlineCalendar className="mr-2" />
                    Date: {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                    <AiOutlineLink className="mr-2" />
                    <a href={post.meta.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                        Original Link
                    </a>
                </div>
            </div>
        </article>
    );
};

export default PostContent;
