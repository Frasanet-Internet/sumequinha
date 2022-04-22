
class Chat {

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

  static ultima_mensagem_eh_do_atendente(): boolean {

    // selecionar a última mensagem
    const ultima_mensagem = this._pegar_ultima_msg()

    // verificar se ela veio do cliente
    const cliente = ultima_mensagem.classList.contains("recebida")

    // verificar se ela veio do robô
    const robo = ultima_mensagem.classList.contains("enviada_bot")

    if (cliente || robo) {
      // retornar falso caso a última mensagem seja do cliente ou robô
      return false
    } else {
      // retornar true caso a última mensagem seja do atendente
      return true
    }
  }

  static ultima_mensagem_foi_vista(): boolean {

    // selecionar a última mensagem
    const ultima_mensagem = this._pegar_ultima_msg()

    // selecionar elemento de status dentro da mensagem
    const status_mensagem = ultima_mensagem.querySelector("#message-status")

    // verificar se mensagens é nulo
    if (status_mensagem) {
      return status_mensagem.getAttribute("title")?.toLowerCase() == "mensagem lida"
    } else {
      // informar erro caso não seja encontrado o status da mensagem
      throw new Error("Não foi possível achar o elemento de status dentro da última mensagem")
    }
  }
}

alert(Chat.ultima_mensagem_foi_vista())
