import React from 'react';
import { Navbar, Container,Nav} from 'react-bootstrap';
import logo from '../assets/ClubePrado-256.png';


function BarraNav() {

  function closeApp() {
    
  }
  
  return (

    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">  
          <img
            alt=""
            src={logo}
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Brand href={`http://localhost:3000/`}>
          Clube PRADO
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="http://localhost:3000/">Pontuar</Nav.Link>
          <Nav.Link href="http://localhost:3000/pesquisar">Pesquisar </Nav.Link>
          <Nav.Link href="http://localhost:3000/utilizar">Resgatar </Nav.Link>
          <Nav.Link href="http://localhost:3000/cadastro" >Cadastro</Nav.Link>
          <Nav.Link href="http://localhost:3000/clientes" >Clientes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BarraNav;
