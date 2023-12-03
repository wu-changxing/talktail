import parse, { domToReact } from 'html-react-parser';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { FaParagraph } from "react-icons/fa6";
const PoemContent = ({ value }) => {
    const transform = (node) => {
        if (node.name !== 'p') {// here node is the text is a string
            return (
                <p className="text-4xl my-4 text-gray-700 leading-relaxed font-long-cang">
                    {node}
                </p>

            );
        }
    };

    return (
        <div className="poem-content max-w-2xl mx-auto p-6 lg:p-8 bg-white shadow-lg rounded-lg">
            <MdOutlineAutoAwesome className="text-amber-400 mx-auto"/>
            <div className="text-justify text-slate-900 border-l-2 border-sky-500">

                {parse(value, { transform })}
                <FaParagraph className="text-sky-600 text-xs"/>
            </div>
        </div>
    );
};

export default PoemContent;
