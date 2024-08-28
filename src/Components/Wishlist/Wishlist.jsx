import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';

export default function Wishlist() {

  let { getWishlist, wishlist, deleteFromWishlist , addProductCart} = useContext(CartContext);

  useEffect(() => {

    getWishlist()

  }, [])
  
  return <>

    <div className='text-center'>
      <h2 className='text-main text-5xl mb-10 mt-10'>Wishlist</h2>

      {wishlist ? <div className='flex'>

        <div className="wishlist shadow-md sm:rounded-lg mx-auto w-4/5  mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

            <tbody>

              {wishlist.data.map((product , index) =>
                <tr key={product.id || index} className="bg-white border-b hover:bg-gray-50 ">
                <td className="p-4">
                  <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="font-semibold title text-lg text-gray-900 ">
                 <div>
                 {product.title}
                 </div>
                 <div className='text-main'>
                 {product.price} <span className='text-black'>EGP</span>
                 </div>
                </td>
              
                <td className="px-6 py-4 ">
                  <button onClick={() => deleteFromWishlist(product.id)} className="font-medium text-red-600 hover:underline "><i className='fa-solid fa-trash'></i> Remove</button>
                </td>
                <td className="px-2 m-auto">
                <button onClick={() => addProductCart(product.id)} className='btn bg-green-500 w-full text-white rounded py-1'>Add To Cart</button>
                </td>
                
              </tr>
            
              )}
            </tbody>
            
          </table>

        </div>

      </div> :
      
      <div className='flex justify-center text-center '>
      <Loading />
    </div>
    }
    </div>

  </>
}
