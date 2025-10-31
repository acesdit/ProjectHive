import React from 'react'
import { products } from '../constants'
import PopularProductCard from '../components/PopularProductCard'

const popularProducts = () => {
  return (
    <section
    id='products'
    className='max-container max-sm:mt-12'
    >
      <div className='flex felx-col justify-start gap-5'>
      <h2 className='text-4xl font-palanquin font-bold'>Popular Products</h2>
      </div>
        <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
         grid-cols-1 sm:gap-6 max-sm:items-center gap-14'>
          {products.map((product)=>(
            <PopularProductCard key={product.name} {...product} />
          ))}
        </div>
    </section>
  )
}

export default popularProducts
