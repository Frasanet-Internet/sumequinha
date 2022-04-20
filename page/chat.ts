
class Chat {

  static _pegar_mensagens_do_chat(): HTMLCollection {
    // pegar os elementos com as mensagens entre o atendente e o cliente
    const mensagens: HTMLCollection = document.getElementsByClassName("msg")

    // verificar se mensagens é nulo
    if (mensagens) {
      return mensagens
    } else {
      // informar erro caso não seja encontrado mensagens
      throw new Error("Não foram encontradas mensagens no chat")
    }
  }

  static ultima_mensagem_eh_do_atendente(): boolean {

    // pegar os elementos com as mensagens entre o atendente e o cliente
    const mensagens = this._pegar_mensagens_do_chat()

    // selecionar a última mensagem
    const ultima_mensagem = mensagens[mensagens.length - 1]

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
}

alert(Chat.ultima_mensagem_eh_do_atendente())
