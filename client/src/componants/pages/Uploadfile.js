import React from 'react'

 function Uploadfile() {
  return (
    <div className='filesupload'>

    <form  className='container'>
      <h3>File upload</h3>

    <label  className='a1'>Title</label>
  <input className="form-control" type="text" name="title" placeholder="enter title"/>

  <label  className='a1'>Description</label>
  <input className="form-control" type="text" name="description" placeholder="enter description"/>
  <label  className='a1'>Upload File</label>
  <input className="form-control" type="file" name="file"/>
  
  <button className="btn btn-dark" type="submit">Upload</button>
  <div>
    <p>back to the home page</p>
  <a href="/">Home page</a>
  </div>
  
  </form>        
    </div>
  )
}
export default Uploadfile