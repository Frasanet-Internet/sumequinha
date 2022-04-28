var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Data {
    static set(chave, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            const objeto = {};
            objeto[chave] = valor;
            yield chrome.storage.local.set(objeto);
        });
    }
    static get(chave) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome.storage.local.get([chave]);
        });
    }
}
Data.set("Kenny G", true);
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
