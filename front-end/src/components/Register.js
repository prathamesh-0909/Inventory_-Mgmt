import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import '../styles/Register.css'

function Register(){
    let [RetailerName, setRetailerName] = useState([]);
    let [RetailerId, setRetailerId] = useState([]);
    let [Role, setRole] = useState([]);
    let [ContactNumber, setContactNumber] = useState([]);
    let [Password, setPassword] = useState([]);

    function Add(e){
        e.preventDefault()
        fetch('http://localhost:8000/addUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "RetailerName": `${RetailerName}`,
                "RetailerId": `${RetailerId}`,
                "Role": `${Role}`,
                "ContactNumber": `${ContactNumber}`,
                "Password": `${Password}`,
            })
        })
        .then(window.location.href = '/')
    }

    return(
        <div className='Register'>
            <div className='Header'>
                <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679704413352.svg?token=exp=1679705314~hmac=a98ade2f7ce814278fc4f94c7bf71cbc' width='30' alt='' style={{marginRight: "1rem"}}/>Register</div>
            </div>  
            <form className="row g-3" onSubmit={Add}>
                <div className="col-12">
                    <label htmlFor="Product" className="form-label">Retailer Name</label>
                    <input type="text" className="form-control" id="Product" placeholder="Enter the Name" style={{padding: '0.7rem'}} onChange={(e) => setRetailerName(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="Category" className="form-label">Retailer Id</label>
                    <input type="text" className="form-control" id="Product" placeholder="Enter Your Retailer Id..." style={{padding: '0.7rem'}} onChange={(e) => setRetailerId(e.target.value)}/>
                </div>
                <div className="col-5 Add CategoryAdd">
                    <label htmlFor="Category" className="form-label">Role</label>
                    <Autocomplete
                        disablePortal
                        id="ProductName"
                        onChange={(e) => {setRole(e.target.textContent)}}
                        options={[{label: 'Worker'},{label: 'Manager'},{label: 'Boss'}]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}/>}
                    />
                </div>
                <div className="col-7">
                    <label htmlFor="Category" className="form-label">Contact Number</label>
                    <input type="text" className="form-control" id="Product" placeholder="Enter your constact number" style={{padding: '0.7rem'}} onChange={(e) => setContactNumber(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="Category" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Product" placeholder="Enter the password" style={{padding: '0.7rem'}} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn" style={{background: '#017256', color: 'white', margin: '2rem 0'}}>Register</button>
            </form>
        </div>
    )
}

export default Register