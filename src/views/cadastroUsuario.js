import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter} from 'react-router-dom';
import UsuarioService from "../app/service/usuarioService";
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

    validar(){
        const msgs = [];

        if(!this.state.nome) {
            msgs.push('O campo nome é obrigatório!');
        }
        if(!this.state.email) {
            msgs.push('O campo email é obrogatório');
        } else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um email válido');
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x');
        } else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem!');
        }
        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length>0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false;
        }
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha

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