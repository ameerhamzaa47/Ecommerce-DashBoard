import React,{useState} from 'react'
import Header from './Header';
import { Button } from 'react-bootstrap';

function AddProduct() {
  let [Category,setCategory]=useState("")
  let [file,setFile]=useState(null)
  let [name,setName]=useState("")
  let [price,setPrice]=useState("")

 async function addProducts(){
    let image = file.name
    let item={Category,image,name,price}
    

    let res=await fetch('http://localhost:5000/products',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(item)
    })
    let resp=await res.json()

    alert('Data has been Saved')
    
    
  }
  return (
    <>
    <Header/>
    <div className='col-sm-4 offset-sm-4'>
      <h1>Add Product</h1>
      <input type='text' className='form-control' onChange={(e)=>setCategory(e.target.value)} placeholder='Category'/>
      <br/>
      <input type='file' className='form-control' onChange={(e)=>setFile(e.target.files[0])} placeholder='File'/>
      <br/>
      <input type='text' className='form-control' onChange={(e)=>setName(e.target.value)} placeholder='Name'/>
      <br/>
      <input type='number' className='form-control' onChange={(e)=>setPrice(e.target.value)} placeholder='Price'/>
      <br/>
      <Button onClick={addProducts} style={{ marginLeft: '40%' }}>Add Product</Button>
    </div>
    </>
  )
}

export default AddProduct
