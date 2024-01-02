import React, { useEffect, useState } from 'react';
import '../styles/StockOut.css'
// import AddStockOut from './AddStockOut'

function StockOut(){
  let [StockOut, setStockOut] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:8000/StockOut/get`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
        setStockOut(json)
    })
  }, [])

  function deleteProduct(e){
    const URL = `http://localhost:8000/deleteStockOut/${e.target.alt}`
    fetch(URL, {
      method: 'DELETE',
    })
    .then(window.location.href = '/StockOut')
  }

    return (
      <div className='StockOut'>
        <div className='Header'>
          <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679321351604.svg?token=exp=1679322252~hmac=60974dc39c6b4c238b4bf00fed2fac31' width='25' alt='' style={{marginRight: "1rem"}}/>Sale History</div>
        </div>
        <div className='StockOut-heading'>
          <div>No.</div>
          <div style={{textAlign: "start"}}>Product name</div>
          <div>category</div>
          <div>Customer</div>
          <div>Selling price</div>
          <div>Last Update</div>
          <div>Actions</div>
        </div>
        <div className="list">
          {StockOut.map((element, i) => (
            <div className='StockOut-column'>
              <div>{i + 1}</div>
              <div style={{textAlign: "start"}}>{element.ProductName}</div>
              <div>{element.Category}</div>
              <div>{element.Customer}</div>
              <div>{element.SellingPrice}</div>
              <div>{element.updatedAt.split('T')[0]}<br/>{element.updatedAt.split('T')[1].split('.')[0]}</div>
              <div className='Action'>
                <img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={element.ProductName} width="20" onMouseOver = {(e) => e.target.src = 'https://cdn-user-icons.flaticon.com/96885/96885753/1679326938798.svg?token=exp=1679327844~hmac=683d30cc114a5ff3c841cca8421d252f'} onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteProduct}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default StockOut;
