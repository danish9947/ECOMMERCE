import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';



export default function Orders() {
  const access = Cookies.get('access');
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async (pro1) => {
      console.log(pro1);
      try {
        const response = await axios.get("http://localhost:3344/api/orders/find", {

          headers: {
            token: `Bearer ${access}`
          }
        });
        console.log("OrderData", response.data);
        setOrderData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchUsers function on component mount
    fetchOrders();
  }, []); //

  const deleteProduct = async (productId) => {
    console.log(productId);
    try {
      await axios.delete(`http://localhost:3344/api/orders/${productId}`, {
        headers: {
          token: `Bearer ${access}`
        }
      });
      // console.log(response.data);
      // Cookies.set('access', response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("order Data:", orderData);



  // const [state, setState] = useState("")





  return (
    <>
      <h1 className='text-[2rem] font-bold font-serif text-center'>orders</h1>
      {

        orderData?.map((it, ind) => (
          <div key={ind} className=' mt-2 rounded-md bg-slate-800 text-center text-white p-4 ' >
            <h1 className='text-[1.1rem]'><span className='text-blue-400'>User Id :</span><span className='text-green-500'> "{it.userId}"</span></h1>

            <span className='text-[1.2rem] text-blue-400'>products :[ </span>
            <h1 className='flex flex-wrap justify-center  mx-auto'>

              <div className=' bg-neutral-700 mb-4 pb-4 text-center rounded-md border border-blue-500  max-w-[400px]'>

                <h1 className='text-[1.1rem]   text-blue-200'>product : {ind + 1}</h1>
                <div><img src={it.product.img} alt="" className='mx-auto w-80 h-[70%]' /></div>
                <div><span> Product Title:</span><span className='text-green-500'></span>{it.product.title}</div>
                <div><span> Product Color</span><span className='text-green-500'>{'red'}</span></div>
                <div><span> Product Color</span><span className='text-green-500'>{it.quantity}</span></div>


                <div className='mb-4'>price : {it.amount}</div>

                <div className='text-center'>

                  <button className='bg-blue-400 mx-12 rounded-md px-28 text-[1.5rem] hover:bg-white hover:text-blue-400' onClick={() => deleteProduct(it._id)}>Remove</button>

                </div>
              

              </div>


            </h1>

            <span className='text-[1.2rem] text-blue-400'>]</span><br />
          </div>
        ))
      }
    </>
  );
}
