import React, { PureComponent} from 'react';
import '../styles/Login.css';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        RetailerId: '',
        Password:'',
        Display: { errorId: 'hidden', errorPassword: 'hidden', redirect: '/website'},
    };
    this.Login = this.Login.bind(this);
  }

  Login(e){
    e.preventDefault();
    const URL = `http://localhost:8000/login/${this.state.RetailerId}&${this.state.Password}`;
    fetch(URL, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
        this.setState({Display: json})
        if(json['errorId'] === 'hidden' && json['errorPassword'] === 'hidden'){
            localStorage.setItem("autentication", true);
            window.location.href = '/';
            localStorage.setItem("name", json['retailer'][0].RetailerName)
            localStorage.setItem("role", json['retailer'][0].Role)
        }
    })
  }

  render() {
    return (
        <div className='login-page'>
            <div className='login'>
                <h1>E-Inventory</h1>
                <h6>Online inventory management system</h6>
                <form className='login-form' onSubmit={this.Login}>
                    <h1>Login</h1>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="enter your Reataialer Id" onChange={(e) => this.setState({RetailerId: `${e.target.value}`})}/>
                        <label htmlFor="floatingInput">Retailer Id</label>
                        <p style={{visibility: `${this.state.Display['errorId']}`}}>Retailer Id not found...!!</p>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="enter your Password" autoComplete="on" onChange={(e) => this.setState({Password: `${e.target.value}`})}/>
                        <label htmlFor="floatingPassword">Password</label>
                        <p style={{visibility: `${this.state.Display['errorPassword']}`}}>Invalid Password !!!</p>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
  }
}

export default Login;
