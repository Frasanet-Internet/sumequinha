
class ChatPage {

  static _pegar_ultima_msg(): Element {
    // pegar os elementos com as mensagens entre o atendente e o cliente
    const mensagens: HTMLCollection = document.getElementsByClassName("msg")

    // verificar se mensagens é nulo
    if (mensagens) {
      // selecionar a última mensagem
      return mensagens[mensagens.length - 1]
    } else {
      // informar erro caso não seja encontrado mensagens
      throw new Error("Não foram encontradas mensagens no chat")
    }
  }

  static ultima_mensagem_do_atendente_foi_vista(): boolean {
    try {
      // selecionar a última mensagem
      const ultima_mensagem = this._pegar_ultima_msg()

      // selecionar elemento de status dentro da mensagem
      const status_mensagem = ultima_mensagem.querySelector("#message-status")

      // verificar se mensagens é nulo
      if (status_mensagem) {
        // retornar true se o status da mensagem indicar que ela foi lida
        return status_mensagem.getAttribute("title")?.toLowerCase() == "mensagem lida"
      } else {
        // retornar false caso a mensagem não tenha o elemento de status
        // pois nesse caso a mensagem não é do atendente
        return false
      }
    } catch {
      // se der erro é porque o chat ainda não foi carregado na tela, 
      // nesse caso apenas retorne false.
      return false
    }
  }
}
