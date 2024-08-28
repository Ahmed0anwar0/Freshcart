import React, { useState } from 'react'
import style from './Categories.module.css'
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {


  async function getCategories() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {data , isLoading} = useQuery({
    queryKey : ['categories'],
    queryFn : getCategories,
    refetchOnMount : false,
    select : (data)=> data ?.data.data
  })
    
  return <>
    <div className="container px-10 pb-10 text-center">
    <h2 className='text-main text-5xl mb-10 mt-10'>Categories</h2>

      { !isLoading? <div className='flex flex-wrap justify-center'>
        {data.map((categore, index) => 
        
        <div className="categore md:w-1/2 lg:w-1/3 mb-8 px-5" key={index}> 
    
        <div className='border rounded duration-500 hover:shadow-[0_0px_6px_1px] hover:shadow-green-500'>
        <Link className='cursor-default' to={``}>
          <img className='h-[300px] w-full object-cover'  src={categore.image} alt={categore.slug} />
          <div className="text-center ">
          <h2 className='text-main pt-5 text-2xl'>{categore.name}</h2>
          </div>
          </Link>
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
