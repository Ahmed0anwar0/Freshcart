import React, { useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Brands() {


  async function getBrands() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let {data , isLoading} = useQuery({
    queryKey : ['brands'],
    queryFn : getBrands,
    refetchOnMount : false,
    select : (data)=> data ?.data.data
  })
  
  console.log(data);
  
  return <>
    <div className="container px-10 py-10 text-center"> 
      <h2 className='text-main text-5xl mb-10'>All Brands</h2>
      { !isLoading? <div className='flex flex-wrap justify-center'>
        {data.map((categore, index) => 
        
        <div className="categore md:w-1/2 lg:w-1/4 mb-5 px-5" key={index}> 
    
        <div className='border rounded duration-500 hover:shadow-[0_0px_6px_1px] hover:shadow-green-500'>
        <Link className='cursor-default' to={``}>
          <img className=' w-full object-contain '  src={categore.image} alt={categore.slug} />
          <div className="text-center ">
          <h2 className='text-black text-lg pb-10'>{categore.name}</h2>
          </div>
          </Link>
        </div>
       
    </div>
        
        )}
      </div> :
        <div className='flex justify-center text-center '>
          <Loading/>
        </div>
      }
    </div>
  </>
}
