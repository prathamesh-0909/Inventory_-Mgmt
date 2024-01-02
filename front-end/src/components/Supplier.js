import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Supplier.css'

function Suppliers() {
    let [Suppliers, setSuppliers] = useState([]);
    let [supplier, setSupplier] = useState();
    let [contact, setContact] = useState();
    let [update1, setUpdate1] = useState([]);
    let [update2, setUpdate2] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/Supplier`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((json) => {
            setSuppliers(json)
        })
    }, [])

    function AddSupplier(e) {
        e.preventDefault()
        fetch('http://localhost:8000/addSupplier', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "Supplier": `${supplier}`,
                "Contact": `${contact}`,
            })
        })
            .then(document.documentElement.style.setProperty('--displayAddS', 'none'))
            .then(window.location.href = '/Suppliers')
    }

    function deleteSupplier(e) {
        const URL = `http://localhost:8000/deleteSupplier/${e.target.alt}`
        fetch(URL, {
            method: 'DELETE',
        })
            .then(window.location.href = '/Suppliers')
    }

    function UpdateSupplier(e) {
        e.preventDefault()
        fetch(`http://localhost:8000/updateSupplier/${update1}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                "Supplier": `${supplier}`,
                "Contact": `${contact}`,
            })
        })
        .then(document.documentElement.style.setProperty('--displayUpdateS', 'none'))
        .then(window.location.href = '/Suppliers')
    }

    return (
        <div className='Suppliers'>
            <div className='Header'>
                <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413474378.svg?token=exp=1679414375~hmac=6711997f218f020aa8895c37fe44ec4b' width='30' alt='' style={{ marginRight: "1rem" }} />Suppliers</div>
                <div className='Supplier'>
                    <div className='Add-Supplier-Button' onClick={() => document.documentElement.style.setProperty('--displayAddS', 'flex')}>Add Supplier<img src='https://cdn-icons-png.flaticon.com/512/1828/1828925.png' width="15" alt='' style={{ marginLeft: "10px", filter: "invert(100%)" }} /></div>
                </div>
            </div>
            <form className="Add-Supplier" onSubmit={AddSupplier}>
                <input type="text" className="form-control" placeholder='Supplier Name' onChange={(e) => setSupplier(e.target.value)} required />
                <input type="tel" className="form-control" placeholder='Contact Number' onChange={(e) => setContact(e.target.value)} required />
                <button className="btn btn-outline-secondary" type='submit'>Add</button>
                <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('--displayAddS', 'none')}>Cancel</button>
            </form>
            <form className="Update-Supplier" onSubmit={UpdateSupplier}>
                <input type="text" className="form-control" placeholder='Supplier Name' defaultValue={`${update1}`} onChange={(e) => setSupplier(e.target.value)} required />
                <input type="tel" className="form-control" placeholder='Contact Number' defaultValue={`${update2}`} onChange={(e) => setContact(e.target.value)} required />
                {/* <input type="text" className="form-control" placeholder="Enter the Supplier name here to Update..." defaultValue={`${update}`} onChange={(e) => setSupplier(e.target.value)} required/> */}
                <button className="btn btn-outline-secondary" type='submit'>Update</button>
                <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('SS', 'none')}>Cancel</button>
            </form>
            <div className='Suppliers-heading'>
                <div>No.</div>
                <div style={{ textAlign: "start" }}>Supplier</div>
                <div>Contact Number</div>
                <div>Actions</div>
            </div>
            <div className="Suppliers-list">
                {Suppliers.map((element, i) => (
                    <div className='Suppliers-column'>
                        <div>{i + 1}</div>
                        <div style={{ textAlign: "start" }}>{element.Supplier}</div>
                        <div>{element.Contact}</div>
                        <div className='Action'>
                            <Link><img src='https://cdn-icons-png.flaticon.com/512/2951/2951136.png' alt={`${element.Supplier}`} width="25" id={`${element.Contact}`} style={{ marginRight: "10px" }} onMouseOut={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2951/2951136.png'} onClick={(e) => { document.documentElement.style.setProperty('SS', 'flex'); setUpdate1(e.target.alt); setUpdate2(e.target.id); setSupplier(e.target.alt); setContact(e.target.id);}} /></Link>
                            <Link><img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={`${element.Supplier}`} width="20" onMouseOut={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteSupplier} /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Suppliers;
