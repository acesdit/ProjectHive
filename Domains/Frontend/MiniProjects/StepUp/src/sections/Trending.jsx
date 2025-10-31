import React from "react";
import Trending1 from '../assets/images/Trending1.png';
import Trending2 from '../assets/images/Trending2.png';

const TrendingSection = () => {
    return (
        <div className="bg-white text-black py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Trending</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <img
                        src={Trending1}
                        alt="People"
                        className="w-full h-auto object-cover"
                    />
                    <img
                        src={Trending2}
                        alt="Shoes"
                        className="w-full h-auto object-cover"
                    />
                </div>
                </div>
                <div className='flex flex-col justify-center sm:leading-[0.9] sm:m-7 items-center max-sm:items-start max-sm:justify-start max-sm:px-2'>
                    <p className='text-[18px] sm:pb-3 max-sm:pt-4 sm:text-center'>Jordan Spizike</p>
                    <h1 className='text-[70px] max-sm:text-4xl sm:leading-[0.9] tracking-tighter sm:text-center py-4 font-extrabold uppercase'>IT's gotta be the remix </h1>
                    <p className='text-[18px] pb-3 sm:text-center'>Bring the pressure no matter how large the stage in the latest colourway from the King.</p>
                    <div className='max-sm:w-[50%] pt-5'>
                        <button className={`flex items-center text-lg leading-none bg-black 
                        rounded-full text-white justify-center gap-2 px-4 py-2 
                        border`}>
                            Shop
                        </button></div>
                </div>
            </div>
   
    );
};

export default TrendingSection;
