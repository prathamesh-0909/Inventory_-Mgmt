import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import '../styles/Sales.css'

function Sales(){
  const location = useLocation()

  let [Categories, setCategories] = useState([]);
  let [Copy, setCopy] = useState([]);
  let [Customers, setCustomers] = useState([]);
  let [ProductName, setProductName] = useState([]);
  let [Category, setCategory] = useState([]);
  let [Customer, setCustomer] = useState([]);
  let [Price, setPrice] = useState('00.00');
  let [Total, setTotal] = useState('00.00');
  let [Quantity, setQuantity] = useState([]);
  let products = location.state === null ? [] : location.state.Products !== null ? location.state.Products : []

  let ContactNumber = useRef(null)
  let ProductN = useRef(null)
  let inStock = useRef(null)
  // let inStock = useRef(null)
  // let Buy = useRef(null)
  let Sell = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8000/products`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
        let temp = json.map((e) => (
          {label: e.ProductName, Category: e.Category, inStock: e.inStock, BuyingPrice: e.BuyingPrice, SellingPrice: e.SellingPrice}
        ))
        setCategories(temp.filter((e) => (e.inStock !== '0')))
        setCopy(json)
    })
    fetch(`http://localhost:8000/Customer`, {
            method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      let temp = json.map((e) => (
        {label: e.Customer, Contact: e.Contact}
      ))
      setCustomers(temp)
    })
  },[])

  function FillCustomer(e){
    setCustomer(e.target.textContent)
    let temp = Customers.filter((element) => (element.label === `${e.target.textContent}`))
    try{
      ContactNumber.current.value = temp[0].Contact;
      ContactNumber.current.disabled = true;
    }catch{
      ContactNumber.current.value = '';
      ContactNumber.current.disabled = false;
    }
  }
  
  function FillProduct(e){
    setProductName(e.target.textContent)
    let temp = Categories.filter((element) => (element.label === `${e.target.textContent}`))

    try{
      inStock.current.value = `1`;
      Sell.current.value = temp[0].SellingPrice;
      setCategory(temp[0].Category);
      setQuantity(temp[0].inStock);
      setPrice(temp[0].SellingPrice)
    }catch{
      setPrice('00.00')
    }
    Sell.current.disabled = true;
  }

  function Sale(e){
    e.preventDefault()
    products.forEach((e) => {
      fetch('http://localhost:8000/StockOut', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        },
        body: JSON.stringify({
          "ProductName": `${e.ProductName}`,
          "Category": `${e.Category}`,
          "Customer": `${Customer}`,
          "Quantity": `${e.Quantity}`,
          "SellingPrice": `${e.Price}`,
        })
      })

      fetch(`http://localhost:8000/updateProduct/${Copy.filter((element) => (element.ProductName === `${e.ProductName}`))[0]._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify({
          "inStock": `${parseInt(e.ActualQuantity) - parseInt(e.Quantity)}`,
        })
      })
      .then(window.location.href = '/Products')
    })
  }
  
  function deleteProduct(e){
    products = products.filter((element) => (element.id !== e.target.alt))
    let sum = 0
    products.forEach(e => {
      sum += parseFloat(e.Price)
    });
    toString(sum).includes('.') ? setTotal(sum) : setTotal(`${sum}.00`)
    navigate('/Sales', {state: {Products: products}})
  }

  function price(){
    isNaN(parseInt(inStock.current.value) * parseFloat(Price)) ? Sell.current.value = Price : `${parseInt(inStock.current.value) * parseFloat(Price)}`.includes('.') ? Sell.current.value = `${parseInt(inStock.current.value) * parseFloat(Price)}` : Sell.current.value = `${parseInt(inStock.current.value) * parseFloat(Price)}.00`
  }

  function Add(){
    if(document.querySelectorAll(`div > input`)[3].value === ''){
      document.querySelectorAll(`div > input`)[3].placeholder = 'please select the product'
      return
    }
    document.querySelectorAll(`div > input`)[3].placeholder = ''
    products.push({
      ProductName: `${ProductName}`, Category: `${Category}`, Quantity: `${inStock.current.value}`, ActualQuantity: `${Quantity}`, Price: `${Sell.current.value}`, id: `${Object.keys(products).length}`
    })
    let sum = 0
    products.forEach(e => {
      sum += parseFloat(e.Price)
    });
    toString(sum).includes('.') ? setTotal(sum) : setTotal(`${sum}.00`)
    navigate('/Sales', {state: {Products: products}})
  }

    return (
      <div className='Sales'>
        <div className='Header'>
          <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413799575.svg?token=exp=1679414700~hmac=1c532b14a821aeddbe8ae9eb39b1c545' width='30' alt='' style={{marginRight: "1rem"}}/>Sales</div>
        </div>
        <form className="row g-3" onSubmit={Sale}>
        <div className="Puchase-Customer col-md-6">
          <label htmlFor="Customer" className="form-label">Customer</label>
          <Autocomplete
            disablePortal
            id="Customer"
            onChange={FillCustomer}
            options={Customers}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params}/>}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
          <input type='tel' className="form-control" id="ContactNumber" ref={ContactNumber} disabled = {false}/>
        </div>
        <div className='sale-box row g-3'>
          <div className="Puchase-ProductName col-md-4">
            <label htmlFor="ProductName" className="form-label">Product Name</label>
            <Autocomplete
              disablePortal
              id="ProductName"
              ref={ProductN}
              onChange={FillProduct}
              options={Categories}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params}/>}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="Quantity" className="form-label">Quantity</label>
            <div style={{display: "grid", gridTemplateColumns: "1fr 0fr"}}>
              <input type="text" className="form-control" style={{borderRadius: "0.375rem"}} defaultValue='0' ref={inStock} onChange={price}/>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="SellingPrice" className="form-label">Price</label>
            <input type="number" step="0.01" className="form-control" id="SellingPrice" ref={Sell} defaultValue='00.00'/>
          </div>
          <div className="col-md-1">
            <label className="form-label" style={{color: 'transparent'}}>.</label>
            <input type="button" className="btn form-control" style={{background: '#017256', color: 'white', margin: '0rem 0'}} value='Add' onClick={Add}/>
          </div>
          <div className='Sell-heading'>
            <div>No.</div>
            <div style={{textAlign: "start"}}>Product name</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Actions</div>
          </div>
          <div className="list" style={{marginTop: '0', maxHeight: '9rem'}}>
            {products.map((element, i) => (
                <div className='Sale-column'>
                  <div>{i + 1}</div>
                  <div style={{textAlign: "start"}}>{element.ProductName}</div>
                  <div>{element.Quantity}</div>
                  <div>{element.Price}</div>
                  <div className='Action'>
                    <img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={i} width="20" onMouseOver = {(e) => e.target.src = 'https://cdn-user-icons.flaticon.com/96885/96885753/1679326938798.svg?token=exp=1679327844~hmac=683d30cc114a5ff3c841cca8421d252f'} onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteProduct}/>
                  </div>
                </div>
              ))}
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '5fr 1fr', margin: '2rem 0 0 0', fontSize: '18px'}}>
            <span>TOTAL: ₹ {Total}</span>
            <input type="submit" className="btn form-control" style={{background: '#017256', color: 'white'}} value='Sell'/>
          </div>
        </div>
      </form>   
      </div>
    );
}

export default Sales;
