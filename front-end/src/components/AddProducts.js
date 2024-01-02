import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import '../styles/AddProducts.css'

function AddProducts(){
    let [Categories, setCategories] = useState([]);
    let [ProductName, setProductName] = useState([]);
    let [Category, setCategory] = useState([]);

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

    function Add(e){
        e.preventDefault()
        fetch('http://localhost:8000/addProduct', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "ProductName": `${ProductName}`,
                "Category": `${Category}`,
                "inStock": `0`,
                "BuyingPrice": `00.00`,
                "SellingPrice": `00.00`,
            })
        })
        .then(window.location.href = '/Products')
    }

    return(
        <div className='AddProducts'>
            <div className='Header'>
                <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679508402160.svg?token=exp=1679509303~hmac=3ea85d6f2433ef92f3e0fc3a95e26187' width='30' alt='' style={{marginRight: "1rem"}}/>Add Product</div>
            </div>  
            <form onSubmit={Add}>
                <div className="mb-3 Add">
                    <label htmlFor="Product" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="Product" placeholder="Enter the Product name here..." style={{padding: '0.7rem'}} onChange={(e) => setProductName(e.target.value)}/>
                </div>
                <div className="CategoryAdd">
                    <label htmlFor="Category" className="form-label">Category</label>
                    <Autocomplete
                        disablePortal
                        id="Category"
                        onChange={(e) => setCategory(e.target.textContent)}
                        options={Categories}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}/>}
                    />
                </div>
                <button type="submit" className="btn" style={{background: '#017256', color: 'white', margin: '2rem 0'}}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProducts