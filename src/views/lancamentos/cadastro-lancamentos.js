import React from "react";
import { withRouter} from 'react-router-dom';
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import LancamentoService from "../../app/service/lancamento-service";
import * as messages from '../../components/toastr';
import { LocalStorageService } from "../../app/service/local-storage-service";

class CadastroLancamento extends React.Component {

    state = {
        id:null,
        descricao: '',
        valor:'',
        mes:'',
        ano:'',
        tipo:'',
        status:'',
        usuario:null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        
        if(params.id){
            this.service.obterPorId(params.id)
                .then( response => {
                    this.setState( {...response.data, atualizando: true} );
                }).catch( error => {
                    messages.mensagemErro(error.response.data);
                })
        }
        console.log('paramns', params)
    }

    salvar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano,  tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano,  tipo, usuario: usuarioLogado.id }; 

        try {
            this.service.validar(lancamento);
        } catch (error) {
            const mensagens = error.mensagens;
                mensagens.forEach(msg => messages.mensagemErro(msg));           
            return;
        }

        this.service
        .salvar(lancamento)
        .then( response => {
            this.props.history.push('/consulta-lancamento');
            messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
        }).catch( error => {
            console.log("Erro:", error.response);
            messages.mensagemErro(error.response.data);
        })
     }

    atualizar = () => {
        const { descricao, valor, mes, ano,  tipo, id, usuario, status } = this.state;
        const lancamento = { descricao, valor, mes, ano,  tipo, id, usuario, status }; 

        this.service
            .atualizar(lancamento)
            .then( response => {
                this.props.history.push('/consulta-lancamento');
                messages.mensagemSucesso('Lançamento atuaizado com sucesso!');
            }).catch( error => {
                messages.mensagemErro(error.response.data);
            })
    }
    
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(`Campo alterado: ${name}, Valor: ${value}`);
        this.setState({[name] : value});
    }
    render(){

        const tipos = this.service.obterListaTipo();
        const meses = this.service.obterListaMeses();

        return(
            <Card title={this.state.atualizando? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                                   type="text" 
                                   className="form-control"
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                   type="text" 
                                   className="form-control"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        className="form-control"    
                                        lista={meses}
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                   type="text"
                                   className="form-control"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        className="form-control" 
                                        lista={tipos}
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" 
                                   id="inputStatus" 
                                   className="form-control" 
                                   disabled
                                   name="status"
                                   value={this.state.status}/>
                        </FormGroup>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ?
                            (
                                <button className="btn btn-primary" 
                                        onClick={this.atualizar}>
                                        <i className="pi pi-sync"></i> Atualizar
                                </button>
                            ) :
                            ( 
                                <button className="btn btn-success" 
                                        onClick={this.salvar}>
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }                       
                        
                        <button className="btn btn-danger" 
                                onClick={e=> this.props.history.push('/consulta-lancamento')}>
                                <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);