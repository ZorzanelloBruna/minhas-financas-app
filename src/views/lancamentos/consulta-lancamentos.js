import React from "react";
import { withRouter} from 'react-router-dom';
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import LancamentosTable from "./lancamentos-table";
import LancamentoService from "../../app/service/lancamento-service";
import { LocalStorageService } from "../../app/service/local-storage-service";
import * as messages from '../../components/toastr';


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

        

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '', 
        tipo: '',
        descricao: '',
        mostrarDialogo: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service= new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo ano é obrigatório!');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id,
            descricao: this.state.descricao
        }
        console.log('Requisição enviada para URL:', this.service.apiurl);
        console.log(lancamentoFiltro); // Verifique o valor do filtro
        this.service.consultar(lancamentoFiltro)
        .then( resposta => {
            this.setState({lancamentos: resposta.data});
        }).catch( error => {
            console.log(error);
        })
    }

    editar = (id) => {
        console.log('editando',id);
    }

    abrirConfirmacao = (Lancamento) => {
        this.setState({ mostrarDialogo: true, lancamentoDeletar: Lancamento});
    }

    cancelarDelecao = () => {
        this.setState({ mostrarDialogo: false, lancamentoDeletar: {}});
    }
    
    deletar = () => {
        const { lancamentoDeletar, lancamentos } = this.state;
    
        if (!lancamentoDeletar || !lancamentoDeletar.id) {
            messages.mensagemErro('Lançamento para deletar não encontrado.');
            return;
        }
    
        this.service
            .deletar(lancamentoDeletar.id)
            .then(response => {
                const lancamentosAtualizados = lancamentos.filter(l => l.id !== lancamentoDeletar.id);
                this.setState({ 
                    lancamentos: lancamentosAtualizados, 
                    mostrarDialogo: false 
                });
                messages.mensagemSucesso('Lançamento deletado com sucesso!');
            })
            .catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento');
            });
    }
    

    render(){        

        const meses = this.service.obterListaMeses();
        const tipo = this.service.obterListaTipo();

        const confirmarDialogoFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}/>
                <Button label="Cancelar" icon="pi pi-check" onClick={this.cancelarDelecao}
                        className="p-button-secondary"/>
            </div>
        );

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup html="inputAno" label="Ano: *">
                                <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Digite o Ano"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês:">
                                <SelectMenu 
                                id="inputMes" 
                                value={this.state.mes}
                                onChange={e => this.setState({mes: e.target.value})}
                                className="form-control" 
                                lista={meses}/>
                            </FormGroup>
                            <FormGroup html="inputDescricao" label="Descrição: ">
                                <input type="text"
                                className="form-control"
                                id="inputDescricao"
                                value={this.state.descricao}
                                onChange={e => this.setState({descricao: e.target.value})}
                                placeholder="Digite uma descrição..."/>
                            </FormGroup>
                            <FormGroup htmlFor="inpuTipo" label="Tipo Lançamento:">
                                <SelectMenu 
                                id="inpuTipo"
                                value={this.state.tipo}
                                onChange={e => this.setState({tipo: e.target.value})}
                                className="form-control" 
                                lista={tipo}/>
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success button-spacing">Buscar</button>
                            <button type="button" className="btn btn-danger button-spacing">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              AcaoDelete={this.abrirConfirmacao}
                                              AcaoEditar={this.editar}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="IMPORTANTE" 
                         visible={this.state.mostrarDialogo} 
                         style={{ width: '50vw' }} 
                         footer={confirmarDialogoFooter}
                         onHide={() => this.setState({ mostrarDialogo: false })}>
                        <p className="m-0">
                            Confirma a exclusão deste lançamento?
                        </p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);