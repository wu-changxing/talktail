import {AiOutlineCalendar, AiOutlineLink, AiOutlineUser} from 'react-icons/ai';
import PoemContent from './PoemContent';
import RichTextContent from './RichTextContent';
import QuoteContent from "@/app/components/QuoteContent";

const EngineerContent = ({post}) => {
    console.log(post);
    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderContent = () => {
        return post.content.map((item, index) => {
            switch (item.type) {
                case 'poem':
                    return <PoemContent key={item.id} value={item.value}/>;
                case 'full_richtext': // Handle the full_richtext type
                    return <RichTextContent key={item.id} value={item.value}/>;
                case 'quote':
                    return <QuoteContent key={item.id} value={item.value} />; // Use the new component
                case 'codeblock':
                    return (
                        <div key={item.id} className="bg-gray-800 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                            <code>{item.value.code.code}</code>
                        </div>
                    );
                default:
                    console.log(`Unknown type ${item.type}`);
                    return <div key={item.id} dangerouslySetInnerHTML={{__html: item.value}}/>;
            }
        });
    };

    return (
        <article className="flex flex-col items-center max-w-4xl mx-auto p-4 lg:p-8">
            {/* Engineer information */}
            <div className="self-start space-y-2 mt-4">
                {post.engineers.map((engineer, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                        <AiOutlineUser className="mr-2"/>
                        Engineer: {engineer.author_name}
                    </div>
                ))}
            </div>

            {/* Post title */}
            <h2 className="text-lg font-bold my-4">{post.title}</h2>

            {/* Engineer content */}
            <div className="w-full">
                {renderContent()}
            </div>

            {/* Cover Image */}
            {post.cover_image && (
                <div className="mt-4">
                    <img src={post.cover_image} alt="Cover"/>
                </div>
            )}

            {/* Meta Information */}
            <div className="self-start text-sm text-gray-500 mt-6 space-y-2">
                <div className="flex items-center">
                    <AiOutlineCalendar className="mr-2"/>
                    Date: {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                    <AiOutlineLink className="mr-2"/>
                    <a href={post.meta.html_url} target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 hover:text-blue-800 transition duration-300">
                        Original Link
                    </a>
                </div>
            </div>
        </article>
    );
};

export default EngineerContent;
