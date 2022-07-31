import React, { useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"


function Home() {
  let navigate = useNavigate();
  const [singleFile, setsingleFile] = useState([]);

  const handlechange = (e) => {
    setsingleFile(e.target.files[0]);
  }

  ////api call////
  const handleSubmit = (e) => {
    var config = {
      headers: {
        //   we are finding the token from localstorage
        Authorization: localStorage.getItem("token"),
      }
    };
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", singleFile);

    axios

      .post("http://localhost:5000/api/upload", formData, config)

      .then((data) => {

        console.log(data.formData);
        if (data.data.message === "File Uploaded Successfully") {
          Swal.fire({
            position: "center",
            icon: 'success',
            title: 'file uploaded successfully',
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/viewfile");
        }else{
          if(data.data.success===false){
          window.alert("please chosse file to upload")
          }
        }

      })

      .catch((error) => {

        console.log(error);

      });

  }


  return (
    <div >
      <h1 className='head'>File Uploading and Downloading</h1>
      <div className='filesupload'>
        <form onSubmit={handleSubmit} className='container'>
          <h3>File upload</h3>
          <input type="file" onChange={handlechange} name="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default Home