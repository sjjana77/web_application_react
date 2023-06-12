import React, { useState } from 'react'
import './Dashboard.css'

function Dashboard() {
    const handleChange = (e)=>{
        settask({...task,[e.target.name]:e.target.value});
    }
    const handleChange1 = (e)=>{
        setsubtask({...subtask,[e.target.name]:e.target.value});
    }

    const addnotes = ()=>{
        if(task.title!=""){
            settodos([...todos,task]);
        }
        document.getElementById("add-task").classList+=" hidden";
    }
    const addsubtasks = ()=>{
        if(subtask.title!=""){
            let a = [...todos];
            a[maintaskid].notes='';
            a[maintaskid].subtask.push(subtask);
            settodos(a);
        }
        document.getElementById("add-sub-task").classList+=" hidden";
        setsubtask(
            {
                title:'',
                name:'sub',
                notes:''
            });
            document.querySelectorAll("#notes")[1].value='';
    }

    const [task,settask]=useState(
        {
            title:'',
            name:'main',
            subtask:[],
            notes:''
        });
    const [subtask,setsubtask]=useState(
        {
            title:'',
            name:'sub',
            notes:''
        });
    const[maintaskid,setmaintaskid]=useState('');
    const[subtaskid,setsubtaskid]=useState('');
    const[maintaskidd,setmaintaskidd]=useState('');

    const [todos,settodos] = useState([{
        id:'0',
        name:'main',
        title:"test1",
        subtask:[],
        notes:'janajana'
    },
    {
        id:'1',
        name:'main',
        title:"test4",
        subtask:[{
            id:"0",
            name:'sub',
            title:"subtask tst 10",
            notes:"sub 1"
        }],
        notes:''
    }
    ]);
    

    const dd = (ele)=>{
        if(ele.target.innerText==="▶"){
            ele.target.innerText = "▼";
            ele.target.classList.remove("colapsed");
            ele.target.classList+=" expanded";
            ele.target.nextSibling.nextSibling.classList.remove("hidden");
        }
        else{
            ele.target.innerText = "▶";
            ele.target.classList.remove("expanded");
            ele.target.classList+=" colapsed";
            ele.target.nextSibling.nextSibling.classList+= " hidden";
        }
    }

    const displaytodo = ()=>{
        const s = todos.map((toodo,index)=>{
            return (
                <div id={toodo.id} key={index} className="todo_main">
                <span id={toodo.id} onClick={(e)=>dd(e)} className='triangle main_task_btn colapsed'> ▶</span>
                <span className='title'>&nbsp;{toodo.title} <img onClick={()=>{document.getElementById("add-sub-task").classList.remove("hidden");setmaintaskid(index);}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png' height="10px" width="10px" /> </span>
                {toodo.subtask.length===0 ? <div id='main-notes' className='main-notes hidden'> <textarea>{toodo.notes}</textarea></div> : toodo.subtask.map((subb,i)=>{
                    return (
                        <div id={subb.id} key={i} className="todo_sub hidden">
                        <span id={subb.id} onClick={(e)=>dd(e)} className='triangle main_task_btn colapsed'> ▶</span>
                        <span className='sub-title'>&nbsp;{subb.title} 
                        {/* <img onClick={()=>{setsubtaskid(i);setmaintaskidd(index)}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png' height="10px" width="10px" /> */}
                        </span>
                        <div id='sub-notes' className='sub-notes hidden'> <textarea>{subb.notes}</textarea></div>
                        </div>
                    )
                })}
                </div>
            )
        });
    return s;
    }

    const Logout = ()=>{
        window.localStorage.setItem("user_token","");
        window.location.href="/login";
    }
    if(window.localStorage.getItem("user_token")===""){
        window.location.href="/login";
    }
  return (
    
    <div className='Dashboard'>
    <button onClick={Logout} id='logout'>Logout</button>
  <div id='Dashboard' className='userdetails'>
  <h2>Dashboard</h2>
  <br />
    <div className="user-box">
      <div><span>Name</span> <span>{JSON.parse(window.localStorage.getItem("user_token")).fname}&nbsp;
      {JSON.parse(window.localStorage.getItem("user_token")).lname}
      </span></div>
    </div><br /><br />
    <div className="user-box">
      <div><span>Email</span> <span> {JSON.parse(window.localStorage.getItem("user_token")).email} </span></div>
    </div><br /><br />
    <div className="user-box">
      <div><span>Mobile</span> <span> {JSON.parse(window.localStorage.getItem("user_token")).phn} </span></div>
    </div><br /><br />
    <div className="user-box">
      <div><span>Company</span> <span> {JSON.parse(window.localStorage.getItem("user_token")).company_name} </span></div>
    </div><br /><br />
    <div className="user-box">
      <div><span>Tenant Id</span> <span> {JSON.parse(window.localStorage.getItem("user_token")).tenantid} </span></div>
    </div><br />
</div>
<div className="login-box to-do">
    <h2>To Do's</h2>
    <button onClick={()=>{document.getElementById("add-task").classList.remove("hidden");document.getElementById("title").value="";document.getElementById("notes").value="";}} className='addtodo'>Add</button>
    <div id='add-task' className='add-task hidden'>
        <input onChange={handleChange} type='text' id='title' placeholder='Task Title' name='title' value={task.title} /> <label onClick={addnotes} id='close-notes'>X</label> <br /> <br />
        <textarea onChange={handleChange}  type='text' id='notes' placeholder='Task notes' name='notes'>{task.notes}</textarea>
        </div>
    <div id='add-sub-task' className='add-sub-task hidden'>
        <input onChange={handleChange1} type='text' id='title' placeholder='Subtask Title' name='title' value={subtask.title} /> <label onClick={addsubtasks} id='close-notes'>X</label> <br /> <br />
        <textarea onChange={handleChange1}  type='text' id='notes' placeholder='Subtask notes' name='notes' >{subtask.notes}</textarea>
    </div>
    <div>
        <h3>Tasks</h3>
        <div className='task'>
        {displaytodo()}
        </div>
        
    </div>
</div>
</div>
  )
}


export default Dashboard;
