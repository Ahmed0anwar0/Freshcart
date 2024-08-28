import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

export default function Products() {

  let { addProductCart, addToWishlist } = useContext(CartContext);
  let [dataa, setDataa] = useState([]);
  let [searchProducts, setSearchProducts] = useState("");

  async function getAllProducts() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
    select: (data) => data?.data.data
  })

  useEffect(() => {
    if (data) {
      setDataa(data);
    }
  }, [data]);
  
    function search(data){
        return data.filter((product) =>
          Object.values(product).some((value) =>
            value.toString().toLowerCase().includes(searchProducts.toLowerCase())
          )
        )
    }

    let filteredProducts = search(dataa);

  return <>
    <div className="container px-5 pb-5 text-center">
      <h2 className='text-main text-5xl mb-10 mt-10'>All Products</h2>

      <input onChange={(e) => setSearchProducts(e.target.value)} type="search" id="search" className="mx-auto border text-sm rounded-lg border-green-500  block w-10/12 p-2.5 " placeholder="Search .."/>

      {!isLoading ? <div className='flex flex-wrap justify-center px-8'>
        {filteredProducts.map((product, index) =>

          <div className="product relative md:w-1/2 lg:w-1/4 p-5" key={index}>
            <div className='p-5 rounded duration-500 hover:shadow-[0_0px_6px_1px] hover:shadow-green-500'>
              <button onClick={() => addToWishlist(product.id)} className='btn-wishlist'><i className="fa-solid fa-heart text-red-500 text-3xl"></i></button>
              <Link to={`/ProductDetails/${product.id}`}>
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

        )}
      </div> :
        <div className='flex justify-center text-center '>
          <Loading />
        </div>
      }
    </div>
  </>
}
