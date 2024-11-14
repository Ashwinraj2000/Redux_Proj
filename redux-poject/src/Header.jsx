import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useSelector,useDispatch } from 'react-redux';
import { remove } from './store/cartSlice';

const Header = () => {
    const cartProduct=useSelector(state => state.cart.products)

    const Qty=useSelector(state => state.cart.quantity)

    const total=useSelector(state => state.cart.total)

    const dispatch=useDispatch();

    const [menu,setMenu]=useState(false);

    const handleScroll = () => {
        if (window.scrollY > 1) { 
          setMenu(false);
        }
      };

      const removeItem=(product)=>{
        dispatch(remove(product));
      }
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const togglemenu=()=>{
        setMenu(!menu)
    }

  return (
    <div className='w-full bg-black text-white flex justify-between p-4 text-2xl font-bold mb-7'>
      <h2>Shoppify.</h2>
    {menu ?
            <div className=' absolute top-0 left-0 w-full h-full z-50 bg-[#2e3030c0]'>
                <div className='w-[100%] sm:max-w-[750px] h-[100%] absolute top-0 right-0 bg-white text-black p-6'><IoCloseSharp size={40} className='absolute right-5 top-5 hover:cursor-pointer' onClick={togglemenu} /> 
                    <h1 className='text-3xl ml-4 mb-12'>Checkout</h1>
                    <div className='w-full h-[90%] overflow-y-auto text-black'>
                    {cartProduct.length<1? <h1>No products added to the cart...</h1>:
                    <>
                    {cartProduct.map((product)=>(
           <div key={product.id} className='flex flex-row items-center p-2 gap-2'>
            <img className='w-[150px] h-[120px]' src={product.image} alt="" />
            <div className='ml-5 w-[50%]'>
          
            <h3 className='mb-1'>{product.title}</h3>
            <h2 className='text-xl font-semibold'>Qty: <span className='text-green-700 font-bold'>{Qty[product.id]}</span></h2>
            <h2 className='font-semibold mb-2'>Price(per item): ${product.price}</h2>
            <button onClick={()=>removeItem(product)} className='px-2 py-1 text-sm md:text-lg bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none '>Remove item</button>
            </div>
           </div>
        ))}
            </>}
            {total.toFixed(2)>0?<div className='w-full p-4 bg-white text-black border-t border-gray-300'>
              <h2 className='text-xl font-semibold'>Total price : ${total.toFixed(2)}</h2>
            </div>:<></>}
                    </div>
                </div>
            </div>
            : 
            <button className='px-3 py-1' onClick={togglemenu}><FaCartPlus/> {cartProduct.length>0 ?<span className='absolute top-0 right-3 text-lg text-red-600'>{cartProduct.length}</span> :<span></span>}</button>} 
    </div>
  )
}

export default Header
