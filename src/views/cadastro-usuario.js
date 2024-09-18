import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter} from 'react-router-dom';
import UsuarioService from "../app/service/usuario-service";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroUsuario extends React.Component  {

    state = {
        nome: '',
        email:'',
        senha: '',
        senhaRepeticao:''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
    
        const { nome, email, senha, senhaRepeticao } = this.state;

        const usuario = { nome, email, senha, senhaRepeticao };

        try {
            this.service.validar(usuario);
        } catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(e => mensagemErro(msgs));
        }
        this.service.salvar(usuario)
            .then(response => {
                console.log('Requisição enviada para URL:', this.service.apiurl); 
                mensagemSucesso('Usuário cadastrado com sucesso, faça o login para acessar o sistema.');
                this.props.history.push('/login');
        }).catch( error=> {
            mensagemErro(error.response.data);
        })
    }

    cancelar = () =>{
        this.props.history.push('/login');
    }

    render(){
        return(          
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                        id="inputNome"
                                        className="form-control"
                                        name="nome"
                                        onChange={e => this.setState({nome: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                        id="Email"
                                        className="form-control"
                                        name="email"
                                        onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                        id="inputSenha"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                <input type="password"
                                        id="inputSenhaRepeticao"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success button-spacing">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger button-spacing">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
           
        )
    }
}

export default withRouter(CadastroUsuario);