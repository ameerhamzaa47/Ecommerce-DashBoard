import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchComponent() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            
                let res = await fetch('http://localhost:5000/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                let resp = await res.json();
                setAllProducts(resp);
                setFilteredProducts(resp);
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchKey) {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchKey, allProducts]);

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className='col-sm-6 offset-sm-3'>
                <h1>Search Product</h1>
                <input type='text' value={searchKey} onChange={handleSearch} className='form-control' placeholder='Search Product' />

                {searchKey && filteredProducts.length > 0 && (
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
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map((item, i) =>
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.Category}</td>
                                            <td><img width={100} src={item.image} alt={item.name} /></td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <Link to={'/update/' + item.id}>
                                                    <Button>Update</Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Button className='btn-danger' onClick={() => { deleteFunction(item.id) }}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={8}>No products found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default SearchComponent;