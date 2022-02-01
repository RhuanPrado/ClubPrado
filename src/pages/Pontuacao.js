import React, { useState } from 'react';
import { Container ,Row, Form, Button, Col, Alert} from 'react-bootstrap';
import testaCPF from '../services/testaCpf';
import BarraNav from '../components/BarraNav'
import api from '../services/api';


function Pontuacao() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [pontos, setPontos] = useState('');
  const [status, setStatus] = useState({
    type:'',
    menssage:'',
  });
  async function handleSubmit(e) {
    e.preventDefault();
    
    setNome('');
    setPontos('');

    if(testaCPF(cpf)){
      const response = await api.get('/clients');

     const cli = response.data.find( cli =>{
        if(cli.cpf == cpf){
          setNome(cli.nome);
          setPontos(cli.pontos);
          return cli;
        }});


        if(cli){
          setStatus({
            type:'success',
            menssage:'CPF Encontrado'
          });
        }else{
          setStatus({
            type:'warning',
            menssage:'CPF não Cadastrado'
          });
        } 
        
    }else{
      setStatus({
        type:'warning',
        menssage:'CPF INVÁLIDO !!!'
      });
    }
    
  }


  return (
  <>
    <BarraNav/>
    <Container>
      <Row>
        <h1>Pesquisar Pontuação</h1>
      </Row>
      <br/>
      <Alert variant={status.type}>
        {status.menssage}
      </Alert>

    <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-1" >
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" placeholder="Digite o CPF"
              minLength="11"
              maxLength="14"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              />
              <Form.Text className="text-muted">
                digite um CPF válido.
              </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Pesquisar
            </Button>
          </Col>
        </Row>
    </Form>
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <br/>
                <h3>{nome}</h3>
                <h4>Pontuação:</h4>
                <h2>{pontos}</h2>
            </Col> 
        </Row>
    </Container>
  </>

  );
}

export default Pontuacao;
