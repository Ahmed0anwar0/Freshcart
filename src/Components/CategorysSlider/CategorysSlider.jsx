import React, { useEffect, useState } from 'react'
import style from './CategorysSlider.module.css'
import Slider from "react-slick"
import axios from 'axios';

export default function CategorysSlider() {

  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2); 
      }else if(window.innerWidth < 1024){
        setSlidesToShow(3);
      }else {
        setSlidesToShow(6);
      }
    };

    window.addEventListener('resize', updateSlidesToShow);

    updateSlidesToShow();

    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const [categories, setCategories] = useState([]);

  async function getCategories(){
  
    try{
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories') ;
  
        setCategories(data.data);
        
    }catch(err){
      console.log(err);
    }
  }

    useEffect(() => {
      
      getCategories()

    }, [])

  return <>

    <Slider {...settings}>
      {categories?.map((category, index) => <div key={index} className='my-6 text-center'>
        <img src={category.image} className=' w-full h-[250px]' />
        <h3 className='text-lg font-semibold'>{category.name}</h3>
      </div>)}
    </Slider>
  </>
}
