import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Customer.css'

function Customers() {
    let [Customers, setCustomers] = useState([]);
    let [Customer, setCustomer] = useState();
    let [contact, setContact] = useState();
    let [update1, setUpdate1] = useState([]);
    let [update2, setUpdate2] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/Customer`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((json) => {
            setCustomers(json)
        })
    }, [])

    function AddCustomer(e) {
        e.preventDefault()
        fetch('http://localhost:8000/addCustomer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "Customer": `${Customer}`,
                "Contact": `${contact}`,
            })
        })
            .then(document.documentElement.style.setProperty('--displayAddC', 'none'))
            .then(window.location.href = '/Customers')
    }

    function deleteCustomer(e) {
        const URL = `http://localhost:8000/deleteCustomer/${e.target.alt}`
        fetch(URL, {
            method: 'DELETE',
        })
            .then(window.location.href = '/Customers')
    }

    function UpdateCustomer(e) {
        e.preventDefault()
        fetch(`http://localhost:8000/updateCustomer/${update1}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "Customer": `${Customer}`,
                "Contact": `${contact}`,
            })
        })
            .then(document.documentElement.style.setProperty('--displayUpdateC', 'none'))
            .then(window.location.href = '/Customers')
    }

    return (
        <div className='Customers'>
            <div className='Header'>
                <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413474378.svg?token=exp=1679414375~hmac=6711997f218f020aa8895c37fe44ec4b' width='30' alt='' style={{ marginRight: "1rem" }} />Customers</div>
                <div className='Customer'>
                    <div className='Add-Customer-Button' onClick={() => document.documentElement.style.setProperty('--displayAddC', 'flex')}>Add Customer<img src='https://cdn-icons-png.flaticon.com/512/1828/1828925.png' width="15" alt='' style={{ marginLeft: "10px", filter: "invert(100%)" }} /></div>
                </div>
            </div>
            <form className="Add-Customer" onSubmit={AddCustomer}>
                <input type="text" className="form-control" placeholder='Customer Name' onChange={(e) => setCustomer(e.target.value)} required />
                <input type="tel" className="form-control" placeholder='Contact Number' onChange={(e) => setContact(e.target.value)} required />
                <button className="btn btn-outline-secondary" type='submit'>Add</button>
                <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('--displayAddC', 'none')}>Cancel</button>
            </form>
            <form className="Update-Customer" onSubmit={UpdateCustomer}>
                <input type="text" className="form-control" placeholder='Customer Name' defaultValue={`${update1}`} onChange={(e) => setCustomer(e.target.value)} required />
                <input type="tel" className="form-control" placeholder='Contact Number' defaultValue={`${update2}`} onChange={(e) => setContact(e.target.value)} required />
                {/* <input type="text" className="form-control" placeholder="Enter the Customer name here to Update..." defaultValue={`${update}`} onChange={(e) => setCustomer(e.target.value)} required/> */}
                <button className="btn btn-outline-secondary" type='submit'>Update</button>
                <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('--displayUpdateCS', 'none')}>Cancel</button>
            </form>
            <div className='Customers-heading'>
                <div>No.</div>
                <div style={{ textAlign: "start" }}>Customer</div>
                <div>Contact Number</div>
                <div>Actions</div>
            </div>
            <div className="Customers-list">
                {Customers.map((element, i) => (
                    <div className='Customers-column'>
                        <div>{i + 1}</div>
                        <div style={{ textAlign: "start" }}>{element.Customer}</div>
                        <div>{element.Contact}</div>
                        <div className='Action'>
                            <Link><img src='https://cdn-icons-png.flaticon.com/512/2951/2951136.png' alt={`${element.Customer}`} width="25" id={`${element.Contact}`} style={{ marginRight: "10px" }} onMouseOut={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2951/2951136.png'} onClick={(e) => { document.documentElement.style.setProperty('--displayUpdateC', 'flex'); setUpdate1(e.target.alt); setUpdate2(e.target.id); setCustomer(e.target.alt); setContact(e.target.id);}} /></Link>

                            <Link><img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={`${element.Customer}`} width="20"  onMouseOut={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteCustomer} /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Customers;
