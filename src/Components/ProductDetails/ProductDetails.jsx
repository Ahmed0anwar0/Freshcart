import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick"
import { data } from 'autoprefixer'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'

export default function ProductDetails() {

  let {addProductCart , addToWishlist} = useContext(CartContext);
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getProductDetails(id) {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    setProductDetails(data.data)

  }

  useEffect(() => {
    getProductDetails(id)
  }, [])

  
  return <>

    {productDetails.images ? <div className="details flex items-center py-10">

      <div className="w-1/4 p-4 ps-20">
        {productDetails.images.length > 1 ? <Slider {...settings}>
          {productDetails.images?.map((image, index) => <img src={image} key={index} className='w-full' alt={productDetails.title} />)}
        </Slider> : <img src={productDetails.imageCover}  className='w-full' alt={productDetails.title} /> }
      </div>
      <div className="w-3/4 info px-20">
        <div>
        <button onClick={() => addToWishlist(productDetails.id)} className='btn-wishlist dit'><i className="fa-solid fa-heart text-red-500 text-3xl"></i></button>
          <h2 className='font-bold text-2xl'>{productDetails.title}</h2>
          <p className='my-6 text-gray-500'>{productDetails.description}</p>
          <h3 className='text-main'>{productDetails.category?.name}</h3>
          <div className="flex justify-between my-2">
            <h3>{productDetails.price} EGP</h3>
            <h3><i className='fas fa-star text-amber-300'></i>{productDetails.ratingsAverage}</h3>
          </div>
          <button  onClick={()=> addProductCart(productDetails.id)} className='btn bg-green-500 w-full text-white rounded py-1 mt-10'>Add To Cart</button>

        </div>
      </div>

    </div> :
      <div className='flex justify-center text-center py-10 '>
        <Loading />
      </div>
    }
  </>
}
