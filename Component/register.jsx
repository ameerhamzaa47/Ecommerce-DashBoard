import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from './Header';

function Register() {

   useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/addproduct')
    }
  }, [])

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function signUp() {
    let item = { name, email, password };

    let data = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    let result = await data.json();
    localStorage.setItem("user-info", JSON.stringify(result));

    navigate('/');

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <Header />
      <div className='col-sm-6 offset-sm-3'>
        <h1>User Sign Up</h1>
        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <br />
        <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <br />
        <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <br />
        <Button onClick={signUp} style={{ marginLeft: '40%' }}>Sign Up</Button>
      </div>
    </>
  );
}

export default Register;