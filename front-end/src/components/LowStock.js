import React, { useEffect, useState } from 'react';
import '../styles/LowStock.css'

function LowStock(){
  let [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:8000/products`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      setProducts(json)
    })
  }, [])

    return (
      <div className='LowStock'>
        <div className='Header'>
          <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679321351604.svg?token=exp=1679322252~hmac=60974dc39c6b4c238b4bf00fed2fac31' width='25' alt='' style={{marginRight: "1rem"}}/>Low Stock</div>
        </div>
        <div className='LowStock-heading'>
          <div>No.</div>
          <div style={{textAlign: "start"}}>Product name</div>
          <div>category</div>
          <div>in-Stock</div>
          <div>Buying price</div>
          <div>Selling price</div>
          <div>Last Update</div>
        </div>
        <div className="list">
        {products.filter((e) => e.inStock < 10).map((element, i) => (
            <div className='LowStock-column'>
              <div>{i + 1}</div>
              <div style={{textAlign: "start"}}>{element.ProductName}</div>
              <div>{element.Category}</div>
              <div>{element.inStock}</div>
              <div>{element.BuyingPrice}</div>
              <div>{element.SellingPrice}</div>
              <div>{element.updatedAt.split('T')[0]}<br/>{element.updatedAt.split('T')[1].split('.')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default LowStock;
