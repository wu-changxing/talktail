import { AiOutlineCalendar, AiOutlineLink, AiOutlineUser } from 'react-icons/ai';
import BlogContent from "@/app/components/BlogContent";
import EngineerContent from "@/app/components/EngineerContent";

const PostContent = ({ post }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const isBlogType = post.meta.type === 'blog.BlogPage';


    if (isBlogType) {
        // Layout for blog type
        return (
            <article className="flex flex-col items-center max-w-4xl mx-auto p-4 lg:p-8">
                <div className="w-full">
                    <BlogContent post={post} />
                </div>
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
    } else {
        // Default layout for non-blog type

        return (
           <EngineerContent post={post} />
        );
    }
};

export default PostContent;
