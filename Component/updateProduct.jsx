import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function UpdateProduct() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const result = await response.json();
    setData(result);
    setImagePreview(result.image);
    setCategory(result.Category);
    setName(result.name);
    setFile(result.file);
    setPrice(result.price);
  }

  async function updateProduct() {
    const updatedProduct = {
      Category: category,
      name: name,
      price: price,
      image: imagePreview,
    };

    let res = await fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    let resp = await res.json();
    
    if (res.ok) {
      alert('Data has been updated');
    } else {
      alert('Error updating data');
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setFile(file);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className='col-sm-4 offset-sm-4'>
        <h1>Update Product</h1><br/>
        <input type='text' className='form-control' value={category} onChange={(e) => setCategory(e.target.value)} />
        <br/>
        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        <input type='number' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} />
        <br/>
        <input type='file' className='form-control' onChange={handleFileChange} />
        <br/>
        <img style={{ width: 150 }} src={imagePreview} alt="Product Preview" />
        <Button onClick={updateProduct} style={{ marginLeft: '40%' }}> Update </Button>
      </div>
    </div>
  );
}

export default UpdateProduct;