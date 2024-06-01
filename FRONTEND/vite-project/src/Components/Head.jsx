import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Head() {
    return (
       

        <div className='flex justify-between bg-blue-950 pr-10' >
            {/* <div><img src="e.jpg" alt="" className='bg-white rounded-full w-20' /></div> */}
            <div><h1 className='mt-5 text-[2rem] text-white ml-4 italic'>E-COMMERCE APP</h1></div>

            <Menu className=' text-white rounded-md  my-6  text-[1rem] hover:bg-white hover:text-blue-400'
             
             >
                <Menu.Item >
                    <Link to={"/login"} >LOG IN</Link>
                </Menu.Item>
                
            </Menu>
            <Menu 
           className=' text-white rounded-md  my-6  text-[1rem] hover:bg-white hover:text-blue-400'
             >
                <Menu.Item >
                    <Link to={"/register"}>REGISTER</Link>
                </Menu.Item>
            </Menu>
        </div>
               
    )
}
