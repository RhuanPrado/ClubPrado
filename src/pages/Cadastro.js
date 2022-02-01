import React, {useState} from 'react';
import { Container ,Row, Form, Button, Col, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import testaCPF from '../services/testaCpf'
import BarraNav from '../components/BarraNav';

export default function Cadastro(){

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [nasc, setNasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [status, setStatus] = useState({
            type: '',
            menssage: ''
          });



    async function handleSubmit(e){
      
      e.preventDefault();

      if(testaCPF(cpf)){

        const response = await api.get('/clients');
        const clients = response.data;
        if(clients.find(el => el.cpf == cpf)){
            setStatus({
              type: 'danger',
              menssage: "Esse CPF já está Cadastrado " + cpf 
            });
           
        }else{
            await api.post('/clients',{
                id: (((clients.length) == 0)? 0:clients[clients.length-1].id)+1,
                cpf,
                nome,
                telefone,
                nascimento: nasc,
                pontos: 0,
            }).then(resp => {
                console.log(resp.data);
            }).catch(error => {
                console.log(error);
            });

            setCpf('');
            setNome('');
            setTelefone('');
            setNasc('');
            setStatus({
              type: 'success',
              menssage: "Usuário Cadastrado com Sucesso!" 
            });

        
        }
      }else{
        setStatus({
          type: 'danger',
          menssage: "CPF inválido!" 
        });
      }
      
      return;
    }
    

    return (
    <>
      
    <BarraNav/>

    <Container>
      <Row>
        <h1>Cadastrar Cliente</h1>
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
              <Form.Control type="text" placeholder="111.111.111-11"
                minLength="11"
                maxLength="14"
                title='Digite os onze dígitos do número do CPF'
                value={cpf}
                onChange={e => setCpf(e.target.value)} 
                required               
              />
              <Form.Text className="text-muted">
                digite um CPF válido.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" >
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome"
                value={nome}
                required
                onChange={ e => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date"
                value={nasc}
                required
                onChange={e => setNasc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" placeholder="(99) 99999-9999"
                value={telefone}
                required
                minLength="10"
                onChange={e => setTelefone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
         <Col md={{ span: 6, offset: 3 }}>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
         </Col> 
        </Row>
      </Form>
    </Container>
    </>

  );
}
