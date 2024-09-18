import React from "react";
import { Route, Switch, HashRouter} from 'react-router-dom';
import CadastroUsuario from "../views/cadastro-usuario";
import Login from '../views/login';
import Home from '../views/home';
import consultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <Route path="/consulta-lancamento" component={consultaLancamentos}/>
                <Route path="/cadastro-lancamento/:id?" component={cadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas;