class Data {
    // salvar a informação de que a última mensagem do atendente foi lida
    // usando o nome do cliente como índice
    static set(nome_cliente, ultima_mensagem_do_atendente_foi_lida) {
        return localStorage.setItem(nome_cliente, ultima_mensagem_do_atendente_foi_lida);
    }
    static get(nome_cliente) {
        // pegar o valor armazenado usando o nome do cliente como índice
        const valor = localStorage.getItem(nome_cliente);
        // verificar se o valor retornado é nulo
        if (valor) {
            // retornar se a última mensagem do atendente foi lida
            return valor;
        }
        else {
            // caso o índice não exista no armazenamento local crie ele usando "não" como padrão
            this.set(nome_cliente, "não");
            return "não";
        }
    }
}
alert(Data.get("Kenny G"));
class Chat {
    static _pegar_ultima_msg() {
        // pegar os elementos com as mensagens entre o atendente e o cliente
        const mensagens = document.getElementsByClassName("msg");
        // verificar se mensagens é nulo
        if (mensagens) {
            // selecionar a última mensagem
            return mensagens[mensagens.length - 1];
        }
        else {
            // informar erro caso não seja encontrado mensagens
            throw new Error("Não foram encontradas mensagens no chat");
        }
    }
    static ultima_mensagem_do_atendente_foi_vista() {
        var _a;
        try {
            // selecionar a última mensagem
            const ultima_mensagem = this._pegar_ultima_msg();
            // selecionar elemento de status dentro da mensagem
            const status_mensagem = ultima_mensagem.querySelector("#message-status");
            // verificar se mensagens é nulo
            if (status_mensagem) {
                // retornar true se o status da mensagem indicar que ela foi lida
                return ((_a = status_mensagem.getAttribute("title")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "mensagem lida";
            }
            else {
                // retornar false caso a mensagem não tenha o elemento de status
                // pois nesse caso a mensagem não é do atendente
                return false;
            }
        }
        catch (_b) {
            // se der erro é porque o chat ainda não foi carregado na tela, 
            // nesse caso apenas retorne false.
            return false;
        }
    }
}
class Lista {
    static nome_do_cliente_selecionado() {
        // encontrar o elemento que contém o nome do cliente e está selecionado
        const elemento_titulo = document.querySelector(".list_dados .selected .title");
        if (elemento_titulo) {
            // retornar o nome do cliente ou uma string vazia caso não exista
            return elemento_titulo.textContent ? elemento_titulo.textContent : "";
        }
        else {
            // informar que o elemento não foi encontrado
            throw new Error("Não foi possível encontrar o atendimento que está selecionado na lista");
        }
    }
}
