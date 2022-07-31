
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './componants/pages/Navbar';

 import Home from './componants/pages/Home';
 import Register from './componants/pages/Register';
 import Login from './componants/pages/Login';
import Viewfile from './componants/pages/Viewfile';
import Nofile from './componants/pages/Nofile';



function App() {
  return (
    <div className="App">
   <BrowserRouter>
        <Navbar />
     
        <div className='App'>
        
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/viewfile" element={<Viewfile />} />
            <Route exact path="/nofile" element={< Nofile/>} />
            



          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

