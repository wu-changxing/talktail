// src/components/QuoteContent.js
const QuoteContent = ({ value }) => {
    return (
        <blockquote className="p-4 my-2 md:p-6 font-zhi-mang-xing border-l-2 bg-neutral-50 text-neutral-600 border-sky-500 quote shadow-sm rounded-md">
            <p className="mb-2 text-lg md:text-xl">{value.text}</p>
            <cite className="block text-right text-sm md:text-base font-semibold">— {value.from_person}</cite>
        </blockquote>
    );
};

export default QuoteContent;
