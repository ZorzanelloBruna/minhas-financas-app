import ApiSevice from "../api-service";
import { LocalStorageService } from "./local-storage-service";

export default class LancamentoService extends ApiSevice {
    constructor(){
        super('/api/lancamentos');
    }

    obterListaMeses(){
        return  [
            { label: 'Selecione...', value:''},
            { label: 'Janeiro', value:1 },
            { label: 'Fevereiro', value:2 },
            { label: 'Março', value:3 },
            { label: 'Abril', value:4 },
            { label: 'Maio', value:5 },
            { label: 'Junho', value:6 },
            { label: 'Julho', value:7 },
            { label: 'Agosto', value:8 },
            { label: 'Setembro', value:9 },
            { label: 'Outubro', value:10 },
            { label: 'Novembro', value:11 },
            { label: 'Dezembro', value:12 },
        ]
    }

    obterListaTipo(){
        return [
            { label: 'Selecione...', value:''},
            { label: 'Despesa', value:'DESPESA'},
            { label: 'Receita', value:'RECEITA'}
        ]
    }

    consultar(LancamentoFiltro){
        let params = `?ano=${LancamentoFiltro.ano}`;

        if(LancamentoFiltro.mes) {
            params = `${params}&mes=${LancamentoFiltro.mes}`;
        }

        if(LancamentoFiltro.tipo) {
            params = `${params}&tipo=${LancamentoFiltro.tipo}`;
        }

        if(LancamentoFiltro.status) {
            params = `${params}&status=${LancamentoFiltro.status}`;
        }

        if(LancamentoFiltro.usuario) {
            params = `${params}&usuario=${LancamentoFiltro.usuario}`;
        }

        if(LancamentoFiltro.descricao) {
            params = `${params}&descricao=${LancamentoFiltro.descricao}`;
        }
         // Obtém o token do localStorage
        const token = LocalStorageService.obterItem('_usuario_logado').token;

        // Adiciona o token no header da requisição
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Faz a requisição com o cabeçalho contendo o token
        return this.get(params, { headers });
    }

    deletar(id){
        const token = LocalStorageService.obterItem('_usuario_logado').token;

        // Adiciona o token no header da requisição
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        return this.delete(`/${id}`, { headers });
    }
}