import React, { useContext } from 'react'
import style from './RecentProducts.module.css'
import Products from '../Products/Products'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function RecentProducts({ product }) {

  let { addProductCart , addToWishlist} = useContext(CartContext);

  return <>

    <div className="product relative md:w-1/2 lg:w-1/4 p-5 text-center">
      <div className='p-5 rounded  duration-500 hover:shadow-[0_0px_6px_1px] hover:shadow-green-500'>
        <button onClick={() => addToWishlist(product.id)} className='btn-wishlist'><i className="fa-solid fa-heart text-red-500 text-3xl"></i></button>
        <Link to={`ProductDetails/${product.id}`} >
          <img src={product.imageCover} alt={product.title} />
          <h2 className='text-main text-sm'>{product.category.name}</h2>
          <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
          <div className="flex justify-between my-2">
            <h3>{product.price} EGP</h3>
            <h3><i className='fas fa-star text-amber-300'></i>{product.ratingsAverage}</h3>
          </div>
        </Link>
        <button onClick={() => addProductCart(product.id)} className='btn bg-green-500 w-full text-white rounded py-1'>Add To Cart</button>
        </div>
    </div>

  </>
}
