import React, { useEffect, useRef, useState } from 'react';
import '../styles/Purchase.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Purchase(){
  let [Categories, setCategories] = useState([]);
  let [Copy, setCopy] = useState([]);
  let [Suppliers, setSuppliers] = useState([]);
  let [ProductName, setProductName] = useState([]);
  let [Supplier, setSupplier] = useState([]);
  let [Total, setTotal] = useState('00.00');

  let ContactNumber = useRef(null)
  let Category = useRef(null)
  let inStock1 = useRef(null)
  let inStock2 = useRef(null)
  let Buy = useRef(null)
  let Sell = useRef(null)

  useEffect(() => {
    fetch(`http://localhost:8000/products`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
        let temp = json.map((e) => (
          {label: e.ProductName, Category: e.Category, inStock: e.inStock, BuyingPrice: e.BuyingPrice, SellingPrice: e.SellingPrice}
        ))
        setCategories(temp)
        setCopy(json)
    })
    fetch(`http://localhost:8000/Supplier`, {
            method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      let temp = json.map((e) => (
        {label: e.Supplier, Contact: e.Contact}
      ))
      setSuppliers(temp)
    })
  },[])

  function FillSupplier(e){
    setSupplier(e.target.textContent)
    let temp = Suppliers.filter((element) => (element.label === `${e.target.textContent}`))
    ContactNumber.current.value = temp[0].Contact;
    ContactNumber.current.disabled = true;
  }
  
  function FillProduct(e){
    setProductName(e.target.textContent)
    let temp = Categories.filter((element) => (element.label === `${e.target.textContent}`))
    Category.current.value = temp[0].Category;
    Category.current.disabled = true;
    inStock1.current.value = `${temp[0].inStock} +`;
    Buy.current.value = temp[0].BuyingPrice;
    Sell.current.value = temp[0].SellingPrice;
    console.log(temp[0]);
  }

  function Update(e){
    e.preventDefault()
    fetch('http://localhost:8000/StockIn', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      body: JSON.stringify({
        "ProductName": `${ProductName}`,
        "Category": `${Category.current.value}`,
        "Supplier": `${Supplier}`,
        "Quantity": `${inStock2.current.value}`,
        "BuyingPrice": `${Buy.current.value}`,
      })
    })

    fetch(`http://localhost:8000/updateProduct/${Copy.filter((element) => (element.ProductName === `${ProductName}`))[0]._id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        },
        body: JSON.stringify({
            "ProductName": `${ProductName}`,
            "Category": `${Category.current.value}`,
            "inStock": `${parseInt(inStock1.current.value) + parseInt(inStock2.current.value)}`,
            "BuyingPrice": `${Buy.current.value}`,
            "SellingPrice": `${Sell.current.value}`
        })
    })
    .then(window.location.href = '/Products')
  }

  function total(){
    isNaN(parseInt(inStock2.current.value) * parseFloat(Buy.current.value)) ? setTotal('00.00') : `${parseInt(inStock2.current.value) * parseFloat(Buy.current.value)}`.includes('.') ? setTotal(`${parseInt(inStock2.current.value) * parseFloat(Buy.current.value)}`) : setTotal(`${parseInt(inStock2.current.value) * parseFloat(Buy.current.value)}.00`) 
  }

  return (
    <div className='Purchase'>
      <div className='Header'>
        <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413129154.svg?token=exp=1679414029~hmac=6e28e0d3e33ee2c1b4c69a1a5ecdc4e1' width='30' alt='' style={{marginRight: "1rem"}}/>Purchase</div>
      </div>  
      <form className="row g-3" onSubmit={Update}>
        <div className="Puchase-Supplier col-md-6">
          <label htmlFor="Supplier" className="form-label">Supplier</label>
          <Autocomplete
            disablePortal
            id="Supplier"
            onChange={FillSupplier}
            options={Suppliers}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params}/>}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
          <input type='tel' className="form-control" id="ContactNumber" ref={ContactNumber} disabled = {false}/>
        </div>
        <div className="Puchase-ProductName">
          <label htmlFor="ProductName" className="form-label">Product Name</label>
          <Autocomplete
            disablePortal
            id="ProductName"
            onChange={FillProduct}
            options={Categories}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params}/>}
          />
        </div>
        <div className='Puchase-Category'>
          <label htmlFor="Category">Category</label>
          <input type="text" className="form-control" id="Category" ref={Category} disabled = {false}/>
        </div>
        <div className="col-md-4">
          <label htmlFor="Quantity" className="form-label">Quantity</label>
          <div style={{display: "grid", gridTemplateColumns: "1fr 5fr"}}>
            <input type="text" className="form-control" defaultValue='0 +' style={{borderRadius: "0.375rem 0 0 0.375rem"}} ref={inStock1} disabled/>
            <input type="text" className="form-control" style={{borderRadius: "0 0.375rem 0.375rem 0"}} defaultValue='0' ref={inStock2} onChange={total}/>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="BuyingPrice" className="form-label">Buying Price</label>
          <input type="number" step="0.01" className="form-control" id="BuyingPrice" ref={Buy} defaultValue='00.00' onChange={total}/>
        </div>
        <div className="col-md-4">
          <label htmlFor="SellingPrice" className="form-label">Selling Price</label>
          <input type="number" step="0.01" className="form-control" id="SellingPrice" ref={Sell} defaultValue='00.00'/>
        </div>
        <div className="col-12">
          <button type="submit" className="btn" style={{background: '#017256', color: 'white', margin: '1.5rem 0', padding: '0.5rem 1rem'}}>Pay ₹ {Total}</button>
        </div>
      </form>   
    </div>
  );
}

export default Purchase;
