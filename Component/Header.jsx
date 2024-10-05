import React from 'react'
import {Navbar,Container,Nav, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

function Header() {
  let user=JSON.parse(localStorage.getItem('user-info'))
  let Navigate=useNavigate()
  function logout(){
    localStorage.clear()
    Navigate('/register')
  }
  return (
    <div>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto nav-link">

          {
            localStorage.getItem('user-info') ?
            <>
            <Link to={'/'}>Product List</Link>
            <Link to={'/search'}>Search Product</Link>
            <Link to={'/addproduct'}>Add Product</Link>
            <Link to={'/update/'}>Update Product</Link>
            </>
            :
            <>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
            </>
          }
          {
           localStorage.getItem('user-info') ?
            <Nav>
            <NavDropdown className='PLogout' title={user && user.name || user.email}>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :null
          }
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
