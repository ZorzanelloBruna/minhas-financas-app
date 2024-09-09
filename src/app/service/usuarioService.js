import ApiSevice from "../apiservice";

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
}

export default UsuarioService;