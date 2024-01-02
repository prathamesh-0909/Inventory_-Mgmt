import React, { PureComponent } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import '../styles/Website.css'
import Purchase from './Purchase';
import Dashboard from './Dashboard';
import Products from './Products';
import Categories from './Categories';
import Sales from './Sales';
import Suppliers from './Supplier';
import AddProducts from './AddProducts'
import UpdateProduct from './UpdateProduct';
import Customers from './Customer';
import Users from './User';
import Register from './Register';
import StockIn from './StockIn';
import StockOut from './StockOut';
import LowStock from './LowStock';
import OutOfStock from './OutOfStock';

class Website extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout(){
    localStorage.setItem('autentication', false)
    window.location.href = '/'
  }

  render() {
    return (
      <BrowserRouter>
        <div className='Website-body'>

          <div className='navbar'>
            <div className='website-name'>E-Inventory.</div>
            <nav>
              <Link to='/'><img src='https://cdn-icons-png.flaticon.com/512/7511/7511679.png' width='25' alt=''/>Dashboard</Link>
              <Link to='/Products'><img src='https://cdn-icons-png.flaticon.com/512/3134/3134338.png' width='25' alt=''/>Products</Link>
              <Link to='/Categories'><img src='https://cdn-icons-png.flaticon.com/512/3405/3405802.png' width='25' alt=''/>Categories</Link>
              <Link to='/Sales'><img src='https://cdn-icons-png.flaticon.com/512/8035/8035123.png' width='25' alt=''/>Sales</Link>
              <Link to='/Purchase'><img src='https://cdn-icons-png.flaticon.com/512/2211/2211060.png' width='25' alt=''/>Purchase</Link>
              <Link to='/Suppliers'><img src='https://cdn-icons-png.flaticon.com/512/535/535712.png' width='25' alt=''/>Supplier</Link>
              <Link to='/Customers'><img src='https://cdn-icons-png.flaticon.com/512/10139/10139538.png' width='25' alt=''/>Customer</Link>
              <Link to='/Users'><img src='https://cdn-icons-png.flaticon.com/512/552/552721.png' width='25' alt=''/>Users</Link>
            </nav>
          </div>

          <div className='header-section'>
            <header>
              <div className='search'>
                <input type='text' id='search' placeholder='Search your products here...'/>
                <label htmlFor='search'><img src='https://cdn-icons-png.flaticon.com/512/149/149852.png' width='17' alt=''/></label>
              </div>
              <div className='user'>
                <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' width='40' alt=''/>
                <div className='user-name-role'>
                  <div style={{fontSize: '1.2em'}}>{localStorage.getItem("name")}</div>
                  <div style={{fontSize: '0.7em'}}>{localStorage.getItem("role")}</div>
                </div>
                <img src='https://cdn-icons-png.flaticon.com/512/4436/4436954.png' style={{marginLeft: '1rem'}} title='LogOut' onClick={this.logout} alt=''/>
              </div>
            </header>

            <section>
                <Routes>
                  <Route path='/' Component={Dashboard}/>
                  <Route path='/Products' Component={Products}/>
                  <Route path='/purchase' Component={Purchase}/>
                  <Route path='/categories' Component={Categories}/>
                  <Route path='/sales' Component={Sales}/>
                  <Route path='/Suppliers' Component={Suppliers}/>
                  <Route path='/Customers' Component={Customers}/>
                  <Route path='/AddProduct' Component={AddProducts}/>
                  <Route path='/UpdateProduct' Component={UpdateProduct}/>
                  <Route path='/Users' Component={Users}/>
                  <Route path='/Register' Component={Register}/>
                  <Route path='/StockIn' Component={StockIn}/>
                  <Route path='/StockOut' Component={StockOut}/>
                  <Route path='/LowStock' Component={LowStock}/>
                  <Route path='/OutOfStock' Component={OutOfStock}/>
                </Routes>
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Website;
