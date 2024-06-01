import React, { useEffect, useState } from 'react';
import { SiNamecheap } from "react-icons/si";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios"


export default function Form() {
    const [state, setState] = useState("")



    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:3344/api/stripe/create-checkout-seassion", {
                amount: 5000,
                name: "BLENDED SHIRT"
            });
            setState(response.data)
            console.log(response.data);
            window.location.href = response.data.url

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className='flex justify-center bg-black w-full h-screen pt-16'>
            <div>
                <div className='border-[0.2rem] border-violet-500 rounded-md bg-black'>
                    <div className="mb-5">
                        <img src="\shr.jpg" className="w-96" alt="" />
                    </div>
                    <div className='text-center mb-5 text-gray-300'>
                        <h5>MEN'S BLENDED SHIRT</h5>
                        <h5>$50.00</h5>
                    </div>
                </div>
                <div>
                    <button className='w-full mt-2 border-[0.2rem] border-violet-500 mx-auto text-gray-300 bg-black rounded-md p-4 hover:bg-sky-800' onClick={fetchData}>SUBMIT</button>
                </div>
            </div>

        </div>
    );
}


// import React, { useEffect, useState } from 'react';
// import axios from "axios";

// export default function Form() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/stripe/create-checkout-seassion");
//       setData(response.data);
//       setError(null);
//       console.log(response.data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='border bg-black p-4'>
//       <div>
//         <img src="\shr.jpg" alt="" />
//       </div>
//       <div className='text-center'>
//         <h5>MEN'S BLENDED SHIRT</h5>
//         <h5>$50.00</h5>
//       </div>
//       <div>
//         <button className='w-10rem mx-auto' onClick={fetchData}>SUBMIT</button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {data && (
//         <div>
//           {/* Display data from response here */}
//         </div>
//       )}
//     </div>
//   );
// }