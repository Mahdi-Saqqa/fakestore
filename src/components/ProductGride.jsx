import React from 'react'
import ProductCard from './ProductCard'
const ProductGride = (props) => {
  
    const {products,productLoading} = props
    console.log(products)
  return (!productLoading&&(
    <div className='flex flex-wrap justify-center gap-[24px] w-[80%]'>
    {products.map((product,idx)=><ProductCard product={product} key={idx}/>)
}
</div>
  )
  )
}

export default ProductGride