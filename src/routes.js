import React from 'react';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AltCadastro from './pages/AltCadastro';
import Cadastro from './pages/Cadastro';
import Clientes from './pages/Clientes';
import Main from './pages/Main';
import Pontuacao from './pages/Pontuacao';
import Utilizar from './pages/Utilizar';


export default function Routes_(){
    return(
        <BrowserRouter>
            <Routes >
                <Route path="/" exact element={<Main/>}/>
                <Route path="/pesquisar" exact element={<Pontuacao/>}/>
                <Route path="/utilizar" exact element={<Utilizar/>}/>
                <Route path="/cadastro" exact element={<Cadastro/>}/>
                <Route path="/clientes" exact element={<Clientes/>}/>
                <Route path="/altCadastro" exact element={<AltCadastro/>}/>
            </Routes>
        </BrowserRouter>
    );
}