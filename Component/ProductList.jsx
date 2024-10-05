import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function ProductList() {
  let [data,setData]=useState([])
  useEffect( ()=>{
    displyProduct()
  },[])


  async function displyProduct(){
    let res= await fetch('http://localhost:5000/products')
    let resp= await res.json()
    setData(resp)
  }

 async function deleteFunction(id){
    let result=await fetch('http://localhost:5000/products/'+id,{
      method:'DELETE'
    })
    result=await result.json()
    displyProduct()
  }
  return (
    <div>
      <Header/>
      <h1>Product List</h1>
      <div className='col-sm-10 offset-sm-1'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th colSpan={2}>Operation</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,i)=>
            <tr key={i}>
          <td>{item.id}</td>
          <td>{item.Category}</td>
          <td><img width={100} src={item.image}/></td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td><Link to={'/update/'+item.id}><Button>Update</Button></Link></td>
          <td><Button className='btn-danger' onClick={()=>{deleteFunction(item.id)}}>Delete</Button></td>
        </tr>
        )
        }
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default ProductList
