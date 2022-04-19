"use strict";
var _a;
class Chat {
    static teste() {
        alert("io");
        console.log(this.chat);
        console.log(this.mensagens);
    }
}
_a = Chat;
// receba o elemento HTML que contem dentro as mensagens do atendimento 
Chat.chat = document.querySelector(".dialog_dados .corpo");
(() => {
    // verifique se o elemento HTML com as mensagens existe
    if (_a.chat) {
        // selecione todas as mensagens do chat
        _a.mensagens = _a.chat.querySelectorAll("div[data-time]");
    }
    else {
        // se o elemento não existir lance um erro  
        throw new Error("Não foi possível achar o nó do chat com os seletores especificados na classe");
    }
})();
Chat.teste();
