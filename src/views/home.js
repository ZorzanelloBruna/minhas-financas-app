import React from "react"
import UsuarioService from "../app/service/usuario-service";
import { LocalStorageService } from "../app/service/local-storage-service";

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        
        const usuarioLogado =LocalStorageService.obterItem('_usuario_logado');
        
        if (usuarioLogado) {  
            if (usuarioLogado && usuarioLogado.id && usuarioLogado.token) { 
                this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id, {
                    headers: {
                        'Authorization': `Bearer ${usuarioLogado.token}`
                    }
                })
                .then(response => {
                    console.log('Resposta da API de saldo:', response.data);
                    this.setState({ saldo: response.data });
                })
                .catch(error => {
                    console.log('Erro ao obter saldo:', error.response);
                });
            } else {
                console.log('Usuário não autenticado.');
            }
        } else {
            console.log('Usuário não autenticado.');
        }
    }
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4"/>
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuario" role="button">
                    <i className="fa fa-users pi pi-user-plus"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamento" role="button">
                    <i className="fa fa-users pi pi-pen-to-square"></i>  Cadastrar Lançamento</a>
                    </p>
            </div>
        )
    }
}

export default Home;
