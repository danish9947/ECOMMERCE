import React from 'react'
import { TiTick } from "react-icons/ti";


export default function Success() {
  return (
    <div className='flex justify-center bg-black w-full h-screen pt-20 pb-32'>
      <div className='border-[0.2rem] border-violet-500 rounded-md bg-black w-80'>
        <div className="mb-5">
          <TiTick className='text-cyan-600 mx-auto mt-36 text-[10rem]' />
        </div>
        <div className='text-center mb-5 text-gray-300'>
          <h5>YOUR PAYMENT PROCESS HAS BEEN SUCCESSED</h5>

        </div>
      </div>
    </div>
  )
}