import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = ({ects}) => {
    const options = {};

    const data = {
        labels: ["Κατοχυρωμένα ECTS"],
        datasets: [{label: "ECTS", data: [ects, 240 - ects], 
        backgroundColor: ["lightblue", "lightcoral"], 
        borderColor: ["lightblue", "lightcoral"]}],
    };

    return (
        <div className="flex justify-center items-center px-20 p-3 m-2">
            <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-xl dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between mb-6">
                    <div className="flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                        </svg>
                        <h5 class="text-xl font-bold leading-none text-gray-900 pe-1"> Τα ECTS μου </h5>
                    </div>
                </div>

                <div className="mb-5">
                    <Doughnut data={data} options={options}></Doughnut>
                </div>

                <div class="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
                    <div class="flex justify-between items-center pt-5"></div>
                </div>
            </div>
        </div>
    );
};

export default Donut;