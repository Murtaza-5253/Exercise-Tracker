import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarT() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand to="/">Excercise Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Nav.Link className="nav-item nav-link" href="/">Excercises</Nav.Link>
            <Nav.Link className="nav-item nav-link" href="/create" >CreateExcercise</Nav.Link>
            <Nav.Link className="nav-item nav-link" href="/user" >CreateUser</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
