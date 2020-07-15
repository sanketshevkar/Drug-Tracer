import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import { Nav } from 'react-bootstrap';


export class Navi extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Drug-Channel</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/changeHolder">Change Holder</Nav.Link>
          <Nav.Link href="/changeLocation">Change Location</Nav.Link>
          <Nav.Link href="/addDrug">Add Drug</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}



export default Navi;