import React from "react";

const Breadcrumb = ({ currentStep, stepStrings }) => {
    const steps = Array.from({ length: stepStrings.length }, (_, index) => index + 1);

    return (
        <div className="flex items-center justify-center space-x-5">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className={`flex flex-col items-center`}>
                        <div className={`w-10 h-10 flex items-center justify-center text-white rounded-full font-bold shadow-xl ${step <= currentStep ? "bg-blue-800" : "bg-gray-300"}`}>
                            {step}
                        </div>

                        <div className="text-center text-sm mt-2">
                            {stepStrings[index]}
                        </div>
                    </div>

                    {index < steps.length - 1 && (
                        <div className="flex-grow border-gray-300 border-t" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;