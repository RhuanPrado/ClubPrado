import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container ,FormGroup,Row, Table, Form, Button, ButtonGroup, Alert} from 'react-bootstrap';

import BarraNav from '../components/BarraNav'
import { useEffect } from 'react';
import api from '../services/api';


export default function Clientes() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const {state} = useLocation();
    const [status, setStatus] = useState({
        type: '',
        menssage: ''
      });
    useEffect(()=>{
        async function loadClients(){
            const response = await api.get('/clients');
            setClients(response.data);
        }
        if(state){
            setStatus({
                type: 'success',
                menssage: state.menssage
            });
        }
            
        loadClients();
    },[]);

    async function deleteClient(client,e){
        e.preventDefault();

        if(confirm(`Deseja Excluir ${client.nome} ?`)){
            const response = await api.delete(`/clients/${client.id}`);
            console.log(response);
            setStatus({
                type: 'success',
                menssage:`Cliente NOME: ${client.nome} - CPF: ${client.cpf} Excluido com Sucesso`
            });
            setClients(clients.filter( cli =>{
                if(cli.id != client.id)
                    return cli;
            }));
        }
    }

  return (
    <>
    <BarraNav/>
    <Container>
        <Row>
            <h1>Lista de Clientes</h1>
        </Row>
        <Row>
            <h4>Pesquisar</h4>
            <br/>
            <Form>
                <FormGroup>
                    <Form.Label>Filtrar por:</Form.Label>
                    <Form.Select aria-label="Pesquisar por:">
                        <option>Selecione</option>
                        <option value="1">CPF</option>
                        <option value="2">Nome</option>
                        <option value="3">Telefone</option>
                    </Form.Select>
                </FormGroup>
                <br/>   
                <Form.Group className="mb-1" >
                    <Form.Label>Pesquisar:</Form.Label>
                    <Form.Control type="text" placeholder="Digite sua pesquisa" />
                    <Form.Text className="text-muted">
                        digite o que deseja pesquisar.
                    </Form.Text>
                </Form.Group>
            </Form>
        </Row>
        <br/>
        <Alert variant={status.type}>
            {status.menssage}
        </Alert>
        <br/>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>Pontuação</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {clients.map(client =>(
                <tr key={client.cpf}>
                <td>{client.cpf}</td>
                <td>{client.nome}</td>
                <td>{client.telefone}</td>
                <td>{client.nascimento}</td>
                <td>{client.pontos}</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button variant='warning' onClick={() => navigate('/altCadastro',{state: {idClient: client.id}})}>Alterar</Button>
                        <Button variant='danger' onClick={e => deleteClient(client, e)}>Excluir</Button>
                    </ButtonGroup>
                </td>
                </tr>
            ))}
        </tbody>
    </Table>
      
    </Container>

  </>
  );
}
