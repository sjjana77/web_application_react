import React, {  useState } from 'react'
import axios from 'axios';
import logo from '../Images/logo.png'
import './Login.css'
import Login from './Login';
import {Routes, Route} from "react-router-dom";

const WhichButton = ()=>{
    if((document.getElementById("fname") === document.activeElement)===false)  {
        if(document.getElementById("fname").value===""){
        document.querySelector("#fnamee").classList.remove("focus-input")}
    }
    if((document.getElementById("lname") === document.activeElement)===false)  {
        if(document.getElementById("lname").value===""){
        document.querySelector("#lnamee").classList.remove("focus-input")}
    }
    if((document.getElementById("email") === document.activeElement)===false)  {
        if(document.getElementById("email").value===""){
        document.querySelector("#emaill").classList.remove("focus-input")}
    }
    if((document.getElementById("phn") === document.activeElement)===false)  {
        if(document.getElementById("phn").value===""){
        document.querySelector("#phnn").classList.remove("focus-input")}
    }
    if((document.getElementById("company_name") === document.activeElement)===false)  {
        if(document.getElementById("company_name").value===""){
        document.querySelector("#company_namee").classList.remove("focus-input")}
    }
    if((document.getElementById("tenantid") === document.activeElement)===false)  {
        if(document.getElementById("tenantid").value===""){
        document.querySelector("#tenantidd").classList.remove("focus-input")}
    }
}

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
        if(regdata.fname==""){
            setstatus("First Name Missing");
        }
        else if(regdata.lname==""){
            setstatus("First Name Missing");
        }
        else if(regdata.email==""){
            setstatus("Email Missing");
        }
        else if(regdata.phn==""){
            setstatus("Mobile Number Missing");
        }
        else if(regdata.company_name==""){
            setstatus("Company Name Missing");
        }
        else if(regdata.tenantid==""){
            setstatus("Tenant Id Missing");
        }
        else{
            setstatus("");
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
            if(result.data.status==='Invald'){
                setstatus("Error Adding User");
                setTimeout(()=>{
                    setstatus("");
                },3000)
            }
            else{
                setstatus("Successfully Added");
                window.location.href = "/login";
                setTimeout(()=>{
                    setstatus("");
                },3000)
            }
        })
        }


    }



  return (
<div onClick={WhichButton} class="login-box">
  <h2>Register</h2>
  <form>
    <div className="user-box">
      <input onFocus={()=>{document.querySelector("#fnamee").classList="focus-input"}} type="text" name="fname" required="" id='fname' onChange={handleChange} value={regdata.fname} />
      <label id='fnamee'>First Name</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#lnamee").classList="focus-input"}} type="text" name="lname" required="" id='lname' onChange={handleChange} value={regdata.lname} />
      <label id='lnamee'>Last Name</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#emaill").classList="focus-input"}} type="email" name="email" required="" id='email' onChange={handleChange} value={regdata.email} />
      <label id='emaill'>Email</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#phnn").classList="focus-input"}} type="text" name="phn" required="" id='phn' onChange={handleChange} value={regdata.phn} />
      <label id='phnn'>Mobile</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#company_namee").classList="focus-input"}} type="text" name="company_name" required="" id='company_name' onChange={handleChange} value={regdata.company_name} />
      <label id='company_namee'>Company Name</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#tenantidd").classList="focus-input"}} type="text" name="tenantid" required="" id='tenantid' onChange={handleChange} value={regdata.tenantid} />
      <label id='tenantidd'>Tenant Id</label>
    </div>


    <div className='status-msg' id='status'>{status}</div>
    <a onClick={registerForm} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
    </a>
  </form>
</div>
  )
}

export default Register;