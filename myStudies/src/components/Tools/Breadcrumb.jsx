import React from "react";

const Breadcrumb = ({ currentStep, stepStrings }) => {
    const steps = Array.from({ length: stepStrings.length }, (_, index) => index + 1);

    return (
        <div className="flex items-center justify-center mt-8 space-x-2">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className={`flex flex-col items-center`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}>
                            {step}
                        </div>

                        <div className="text-sm text-center mt-1">
                            {stepStrings[index]}
                        </div>
                    </div>

                    {index < steps.length - 1 && (
                        <div className="flex-grow border-t border-gray-300" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;