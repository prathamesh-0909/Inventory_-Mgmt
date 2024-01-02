import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/UpdateProduct.css'

function UpdateProduct(){
    const location = useLocation()
    let [Categories, setCategories] = useState([]);
    let [ProductName, setProductName] = useState(location.state.value.ProductName);
    let [Category, setCategory] = useState(location.state.value.Category);
    let [inStock, setInStock] = useState(location.state.value.inStock);
    let [BuyingPrice, setBuyingPrice] = useState(location.state.value.BuyingPrice);
    let [SellingPrice, setSellingPrice] = useState(location.state.value.SellingPrice);

    useEffect(() => {
        fetch(`http://localhost:8000/category`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((json) => {
            let temp = json.map((e) => (
                {label: e.category}
            ))
            setCategories(temp)
        })
    },[])

    function Update(e){
        e.preventDefault()
        fetch(`http://localhost:8000/updateProduct/${location.state.value._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "ProductName": `${ProductName}`,
                "Category": `${Category}`,
                "inStock": `${inStock}`,
                "BuyingPrice": `${BuyingPrice}`,
                "SellingPrice": `${SellingPrice}`
            })
        })
        .then(window.location.href = '/Products')
    }

    return(
        <div className='UpdateProduct'>
            <div className='Header'>
                <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679576110725.svg?token=exp=1679577011~hmac=af4e47a69b3187815090842f3b23ad67' width='40' alt='' style={{marginRight: "1rem"}}/>Update Product</div>
            </div>  
            <form onSubmit={Update} className="row g-3">
                <div className="Puchase-ProductName update-Category">
                    <label htmlFor="Product" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="Product" style={{padding: '0.7rem'}} onChange={(e) => setProductName(e.target.value)} defaultValue={location.state.value.ProductName}/>
                </div>
                <div className="CategoryAdd update-Category">
                    <label htmlFor="Category" className="form-label">Category</label>
                    <Autocomplete
                        disablePortal
                        id="Category"
                        defaultValue={location.state.value.Category}
                        onChange={(e) => setCategory(e.target.textContent)}
                        options={Categories}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}/>}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="Quantity" className="form-label">Quantity</label>
                    <input type="text" className="form-control" defaultValue={location.state.value.inStock} onChange={(e) => setInStock(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="BuyingPrice" className="form-label">Buying Price</label>
                    <input type="number" className="form-control" id="BuyingPrice" defaultValue={location.state.value.BuyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} disabled/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="SellingPrice" className="form-label">Selling Price</label>
                    <input type="number" className="form-control" id="SellingPrice" defaultValue={location.state.value.SellingPrice} onChange={(e) => setSellingPrice(e.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn" style={{background: '#017256', color: 'white', margin: '1rem 0'}}>Update</button>
                </div>
            </form>   
        </div>
    )
}

export default UpdateProduct