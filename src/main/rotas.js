import React from "react";
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom';
import CadastroUsuario from "../views/cadastro-usuario";
import Login from '../views/login';
import Home from '../views/home';
import consultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from "./provedor-autenticacao";
import paginaInicial from "../views/pagina-inicial";
//import AuthService from "../app/service/authService";

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props }){
    return (
        <Route exact {...props} render={ (componentsPropos) => {
            //if(AuthService.isUsuarioAutenticado){
                if(isUsuarioAutenticado){
                return(
                    <Component { ...componentsPropos} />
                )
            } else {
                return (
                    <Redirect to={{pathname: '/login', state: { from: componentsPropos.location}}}/>
                )
            }
        }}/>
    )
}

function Rotas(props) {
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={paginaInicial}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/cadastro-usuario" component={CadastroUsuario}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}path="/consulta-lancamento" component={consultaLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}path="/cadastro-lancamento/:id?" component={cadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

//export default Rotas;
export default () => {
    return (
        <AuthConsumer>
            { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>) }
        </AuthConsumer>
    );
}
