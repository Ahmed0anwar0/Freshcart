import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';


export let CartContext = createContext();

export default function CartContextProvider({children}) {

    let headers = {token : localStorage.getItem('userToken')}

    const [cart, setCart] = useState(null)
    const [wishlist, setWishlist] = useState(null)

    async function addProductCart(productId) {
        
        try{

            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,{
                productId
            }, {
                headers
            })

          toast.success(data.message)
            setCart(data)
        }catch(err){
            console.log(err);

        }

    }

    async function checkout(shippingAddress) {
        
        try{

            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173` ,{
                shippingAddress
            }, {
                headers
            })

            console.log(data);
            window.location.href = data.session.url

          
        }catch(err){
            console.log(err);

        }

    }
    
    async function deleteProductCart(productId) {
        
        try{

            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                headers
            })

            setCart(data)
        }catch(err){
            console.log(err);

        }

    }

    async function updateProductCount(productId , count) {
        if(count > 0){

          try{

            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
              count
            }, {
                headers
            })

            console.log(data);
            setCart(data)
        }catch(err){
            console.log(err);

        }
        }

    }

    async function getCart() {
        
        try{

            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
                headers
            })

            setCart(data)
        }catch(err){
            console.log(err);

        }

    }

    async function addToWishlist(productId) {
        
        try{

            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,{
                productId
            }, {
                headers
            })

          toast.success(data.message+" ❤")
            setWishlist(data)
        }catch(err){
            console.log(err);

        }

    }

    async function deleteFromWishlist(productId) {
        
        try{

            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
                headers
            })

            setWishlist(data)
            console.log(data);
            
        }catch(err){
            console.log(err);

        }

    }

    async function getWishlist() {
        
        try{

            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' ,{
                headers
            })

            setWishlist(data)
        }catch(err){
            console.log(err);

        }

    }

    useEffect(() => {
      getCart()
      getWishlist()
    }, [])
    
  return <CartContext.Provider value={{wishlist , setWishlist , getWishlist , deleteFromWishlist , addToWishlist , addProductCart , checkout , getCart , cart , setCart , updateProductCount , deleteProductCart }}>
    {children}
  </CartContext.Provider>
}
