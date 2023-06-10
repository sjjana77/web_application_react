import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../Images/logo.png'
import './Register.css'
import Login from './Login';
import {Routes, Route} from "react-router-dom";

function Register() {
    const [regdata,setregdata] = useState({
        fname:'',
        lname:'',
        email:'',
        phn:'',
        tenantid:'',
        company_name:''
    })
    const [status,setstatus]=useState('');
    
    const handleChange = (e)=>{
        setregdata({...regdata,[e.target.name]:e.target.value});
    }

    const registerForm = ()=>{
        const sendData = {
            fname:regdata.fname,
            lname:regdata.lname,
            email:regdata.email,
            phn:regdata.phn,
            company_name:regdata.company_name,
            tenantid:regdata.tenantid
        }
        
        setregdata({
            fname:'',
            lname:'',
            email:'',
            phn:'',
            tenantid:'',
            company_name:''
        })

        axios.post('http://localhost/react/register.php',sendData)
        .then((result)=>{
            if(result.data.status=='Invald'){
                setstatus("Error Adding User");
                setTimeout(()=>{
                    setstatus("");
                },3000)
            }
            else{
                setstatus("Successfully Added");
                setTimeout(()=>{
                    setstatus("");
                },3000)
            }
        })
    }



  return (
    <div>
        <br />
        <span className='reg'>Register</span> 
        <Routes>
        <Route path ="/login" element={<Login/>}/>
        {/* <Route path ="/" element={<App/>}/> */}
        </Routes>
        <button className='btn btn-primary nav-btn' onClick={()=>{window.location.href="/login"}} >Login</button> 
        <button className='btn btn-primary nav-btn' onClick={()=>{window.location.href="/"}} >Home</button> 

        <br /> <br />
        <div classNameName="row">
            <div className="container">
                <div className="row no-gutter justify-content-center">
                <div className="col-lg-4">
                <div className="card">
                <br />
                <div class="text-center w-75 m-auto">
                                    <img src={logo} alt="" height="48" />
                </div>
                <div className="card-body p-4 shadow1">

                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname" >First Name</lable>
                        </div>
                        <div className='col'>
                        <input name='fname' id='fname' onChange={handleChange} value={regdata.fname} />  
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">Last Name</lable>
                        </div>
                        <div className='col'>
                        <input name='lname' id='lname' onChange={handleChange} value={regdata.lname} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">Company Name</lable>
                        </div>
                        <div className='col'>
                        <input name='company_name' id='company_name' onChange={handleChange} value={regdata.company_name} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">Tenantid</lable>
                        </div>
                        <div className='col'>
                        <input name='tenantid' id='tenantid' onChange={handleChange} value={regdata.tenantid} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">Phone Number</lable>
                        </div>
                        <div className='col'>
                        <input name='phn' id='phn' onChange={handleChange} value={regdata.phn} /> 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">Email</lable>
                        </div>
                        <div className='col'>
                        <input name='email' id='email' onChange={handleChange} value={regdata.email} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <lable htmlFor="fname">{status}</lable>
                        </div>
                    </div>   
                    <div className='row'>
                        <div className='col'>
                        <button className='btn btn-primary' id='register' onClick={registerForm}><i class="mdi mdi-account-circle"></i>Register</button>
                        </div>
                    </div>  
                    
                   


                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;