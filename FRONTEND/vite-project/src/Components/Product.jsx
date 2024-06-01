import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Product = () => {
  const [productData, setProductData] = useState();

  const fetchProducts = async (exp) => {
    // console.log(exp);
    const access = Cookies.get('access')
    try {
      const response = await axios.get("http://localhost:3344/api/products/all", {
        method: "GET",
        headers: {
          token: `Bearer ${access}`
        }
      })
      console.log(response.data);
      setProductData(response.data)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])



  const handleSubmitCart = async (prod) => {
    console.log(prod);

    // console.log(value);
    const access = Cookies.get('access')
    const user = Cookies.get('user')
    // e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3344/api/carts", {
        userId: `${user}`,
        product: prod,
      }, {
        headers: {
          token: `Bearer ${access}`
        }
      });
      console.log(response.data); // Log the response data
      // Redirect user if a URL is returned from the server
      if (response.data) {
        window.location.href = "/carts";
      }
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <>

      <h1 className='text-[2.5rem] mb-4 pt-4 font-bold font-serif text-center' >PRODUCTS</h1>


      <div className='flex flex-wrap justify-center'>
        {
          productData?.map((it, ind) => (
            <section className=' text-center  mx-3 flex '>

              <>

                <div key={ind} className='flex'>
                  <div className=' bg-slate-700 rounded-md text-white    mx-auto mt-4 pb-4 '>
                    <img src={it.img} className='w-80 h-[70%]' alt="" />
                    <div className='flex justify-between mx-10 text-[1.5rem]'>
                      <h3 className='pl-3 '> {it.title}</h3>
                      <h6 className='pl-3 pb-3 '><span>$</span> {it.price}.00</h6>
                    </div>

                    <div className='bg-blue-400 mx-12 rounded-md  text-[1.5rem] hover:bg-white hover:text-blue-400'>
                      <button className="w-100" onClick={() => handleSubmitCart(it._id)} >Add To Cart </button>

                    </div>
                  </div>
                </div>
              </>
            </section>
          ))
        }
      </div>

    </>
  );
};


export default Product;