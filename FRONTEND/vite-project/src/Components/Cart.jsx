import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { decrement, increment } from '../features/counter/counterSlice';
// import Product from './Product';


const Cart = () => {


    const [cartData, setCartData] = useState(); // Initialize state for user data

    const fetchCarts = async () => {
        const access = Cookies.get('access');
        try {
            const response = await axios.get("http://localhost:3344/api/carts/find", {
                headers: {
                    token: `Bearer ${access}`
                }
            });
            console.log(response.data);
            setCartData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCarts();
    }, []); //
    // console.log(cartData);

    // const handleChangeCart = (e) => {
    //     const { name, value } = e.target;
    //     console.log({ name, value });

    //     setCartData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };





    const [deleteData, setDeleteData] = useState([]);

    // Function to delete product from the cart
    const deleteProduct = async (productId) => {
        const access = Cookies.get('access');
        // const user = Cookies.get('user');
        console.log({ productId });
        try {
            const response = await axios.delete(`http://localhost:3344/api/carts/${productId}`, {

                headers: {
                    token: `Bearer ${access}`
                },
            });
            console.log(response.data);
            setDeleteData(response.data);
            // Cookies.set('access', response.data.accessToken);
            // Cookies.set('user', response.data.setUser);
        } catch (error) {
            console.error(error);
        }
    };

    // const count = useSelector((state) => state.counter.value)
    // const dispatch = useDispatch()

    console.log("cart data", cartData);

    // const handleQuantityChange = async (id, txt)=>{
    //     if(txt == 'increment'){
    //         await axios.put(`http://localhost:3344/api/cats/${id}`,{quantity:txt},
    //             {
    //                 headers: {
    //                     token: `Bearer ${access}`
    //                 }
    //             }
    //         )
    //     }else{
    //         await axios.put(`http://localhost:3344/api/cats/${id}`,{quantity:txt},
    //         {
    //             headers: {
    //                 token: `Bearer ${access}`
    //             }
    //         }
    //     )
    //     }
    // }
    const handleIncrement = async (id) => {
        const access = Cookies.get('access');
        try {
            const res = await axios.put(`http://localhost:3344/api/carts/${id}`, { quantity: 'increment' }, {
                headers: {
                    token: `Bearer ${access}`
                }
            });
            if (res || res.data) {
                fetchCarts();
            }
            // Optionally, you can update the state here to reflect the changes in the UI.
        } catch (error) {
            console.error(error);
        }
    };
    const handleDecrement = async (id) => {
        const access = Cookies.get('access');
        try {
            const res = await axios.put(`http://localhost:3344/api/carts/${id}`, { quantity: 'decrement' }, {
                headers: {
                    token: `Bearer ${access}`
                }
            });

            if (res || res.data) {
                fetchCarts();
            }

            // Optionally, you can update the state here to reflect the changes in the UI.
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmitOrder = async (prod, amount, qunt) => {
        console.log(prod, amount,qunt);
        // return
        // console.log(value);
        const access = Cookies.get('access')
        const user = Cookies.get('user')
        // e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3344/api/orders", {
                userId: `${user}`,
                product: prod,
                quantity: qunt,
                amount: amount
            }, {
                headers: {
                    token: `Bearer ${access}`
                }
            });
            console.log(response.data); // Log the response data
            // Redirect user if a URL is returned from the server
            // if (response.data) {
            //     window.location.href = response.data.url;
            // }
        } catch (error) {
            console.error(error);
        }

    };

    const OrderBuy = async (data) => {
        try {
            const response = await axios.post("http://localhost:3344/api/stripe/create-checkout-session", data);
            // setState(response.data)
            console.log(response.data);
            window.location.href = response.data.url

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h1 className='text-[2rem] font-bold font-serif text-center' >Carts</h1>

            <div >


                {

                    cartData?.map((it, ind) => (
                        <div key={ind} className=' mt-2 rounded-md bg-slate-800 text-center text-white p-4 ' >

                            <h1 className='text-[1.1rem]'><span className='text-blue-400'>User Id :</span><span className='text-green-500'> "{it.userId}"</span></h1>
                            <span className='text-[1.2rem] text-blue-400'>products :[ </span>
                            <h1 className='flex flex-wrap justify-center  mx-auto'>{

                                <div className=' bg-neutral-700 mb-4 pb-4 text-center rounded-md border border-blue-500  max-w-[400px]'>
                                    {/* {    console.log(pro._id)} */}
                                    <h1 className='text-[1.1rem]   text-blue-200'>product : {ind + 1}</h1>
                                    <div><img src={it.product.img} alt="" className='mx-auto w-80 h-[70%]' /></div>
                                    <div><span> Product Title:</span><span className='text-green-500'></span>{it.product.title}</div>
                                    <div><span> Product Color</span><span className='text-green-500'>{'red'}</span></div>
                                    {/* <div >quantity of Product : {pro.count}</div> */}

                                    <div className='mb-4'>price : {it.amount}</div>


                                    <div className="mb-4">

                                        <div className=" " style={{ gap: ".5rem" }} >
                                            <div className="flex justify-center" style={{ gap: ".5rem" }}>
                                                <button disabled={it.quantity <= 1} onClick={() => handleDecrement(it._id)} className='bg-blue-400  rounded-md px-3 text-[1.5rem] hover:bg-white hover:text-blue-400'>-</button>

                                                <div>
                                                    <span className=" "> {it.quantity} </span> QTY
                                                </div>
                                                <button className='bg-blue-400  rounded-md px-3 text-[1.5rem] hover:bg-white hover:text-blue-400' onClick={() => handleIncrement(it._id)}>+</button>
                                            </div>

                                        </div>

                                    </div>


                                    <button className='bg-blue-400 mx-12 rounded-md px-28 mt-3 text-[1.5rem] hover:bg-white hover:text-blue-400' onClick={() => deleteProduct(cartData?._id)}>remove</button>
                                    <div>
                                        <button className='w-full mt-2 border-[0.2rem] border-violet-500 mx-auto text-gray-300 bg-black rounded-md p-4 hover:bg-sky-800' onClick={() => {
                                            handleSubmitOrder(it.product._id,it.amount, it.quantity)
                                                OrderBuy({ name: it.product.title, amount: `${it.product.price}00`, quantity: it.quantity })
                                        }}>SUBMIT</button>
                                    </div>
                                </div>
                            }

                            </h1>
                            <span className='text-[1.2rem] text-blue-400'>]</span><br />

                        </div>
                    ))
                }
            </div>

        </>
    )
}


export default Cart;