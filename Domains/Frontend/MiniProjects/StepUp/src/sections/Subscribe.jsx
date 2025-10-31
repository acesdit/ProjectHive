import React from 'react'
import Button from '../components/Button'

const subscribe = () => {
  return (
    <section 
    id='contact-us'
    className='max-container flex max-sm:text-center justify-between items-center max-lg:flex-col max-lg:items-start gap-10'>
      <h3 className='text-4xl max-sm:text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>Sign Up for <span className='text-zinc-500'> Updates </span> & Newsletter</h3>

      <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full'>
        <input type="text"
        placeholder='subscribe@nike.com'
        className='input' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
          <Button label="Sign Up"/>
        </div>
      </div>

    </section>
  )
}

export default subscribe
