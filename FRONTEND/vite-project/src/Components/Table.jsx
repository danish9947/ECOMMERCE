import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

function Table() {
  const [cartData, setCartData] = useState([]);
  const [returnCode, setReturnCode] = useState(null);

  // Fetch cart data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const access = Cookies.get('access');
      const user = Cookies.get('user');
      const response = await axios.get(`http://localhost:3344/api/products/all`, {
        headers: {
          token: `Bearer ${access}`
        }
      });
      setCartData(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <>
      {
      cartData?.map((product, index) => (
        <div key={index}>
          <h1>{product._id}</h1>
          <label>Title:</label>
          <input type="text" value={product.title} onChange={(e) => handleChangeCart(e, product._id, 'title')} />
          <label>Description:</label>
          <input type="text" value={product.desc} onChange={(e) => handleChangeCart(e, product._id, 'desc')} />
          {/* Add other fields as needed */}
          <button onClick={() => handleSubmitCart(product._id)}>Update</button>
        </div>
      ))}
    </>
  );
}

export default Table;
