import React from 'react';
//import {Navbar} from '../../common';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return(
        // <section className='header'>
        //     <section className='header-top'>
        //         <section className='header-top_logo'>
        //             <a href='/' className='header-logo'>LOGO</a>

        //         </section>
        //         <section className='header-top_navbar'>
        //             <Navbar/>

        //         </section>
        //     </section>


        //     <section className='header-bottom'>
        //         <section className='header-bottom_phone'>
        //             2121212

        //         </section>
        //         <section className='header-bottom_email'>
        //             email
                    
        //         </section>

        //     </section>


        // </section>
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Fertilize app</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Home</Nav.Link>
      <Nav.Link href="#pricing">Fetilize tool</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Header;