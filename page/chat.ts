
class Chat {
  // receba o elemento HTML que contem dentro as mensagens do atendimento 
  static chat = document.querySelector(".dialog_dados .corpo")
  static mensagens;

  static {
    // verifique se o elemento HTML com as mensagens existe
    if (this.chat) {
      // selecione todas as mensagens do chat
      this.mensagens = this.chat.querySelectorAll("div[data-time]")
    } else {
      // se o elemento não existir lance um erro  
      throw new Error("Não foi possível achar o nó do chat com os seletores especificados na classe")
    }
  }

  static teste() {
    alert("io")
    console.log(this.chat)
    console.log(this.mensagens)
  }
}

Chat.teste()
