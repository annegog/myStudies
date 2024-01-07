import React from "react";

const Step = ({number, title, active}) => {
    const lineClass = active ? 'bg-blue-500' : 'bg-gray-300';
    const activeClass = active ? 'bg-blue-500' : 'bg-gray-300';

    return (
        <div className="flex items-center">
            <div className={`w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-white font-bold ${activeClass}`}> {number} </div>
            <div className="text-sm text-center mt-1"> {title} </div>
            {active && (
                <div className="relative flex items-center">
                    <div className="w-10 h-1 bg-gray-300"></div>
                    <div className={`w-4 h-4 transform rotate-45 absolute right-0 -mr-2 ${lineClass}`}></div>
                </div>
            )}
        </div>
    );
};

const BreadCrump = ({steps}) => {
    return (
        <div className="flex items-center justify-center">
            {steps.map((step) => (
                <Step key={step.number} {...step}/>
            ))}
        </div>
    );
};

export default BreadCrump;