import React from 'react'
import { shoes, statistics } from '../constants';
import { bigShoe2 } from '../assets/images';
import ShoeCard from '../components/ShoeCard';
import { useState } from 'react';

const Hero = () => {

  const [bigShoeImg, setBigShoeImg] = useState(bigShoe2);

  const changeBigShoeImage = (imgURL) => {
    setBigShoeImg(imgURL)
  }

  return (
    <section
    id='hero'
    className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'>
      <div className='relative xl:w-2/5 flex flex-col max-xl:padding-x '>
      <h1 className='font-palanquin mt-10 text-8xl max-sm:text-[72px] font-bold max-sm:leading-[82px]'>
      <span className='xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>The new Arrival</span><br />
      <span className='text-[#95582C] inline-block mt-3'>Step Up</span> Shoes
      </h1>
      <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'>Dicover Stylish arrivals, quality comfort, and  innovation for your active life </p>
      

      <div className='flex justify-start items-start flex-wrap w-full mt-8 gap-16'>
      {statistics.map((stat,index)=>(
        <div key={index} className='flex flex-col items-center gap-2'>
          <p className='text-4xl max-sm:text-3xl font-palanquin font-bold'>{stat.value}</p>
          <p className='leading-7 font-montserrat text-slate-gray'>{stat.label}</p>
        </div>

      ))}
      </div>
      </div>

      <div className='relative flex-1 flex xl:min-h-screen max-xl:py-40 bg-cover justify-center items-center'>
        
        <img src={bigShoeImg} alt="Shoe collection" width={600} height={500}
        className='object-contain z-10 relative pb-14 inline-block ' />

        <div className='flex sm:gap-6 gap-4 absolute sm:-bottom-[12%] max-sm:-bottom-[5%] max-sm:px-6'>
          {shoes.map((shoe, index) => (
            <div key={index}>
              <ShoeCard
              imgURL={shoe} changeBigShoeImage={(shoe)=> changeBigShoeImage(shoe)} bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero;
