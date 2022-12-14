import React, { useState, useEffect}from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

 function Login() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        "email":"",
        "password":""
    })
    /////
    const handlechange =(e)=>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:5000/api/login", credentials )
          .then((data) => {
            console.log(data.data);
            if (data.data.success === true) {
              localStorage.setItem("token", data.data.data);
              ////alert///
              Swal.fire({
                position: "center",
                icon: 'success',
                title: 'logged in successfully',
                showConfirmButton: false,
                timer: 1500
            })
              
              navigate("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <div class="container">
    <form onSubmit= {handleSubmit}>
    <h3>LOGIN INTO YOUR ACCOUNT</h3>
  <label>Email</label>
  <br/>
    <input  type="email"  value={credentials.email} name="email" placeholder="xxx@email.com" onChange={handlechange}/>
    <br/>
    <label>Password</label>
    <br/>
    <input type="password"   name="password" placeholder="enter your password" value={credentials.password} onChange={handlechange}/>
    <br/>
    <button type="submit">LOGIN</button>
    
    <div className="d-flex">
    <p>Need an Account?</p>
    <a href="/register">REGISTER HERE</a>
    </div>
    
    </form>
</div>
  )
}

export default Login
