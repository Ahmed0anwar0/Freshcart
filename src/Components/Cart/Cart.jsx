import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Cart() {

  let { getCart, cart, updateProductCount, deleteProductCart } = useContext(CartContext);

  useEffect(() => {
    getCart()

  }, [])

  return <>

    <div className='text-center'>
      <h2 className='text-main text-5xl mb-10 mt-10'>Cart</h2>

      {cart ? <div className='cart-top flex w-4/5 m-auto '>

        <div className="cart-table shadow-md sm:rounded-lg w-3/4 mx-auto mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="ps-12 py-4">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {cart.data.products.map((product , index) => <tr key={product.product.id || index} className="bg-white border-b  hover:bg-gray-50 ">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateProductCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button onClick={() => updateProductCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-3 py-4 font-semibold text-gray-900">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteProductCart(product.product.id)} className="font-medium text-red-600 hover:underline"><i className='fa-solid fa-trash'></i> Remove</button>
                </td>
              </tr>
              )}
            </tbody>
            <tfoot >
              <td colSpan={5}>
            <button onClick={() => deleteCart(product.product.id)} className=' transition-all bg-red-600 hover:bg-red-800 w-full rounded-md text-center text-white p-2 block'>Clear Cart</button>
              </td>
            </tfoot>
          </table>

        </div>

        <div className="cost w-1/4 h-1/5">

          <div className=' bg-gray-300 mx-5 px-5 rounded-md'>
            <div className='pt-5'>
              <div className=' font-semibold text-gray-700'>
                <h4 className='text-center'>CART SUMMARY</h4>
                <div className='flex justify-between'>
                  <h4>Subtotal  : </h4>
                  <h4 className='text-main'>{cart.data.totalCartPrice} <span className='text-gray-700'>EGP</span></h4>
                </div>
              </div>
            </div>

            <div className='py-5  w-full'>
              <Link to={'/checkout'} className='bg-green-500 btn w-full rounded-md text-center hover:text-white text-white p-2 block'>Check Out</Link>
            </div>
          </div>

        </div>

      </div> : 
      
      <div className='flex justify-center text-center '>
      <Loading />
    </div>
    }
    </div>

  </>
}
