import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {

  let { userData, setUserData } = useContext(UserContext)
  let navigate = useNavigate()
  let { cart, wishlist } = useContext(CartContext)
  let [isNavOpen, setIsNavOpen] = useState(false);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }

  let toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  return <>

    <nav className='bg-gray-200 z-10  md:fixed top-0 inset-x-0 py-2 px-4 md:px-0 md:text-center capitalize'>
      <div className="container flex flex-col md:flex-row md:items-center content-center pt-3">
        <div className="logo flex justify-between md:w-1/4 md:justify-end">
          <i className="fa-solid fa-cart-shopping text-main text-3xl "></i>
          <NavLink to=""><h1 className='text-black cursor-pointer text-2xl font-bold'>Fresh Cart</h1></NavLink>
          <button onClick={toggleNav} className='toggle-nav self-end text-xl border-2 rounded border-gray-600 py-2 px-3'><i className="text-gray-600 fa-solid fa-bars-staggered"></i></button>
        </div>


        <div className={`nav-links flex flex-row justify-between md:justify-evenly md:w-3/4 space-x-3  text-gray-500 ${isNavOpen ? 'open' : ''}  md:flex`}>
          {userData && <ul className='flex flex-col md:flex-row gap-5 space-x-2'>
            <li><NavLink to="">Home</NavLink></li>
            <li><NavLink to="products">products</NavLink></li>
            <li><NavLink to="categories">categories</NavLink></li>
            <li><NavLink to="brands">brands</NavLink></li>
          </ul>}
          <ul className='flex flex-col justify-between md:flex-row space-x-5'>
            {userData ?
              <>
                <li className=' pe-5' ><NavLink to="wishlist" className=" text-gray-500"> <i className="fa-solid fa-heart text-red-500 text-3xl"></i></NavLink></li>
                <li className='relative me-8 pe-10' ><NavLink to="cart" className=" text-gray-500"> <i className="fa-solid fa-cart-shopping  text-3xl"></i> <span className='text-sm w-[20px] h-[20px] rounded bg-main absolute top-[-8px] left-5'>{cart?.numOfCartItems}</span></NavLink></li>
                <li onClick={() => logOut()} className="cursor-pointer text-gray-500" >Logout</li>
              </> :
              <>
                <li className='login'><NavLink to="login" className=" text-gray-500">Login</NavLink></li>
                <li className='register'><NavLink to="register" className=" text-gray-500">Register</NavLink></li>
              </>
            }

          </ul>
        </div>

      </div>
    </nav>

  </>
}
