import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Categories.css'

function Categories(){
  let [Categories, setCategories] = useState([]);
  let [Category, setCategory] = useState();
  let [inStock, setInStock] = useState([]);
  let [update, setUpdate] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:8000/category`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
        setCategories(json)
    })
    fetch(`http://localhost:8000/products`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      setInStock(json)
    })
  }, [])

  function AddCategory(e){
    e.preventDefault()
    fetch('http://localhost:8000/addCategory', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      body: JSON.stringify({
          "category": `${Category}`,
      })
    })
    .then(document.documentElement.style.setProperty('--displayAdd', 'none'))
    .then(window.location.href = '/categories')
  }

  function deleteCategory(e){
    const URL = `http://localhost:8000/deleteCategory/${e.target.alt}`
    fetch(URL, {
      method: 'DELETE',
    })
    .then(window.location.href = '/categories')
  }
  
  function UpdateCategory(e){
    e.preventDefault()
    fetch(`http://localhost:8000/updateCategory/${update}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      body: JSON.stringify({
          "category": `${Category}`
      })
    })
    .then(document.documentElement.style.setProperty('--displayUpdate', 'none'))
    .then(window.location.href = '/categories')
  }

    return (
      <div className='Categories'>
        <div className='Header'>
          <div className='Name'><img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413474378.svg?token=exp=1679414375~hmac=6711997f218f020aa8895c37fe44ec4b' width='30' alt='' style={{marginRight: "1rem"}}/>Categories</div>
          <div className='Category'>
            <div className='Add-Category-Button' onClick={() => document.documentElement.style.setProperty('--displayAdd', 'flex')}>Add Category<img src='https://cdn-icons-png.flaticon.com/512/1828/1828925.png' width="15" alt='' style={{marginLeft:"10px", filter: "invert(100%)"}}/></div>
          </div>
        </div>
        <form className="Add-Category" onSubmit={AddCategory}>
          <input type="text" className="form-control" placeholder="Enter the category name here to add..."  onChange={(e) => setCategory(e.target.value)} required/>
          <button className="btn btn-outline-secondary" type='submit'>Add</button>
          <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('--displayAdd', 'none')}>Cancel</button>
        </form>
        <form className="Update-Category" onSubmit={UpdateCategory}>
          <input type="text" className="form-control" placeholder="Enter the category name here to Update..." defaultValue={`${update}`} onChange={(e) => setCategory(e.target.value)} required/>
          <button className="btn btn-outline-secondary" type='submit'>Update</button>
          <button className="btn btn-outline-secondary" onClick={() => document.documentElement.style.setProperty('--displayUpdate', 'none')}>Cancel</button>
        </form>
        <div className='Categories-heading'>
          <div>No.</div>
          <div style={{textAlign: "start"}}>Category</div>
          <div>Products in-Stock</div>
          <div>Actions</div>
        </div>
        <div className="Categories-list">
          {Categories.map((element, i) => (
            <div className='Categories-column'>
              <div>{i + 1}</div>
              <div style={{textAlign: "start"}}>{element.category}</div>
              {/* <div>{Object.keys(inStock.filter((e) => {console.log(element.category)}))}</div> */}
              <div>{Object.keys(inStock.filter((e) => {return e.Category.includes(`${element.category}`)})).length}</div>
              <div className='Action'>
                <Link><img src='https://cdn-icons-png.flaticon.com/512/2951/2951136.png' alt={`${element.category}`} width="25" style={{marginRight: "10px"}} onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2951/2951136.png'} onClick={(e) => {document.documentElement.style.setProperty('--displayUpdate', 'flex'); setUpdate(e.target.alt); setCategory(e.target.alt)}}/></Link>
                <Link><img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt={`${element.category}`} width="20" onMouseOut = {(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} onClick={deleteCategory}/></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Categories;
