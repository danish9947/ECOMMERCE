import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const User = () => {
    const [userData, setUserData] = useState([]); 
    useEffect(() => {
        const fetchUsers = async () => {
            const access = Cookies.get('access');
            if (fetchUsers) {
                const response = await axios.get("http://localhost:3344/api/users/all", {
                    headers: {
                        token: `Bearer ${access}`
                    }
                });
                console.log(response.data);
                setUserData(response.data);
            } if (!fetchUsers) {
                console.log(!fetchUsers);
                console.log("your not admin");
            } else (error) => {
                console.error(error);
            }
        };

        fetchUsers(); // Call fetchUsers function on component mount
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    return (
        <div className='flex flex-wrap justify-center'>

            {
                userData.map((it, ind) => (
                    <div >

                        <section key={ind} className=' text-center'>
                        <div className=' mt-5'>{ind + 1}</div>

                            <div className=' bg-slate-700 text-white w-[300px]  mx-auto '>
                                <div className="avatar">
                                    <div className=" w-16 h-14">
                                        <img src="/avatar.webp" alt="Avatar Tailwind CSS Component" className='' />
                                    </div>
                                </div>
                                <h1 className='p-3 pt-3'>{it.username}</h1>
                                <h1 className='pl-3 pt-3'>{it._id}</h1>
                                <h1 className='p-3 pt-3'>{it.email}</h1>
                                {/* <h1 className='pl-3 pt-3'>{it.isAdmin}</h1> */}
                            </div>


                        </section>
                    </div>
                ))}
        </div>
    );
};

export default User;
