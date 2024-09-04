import React from "react";
import { Route, Switch, HashRouter} from 'react-router-dom';
import CadastroUsuario from "../views/cadastroUsuario";
import Login from '../views/login';
import Home from '../views/home';

function Rotas() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas;