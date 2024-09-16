import ApiSevice from "../api-service";

class UsuarioService extends ApiSevice{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id, config) {
        return this.get(`/${id}/saldo`, config);
    }

    salvar(usuario){
        return this.post('', usuario);
    }
}

export default UsuarioService;