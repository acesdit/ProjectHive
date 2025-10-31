import React from 'react'

const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {

    const handleClick = () => {
        if (bigShoeImg !== imgURL.bigShoe) {
            changeBigShoeImage(imgURL.bigShoe)
        }
    }

    return (
        <div className={`rounded-xl max-sm:flex-1 cursor-pointer ${bigShoeImg === imgURL.bigShoe ? 'border-2 border-coral-red' : 'border-transparent'}`}
            onClick={handleClick}
        >
            <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
                <img src={imgURL.thumbnail} width={127} height={103} className="object-contain" alt="Shoe Collection" />
            </div>
        </div>
    )
}

export default ShoeCard
