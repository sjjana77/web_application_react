import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import logo from '../Images/logo.png';
import './Login.css';
import {Routes, Route} from "react-router-dom";
import Register from './Register';

function WhichButton() {
    if((document.getElementById("userid") === document.activeElement)==false)  {
        if(document.getElementById("userid").value==""){
        document.querySelector("#useridd").classList.remove("focus-input")
    }
    }
    if((document.getElementById("psw") === document.activeElement)==false)  {
        if(document.getElementById("psw").value==""){
        document.querySelector("#psww").classList.remove("focus-input")
        }
    }
}
function WhichButtonPsd() {
    if((document.getElementById("enp") === document.activeElement)==false)  {
        if(document.getElementById("enp").value==""){
        document.querySelector("#enpp").classList.remove("focus-input")
    }
    }
    if((document.getElementById("rnp") === document.activeElement)==false)  {
        if(document.getElementById("rnp").value==""){
        document.querySelector("#rnpp").classList.remove("focus-input")
        }
    }
}

const Login = ()=>{
    const [email,setemail] = useState('');
    const [psw,setpsw] = useState('');
    const [regdata,setregdata] = useState({
        userid:'',
        psw:'',
        enp:'',
        rnp:''
    });
    const[loginstatus,setloginstatus] = useState('');
    const[pswstatus,setpswstatus] = useState('');


    const handleChange = (e)=>{
        setregdata({...regdata,[e.target.name]:e.target.value});
    }

    const Loginn = ()=>{
        const sendData = {
            user_id : regdata.userid,
            psw : regdata.psw
        }
        axios.post('http://localhost/react/login.php',sendData).
        then((result)=>{
            if(result.data.msg=='Valid User'){
                setloginstatus("Successfully Logged In....");
                let w=50;
                let w1=100;
                const myInterval = setInterval(() => {
                    w-=5;
                    w1-=5;
                    document.querySelector(".login-box").style.left=((w)+"%");
                    document.querySelectorAll(".login-box")[1].style.left=((w1)+"%");
                    if(w==5){
                        clearInterval(myInterval);
                        document.querySelector(".login-box").classList+=" hidden";
                        document.querySelector(".login-box").style.left="50%";
                        if(result.data.reenter=="yes"){
                            document.querySelectorAll(".login-box")[1].classList.remove("hidden");
                            document.querySelectorAll(".login-box")[1].style.left="50%";
                            document.getElementById("enp").value="";
                            document.getElementById("rnp").value="";
                        }

                    }
                }, 30);
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }
            else if(result.data.msg=='Wrong Password'){
                setloginstatus("Wrong Password");
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }
            else{
                setloginstatus("Invalid Credantials");
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }
        })
    }

    const Update = ()=>{
        const sendData = {
            user_id : regdata.userid,
            psw : regdata.rnp
        }
        axios.post('http://localhost/react/updatepassword.php',sendData).
        then((result)=>{
            if(result.data.status=='success'){
                setpswstatus("Updated Sucessfully");
                setTimeout(()=>{
                    setpswstatus("");
                },3000)
            }
            else{
                setpswstatus("Update Failed");
                setTimeout(()=>{
                    setpswstatus("");
                },3000)
            }
        })
    }

    return(
    <div>
<div onClick={WhichButton} class="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input onFocus={()=>{document.querySelector("#useridd").classList="focus-input"}} type="text" name="userid" required="" id='userid' onChange={handleChange} value={setregdata.user} />
      <label id='useridd'>Username</label>
    </div>
    <div class="user-box">
      <input onFocus={()=>{document.querySelector("#psww").classList="focus-input"}} type="password" name="psw" required="" id='psw' onChange={handleChange} value={setregdata.psw} />
      <label id='psww'>Password</label>
    </div>
    <div id='loginstatus'>{loginstatus}</div>
    <a onClick={Loginn} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a>
  </form>
</div>
<div onClick={WhichButtonPsd} class="login-box hidden">
  <h2>Update Password</h2>
  <form>
    <div className="user-box">
      <input autoComplete="off" onFocus={()=>{document.querySelector("#enpp").classList="focus-input"}} type="password" name="enp" id='enp' onChange={handleChange} value={setregdata.enp} />
      <label id='enpp'>Enter New Password</label>
    </div>
    <div class="user-box">
      <input autoComplete="off" onFocus={()=>{document.querySelector("#rnpp").classList="focus-input"}} type="password" name="rnp" id='rnp' onChange={handleChange} value={setregdata.rnp} />
      <label id='rnpp'>Renter New Password</label>
    </div>
    <div id='pswstatus'>{pswstatus}</div>
    <a onClick={Update} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Update
    </a>
  </form>
</div>
</div>
    )
}

export default Login;