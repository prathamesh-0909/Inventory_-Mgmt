import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css'
// import AddProducts from './AddProducts'

function Products(){
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

  function deleteProduct(e){
    const URL = `http://localhost:8000/deleteProduct/${e.target.alt}`
    fetch(URL, {
      method: 'DELETE',
    })
    .then(window.location.href = '/Products')
  }

    return (
      <div className='Products'>
        <div className='Header'>
          <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679321351604.svg?token=exp=1679322252~hmac=60974dc39c6b4c238b4bf00fed2fac31' width='25' alt='' style={{marginRight: "1rem"}}/>Products</div>
          <div className='Add-Filter'>
            <Link className='Filter' style={{visibility: 'hidden'}}>Filter<img src='https://cdn-icons-png.flaticon.com/512/6488/6488674.png' width="22" alt='' style={{marginLeft:"10px"}}/></Link>
            <Link to='/AddProduct' className='Add-item' style={{backgroundColor: "#017256", color: "white"}}>Add Product<img src='https://cdn-icons-png.flaticon.com/512/1828/1828925.png' width="15" alt='' style={{marginLeft:"10px", filter: "invert(100%)"}}/></Link>
          </div>
        </div>
        <div className='list-heading'>
          <div>No.</div>
          <div style={{textAlign: "start"}}>Product name</div>
          <div>category</div>
          <div>in-Stock</div>
          <div>Buying price</div>
          <div>Selling price</div>
          <div>Last Update</div>
          <div>Actions</div>
        </div>
        <div className="list">
          {products.map((element, i) => (
            <div className='list-column'>
              <div>{i + 1}</div>
              <div style={{textAlign: "start"}}>{element.ProductName}</div>
              <div>{element.Category}</div>
              <div>{element.inStock}</div>
              <div>{element.BuyingPrice}</div>
              <div>{element.SellingPrice}</div>
              <div>{element.updatedAt.split('T')[0]}<br/>{element.updatedAt.split('T')[1].split('.')[0]}</div>
              <div className='Action'>
                <Link to='/UpdateProduct' state={{value: element}}><img src='https://cdn-icons-png.flaticon.com/512/2951/2951136.png' alt='' width="25" style={{marginRight: "10px"}}  onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2951/2951136.png'}/></Link> 

                <Link><img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={element.ProductName} width="20"  onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteProduct}/></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Products;
