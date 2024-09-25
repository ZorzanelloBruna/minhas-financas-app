 export class  LocalStorageService {

    static adicionarItem(chave, valor){
        localStorage.setItem(chave,JSON.stringify(valor));
    }

    static obterItem(chave){       
        const item = localStorage.getItem(chave);
        if (item) {
            try {
                return JSON.parse(item);
            } catch (e) {
                console.error("Erro ao fazer parsing do JSON:", e);
                return null; // retorna null se houver erro no JSON
            }
        }
        return null;
    }

    static removerItem(chave){
        localStorage.removeItem(chave);
    }
}