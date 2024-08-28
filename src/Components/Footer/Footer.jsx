import React, { useState } from 'react'
import style from './Footer.module.css'
import icon1 from '../../assets/images/amazon-pay.png'
import icon2 from '../../assets/images/american-express.png'
import icon3 from '../../assets/images/business.png'
import icon4 from '../../assets/images/paypal.png'
import img1 from '../../assets/images/googleplaye.png'
import img2 from '../../assets/images/appstore.png'

export default function Footer() {




  return <>
    <div className="footer relative z-30 inset-x-0 bottom-0  bg-gray-100 pb-20 pt-10">

      <div className="container px-10 bg-gray-100">
        <h3 className='capitalize text-3xl'>get the freshcart app</h3>
        <p className='text-zinc-500 mb-5'>we will send you a link, open it on your phone to download the app</p>
        <div>
          <div className="contact-us mb-5 md:flex gap-5 px-3">
            <input type="email" id="email" className=" border-gray-300 footerEmail text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full md:w-10/12 p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Email .." required />
            <button type="submit" className="text-white md:w-2/12 bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share App Link</button>
          </div>
          <div className='w-full bg-gray-400 h-[1px]'></div>

          <div className='last flex flex-row md:justify-between my-5'>

            <div className="payment flex self-center">
              <h5 className='me-5 text-xl'> Payment Partners</h5>
              <img src={icon1} alt="" className=' object-fill pe-2 h-[30px]' />
              <img src={icon2} alt="" className=' object-fill pe-2 h-[30px]' />
              <img src={icon3} alt="" className=' object-fill pe-2 h-[30px]' />
              <img src={icon4} alt="" className=' object-fill pe-2 h-[30px]' />
            </div>

            <div className="deliveries md:flex text-center ">
              <h5 className='md:me-5 self-center text-xl'> Get deliveries with frechcart </h5>
              <img src={img1} alt="" className=' object-fill pe-2 h-[50px]' />
              <img src={img2} alt="" className=' object-fill pe-2 h-[50px]' />
            </div>

          </div>

          <div className='last-hr w-full bg-gray-400 h-[1px]'></div>

        </div>
      </div>

    </div>
  </>
}
