import React from "react";
import Card from '../components/card';
import FormGroup from "../components/form-group";
import { withRouter} from 'react-router-dom';
import UsuarioService from "../app/service/usuario-service";
import { mensagemErro } from "../components/toastr";
import { AuthContext } from "../main/provedor-autenticacao";

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = (event) => {
        event.preventDefault();
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch(error => {
            mensagemErro(error.response.data);                  
        });
    }

    /**
     * 
     * para sair da pagina e zerar o token - logout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    console.log('Usuário deslogado.');
}
     */

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario');
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bs-docs-section">
                        <Card title='Login'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" 
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control"                                       id="exampleInputEmail1"
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                value={this.state.senha}
                                                onChange={e => this.setState({senha: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password"/>
                                            </FormGroup>
                                            <button type="submit"
                                                    onClick={this.entrar} 
                                                    className="btn btn-success button-spacing">
                                                    <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                            <button onClick={this.prepareCadastrar} 
                                                    className="btn btn-danger button-spacing">
                                                    <i className="pi pi-user-plus"></i> Cadastrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>       
        ) 
    }

}

Login.contextType = AuthContext

export default withRouter(Login);