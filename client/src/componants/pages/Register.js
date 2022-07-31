import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Swal from 'sweetalert2'
function Register() {
  const navigate = useNavigate()
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: ""
  })


  //////
  const handlechange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", userDetail)
      .then((data) => {
        console.log(data.data.createUser);
        if (data.data.message === "user is created successfully") {

          Swal.fire({
            position: "center",
            icon: 'success',
            title: 'user registered successfully',
            showConfirmButton: false,
            timer: 1500
          })


          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <h3>REGISTER YOUR ACCOUNT</h3>
        <label >Name</label>
        <input type="text" value={userDetail.name} name='name' placeholder="Enter your name" onChange={handlechange} />
        <label >Email</label>
        <input type="email" name='email' value={userDetail.email} placeholder="xxx@email.com" onChange={handlechange} />

        <label >Password</label>
        <input type="password" name='password' value={userDetail.password} placeholder="enter your password" onChange={handlechange} />


        <button type="submit">REGISTER</button>
        <div className="d-flex">
          <p>already user?</p>
          <Link to="/login">LOGIN HERE</Link>
        </div>


      </form>
    </div>
  )
}
export default Register
