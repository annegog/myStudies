import React from "react";

import SearchImage from "../assets/SearchImage.png";

const SearchBar = ({searchString}) => {
    return (
        <div className = "flex flex-col items-center">
            <div style = {{marginTop: "1rem"}} className = "bg-zinc-300 bg-opacity-40 flex w-[500px] max-w-full items-stretch justify-between gap-5 px-7 py-2.5 mt-2 rounded-3xl max-md:flex-wrap max-md:px-5">
                <img
                    loading = "lazy"
                    src = {SearchImage}
                    // src = "https://cdn.builder.io/api/v1/image/assets/TEMP/9e821474ed44d18c4fa95b312b144fbe9a1723c4a3ec9419b7351b809018fa96?"
                    className = "aspect-[0.85] object-contain object-center w-[22px] overflow-hidden shrink-0 max-w-full"
                />

                <div className = "justify-center text-stone-400 text-center text-xl font-medium self-center w-[366px] my-auto">
                    <input
                        value = {searchString}
                        placeholder = {searchString}
                        className = "bg-transparent bg-opacity-40 text-center text-xl font-medium"
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;