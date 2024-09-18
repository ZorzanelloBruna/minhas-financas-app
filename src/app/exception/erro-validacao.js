class ErroValidacao extends Error {
    constructor(mensagens) {
        super("Erro de validação");
        this.mensagens = mensagens;
        this.name = "ErroValidacao";
    }
}

export default ErroValidacao;
