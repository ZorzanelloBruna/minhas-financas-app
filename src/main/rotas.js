import React from "react";
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom';
import CadastroUsuario from "../views/cadastro-usuario";
import Login from '../views/login';
import Home from '../views/home';
import consultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas() {

    const isUsuarioAutenticado = () => {
        return true;
    }

    function RotaAutenticada( { component: Component, ...props }){
        return (
            <Route {...props} render={ (componentsPropos) => {
                if(isUsuarioAutenticado()){
                    return(
                        <Component { ...componentsPropos} />
                    )
                } else {
                    return (
                        <Redirect to={{pathname: 'login', state: { from: componentsPropos.location}}}/>
                    )
                }
            }}/>
        )
    }
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <RotaAutenticada path="/home" component={Home}/>                
                <RotaAutenticada path="/consulta-lancamento" component={consultaLancamentos}/>
                <RotaAutenticada path="/cadastro-lancamento/:id?" component={cadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas;