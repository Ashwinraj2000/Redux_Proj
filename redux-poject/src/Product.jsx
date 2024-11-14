import React from 'react'
import { useState,useEffect } from 'react'
import { add,addItem,removeItem} from './store/cartSlice';
import { useDispatch,useSelector } from 'react-redux';

const Product = () => {

    const dispatch=useDispatch();
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const Qty=useSelector(state => state.cart.quantity)

    const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const result = await response.json();
          console.log(result)
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const addToCart=(product)=>{
        dispatch(add(product));
      }

      const additems=(product)=>{
        dispatch(addItem(product));
      }

      const removeitems=(product)=>{
        dispatch(removeItem(product));
      }

  return (
    <div className='w-full'>
      <div className='w-full max-w-[1240px] mx-auto p-4 text-black grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {data.map((product)=>(
           <div key={product.id} className=' shadow-lg w-[250px] h-[350px] border-[2px] border-slate-200 rounded-lg flex flex-col justify-between items-center text-center p-2 mx-auto hover:scale-105 transition-transform duration-200 ease-in-out'>
            <h3 className='mb-1'>{product.title}</h3>
            <img className='w-[150px] h-[150px]' src={product.image} alt="" />
            <h2 className='font-semibold'>Price: ${product.price}</h2>
            {(Qty[product.id] || 0) === 0 ? <button onClick={()=>addToCart(product)} className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Add To Cart</button>:
            <div>
              <button className='px-[12px] py-1 rounded-full bg-blue-500 text-white font-extrabold shadow-md hover:bg-blue-700' onClick={()=>additems(product)}>+</button>
              <span className='mx-2 font-semibold'>{Qty[product.id]}</span>
              <button className='px-[12px] py-1 rounded-full bg-blue-500 text-white font-extrabold shadow-md hover:bg-blue-700' onClick={()=>removeitems(product)}>-</button>
            </div>}
           </div>
        ))}
      </div>
    </div>
  )
}

export default Product
