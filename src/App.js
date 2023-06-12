import Login from './LoginComponents/Login';
import Register from './LoginComponents/Register';
import {BrowserRouter, Routes, Route,Link} from "react-router-dom"
import Dashboard from './Components/Dashboard';



function App() {
  
  return (
    <div className="App">
    {/* <Register /> */}
    <BrowserRouter>
        <Routes>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
        </Routes>
        {/* <button onClick={()=>{window.location.href="/login"}} >Login</button> 
        <button onClick={()=>{window.location.href="/register"}} >Register</button>  */}
        </BrowserRouter>
    </div>

  );
}

export default App;
