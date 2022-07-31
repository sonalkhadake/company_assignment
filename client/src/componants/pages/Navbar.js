import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
  return (
    <>
     <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Coding assisment</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" >
                   
                    {!localStorage.getItem('token')?<form className="d-flex me-auto mb-2 mb-lg-0 ">
                            <Link className='btn btn-denger' to="/" role="button">LOGIN</Link>
                            <Link className='btn btn-denger' to="/register" role="button">REGISTER</Link> 
                        </form>:<div className="d-flex"> 
                            
                                <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} to="/home">HOME</Link>
                                <Link  className= "nav-link" to="/viewfile">VIEWFILE</Link>
                                <div className="logout">
                               <button onClick={handleLogout}  className="logoutbtn">LOGOUT</button>
                               </div>
                        </div>
                      }
                        
                      
                   </div>     
                    
                </div>
            </nav>
            {/* <Outlet /> */}
    </>
  );
};

export default Navbar;