import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios';
import RecentProducts from '../RecentProducts/RecentProducts';
import Loading from '../Loading/Loading';
import CategorysSlider from '../CategorysSlider/CategorysSlider';
import MainSlider from '../MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';

export default function Home() {

  const [products, setProducts] = useState([])
  let [dataa, setDataa] = useState([]);
  let [searchProducts, setSearchProducts] = useState("");

  async function getRecentProducts() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let {data , isLoading} = useQuery({
    queryKey : ['recentProducts'],
    queryFn : getRecentProducts,
    refetchOnMount : false,
    select : (data)=> data ?.data.data
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
    <div className="container px-5 pb-5">
      <MainSlider />
      <CategorysSlider />

      <input onChange={(e) => setSearchProducts(e.target.value)} type="search" id="search" className="my-10 mx-auto border text-sm rounded-lg border-green-500  block w-10/12 p-2.5 " placeholder="Search .."/>

      { !isLoading? <div className='flex flex-wrap justify-center px-8'>
        {filteredProducts.map((product, index) => <RecentProducts key={index} product={product} />)}
      </div> :
        <div className='flex justify-center text-center '>
          <Loading />
        </div>
      }
    </div>
  </>
}
