import React, {useState, useEffect} from 'react';
import { Container ,Row, Form, Button, Col, Alert} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../services/api";
import BarraNav from '../components/BarraNav';

export default function AltCadastro(){
    const {state} = useLocation();
    const {idClient} = state;
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [nasc, setNasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [pontos, setPontos] = useState(0);
    const [status, setStatus] = useState({
            type: '',
            menssage: ''
          });

    const navigate = useNavigate();

    async function handleSubmit(e){
      
      e.preventDefault();
      const response = await api.put(`/clients/${idClient}`,{
        cpf,
        nome,
        nascimento: nasc,
        telefone,
        pontos
        
      });
      navigate('/clientes', {state: { menssage: `Cliente ${nome} alterado com Sucesso!`}});
    }
    
    useEffect(()=>{
      async function loadClient() {
            const response = await api.get(`/clients/${idClient}`);
            console.log(response.data);
            setCpf(response.data.cpf);
            setNome(response.data.nome);
            setNasc(response.data.nascimento);
            setTelefone(response.data.telefone);
            setPontos(response.data.pontos);
        }
        loadClient();
    },[])

    return (
    <>
    <Container >
      <BarraNav/>
    </Container>
    <Container>
      <Row>
        <h1>Alterar Cliente</h1>
      </Row>
      <br/>
      <Alert variant={status.type}>
        {status.menssage}
      </Alert>

      <Form  noValidate onSubmit={handleSubmit}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-1" >
              <Form.Label>CPF</Form.Label>

              <Form.Control plaintext readOnly defaultValue= {cpf}/>

            </Form.Group>

            <Form.Group className="mb-1" >
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome"
                value={nome}
                onChange={ e => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date"
                value={nasc}
                onChange={e => setNasc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" placeholder="(99) 99999-9999"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
         <Col md={{ span: 6, offset: 3 }}>
          <Button variant="warning" type='submit'>
            Alterar
          </Button>
         </Col> 
        </Row>
      </Form>
    </Container>
    </>

  );
}
