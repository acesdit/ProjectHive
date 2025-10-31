import React from 'react'
import { star } from '../assets/icons';

const PopularProductCard = ({imgURL,name,price}) => {
  return (
      <div className='flex flex-1 flex-col w-full max-sm:justify-center max-sm:items-center max-sm:w-full'>
          <img src={imgURL} alt={name} width={280} height={280} className='object-contain max-sm:w-full' />
          <div className='mt-8 flex justify-start gap-2.5 max-sm:gap-1'>
            <img src={star} alt="rating" width={24} height={24} />
            <p className='font-montserrat text-xl leading-normal text-slate-gray'>(4.5)</p>
          </div>
          <h3 className='mt-2 text-2xl font-semibold leading-normal font-palanquin'>{name}</h3>
          <p className='mt-2 text-2lx leading-normal font-montserrat font-semibold'>{price}</p>
    </div>
  )
}

export default PopularProductCard;
