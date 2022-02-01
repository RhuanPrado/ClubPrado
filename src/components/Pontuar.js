import React, {useState} from 'react';
import {Row, Form, Button, Col, Alert } from 'react-bootstrap';
import testaCPF from '../services/testaCpf';
import api from '../services/api';


export default function Pontuar() {
  const [cpf, setCpf] = useState('');
  const [pontos, setPontos] = useState(0);
  const [status, setStatus] = useState({
    type:'',
    menssage:''
  })

  async function handleSubmit(e) {
    e.preventDefault();

    if(testaCPF(cpf)){
      var response = await api.get('/clients');

      const cli = response.data.find( cli =>{
        if(cli.cpf == cpf){
          return cli;
      }});


      if(cli){
        const sum = Number(cli.pontos)+Number(pontos);
        cli.pontos = sum;
        response = await api.put(`/clients/${cli.id}`,cli);
        setStatus({
          type:'success',
          menssage:`Pontuação Atualizada agora ${cli.nome} tem ${cli.pontos} pontos`
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
      <Row>
        <h1>Pontuar</h1>
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
                onChange={ e => setCpf(e.target.value)}
              />
              <Form.Text className="text-muted">
                digite um CPF válido.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Pontos Ganhos</Form.Label>
              <Form.Control type="number" placeholder="Digite a pontuação"
                value={pontos}
                onChange={e => setPontos(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
         <Col md={{ span: 6, offset: 3 }}>
          <Button variant="primary" type="submit">
            Pontuar
          </Button>
         </Col> 
        </Row>
      </Form>
    </>
  );
}
