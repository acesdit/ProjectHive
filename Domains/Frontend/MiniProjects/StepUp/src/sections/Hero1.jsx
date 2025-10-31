import React from 'react'
import nikehero from '../assets/images/nikehero.jpg'

const Hero1 = () => {
    return (
        <section
            id='home'
            className='w-full flex xl:flex-row flex-col justify-center items-center min-h-screen gap-10 max-container' >
            <div className='relative flex-1 flex xl:min-h-screen flex-col bg-cover justify-center items-center'>

                <div className='w-full p-2.5 bg-[#F5F5F5]'><p className='text-center leading-5 '><span className='text-[18px]'>Move, Shop, Customise & Celebrate With Us</span><br />
                    <span className='text-[15px]'>No matter what you feel like doing today, It’s better as a Member.</span><br />
                    <span className='text-[12px] underline'>Join Us</span></p>
                </div>
                <div>
                    <img src={nikehero} alt="Shoe collection" width={1165} height={500}
                        className='object-contain z-10 relative max-sm:p-3' />
                </div>
                <div className='flex flex-col justify-center sm:m-7 items-center max-sm:items-start max-sm:justify-start max-sm:px-6'>
                    <h1 className='text-[70px] max-sm:text-4xl sm:leading-[0.9] tracking-tighter sm:text-center py-4 font-extrabold uppercase'>LeBron XXII ‘The <br /> Limelight’</h1>
                    <p className='text-[18px] pb-3 sm:text-center'>Bring the pressure no matter how large the stage in the latest colourway from the King.</p>
                    <div className='max-sm:w-[50%] pt-5'>
                        <button className={`flex items-center text-lg leading-none bg-black 
                        rounded-full text-white justify-center gap-2 px-4 py-2 
                        border`}>
                            Shop
                        </button></div>
                </div>
            </div>
        </section>
    )
}

{/* <img src="src\assets\images\nikehero.jpg" alt='lebron' className='max-sm:h-150 '/>
        <h3 className=' text-center p-4 uppercase font-extrabold'>LEBRON XXII ‘The Limelight’</h3> */}
export default Hero1
