import React,{useEffect,useState} from 'react'
import {json, useNavigate} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Header from './Header'

function Login() {
  let Navigate=useNavigate()
    useEffect(() => {
  if(localStorage.getItem('user-info')){
    Navigate('/addproduct')
  }
  }, [])
  let [email,setEmail]=useState()
  let [password,setPassword]=useState()

  async function Login(){
    let Item={email,password}
    let res=await fetch('http://localhost:5000/login',{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(Item)
    })
    let resp=await res.json()
    localStorage.setItem('user-info',JSON.stringify(resp))
    Navigate('/')
  }

  return (
    <div>
      <Header/>
      <div className='col-sm-6 offset-sm-3'>
      <h1>Login Page</h1>
      <input type='text' className='form-control' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
      <br/>
      <input type='password' className='form-control' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
      <br/>
      <Button onClick={Login} style={{ marginLeft: '40%' }}>Login</Button>
      </div>
    </div>
  )
}

export default Login
