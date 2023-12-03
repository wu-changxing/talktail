// src/components/RichTextContent.js
const RichTextContent = ({ value }) => {
    return (
        <div
            className="rich-text-content max-w-2xl mx-auto p-6 lg:p-8 bg-white shadow-lg rounded-lg text-justify text-slate-900 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: value }}
        />
    );
};

export default RichTextContent;
