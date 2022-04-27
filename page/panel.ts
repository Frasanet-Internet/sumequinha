
class Panel {
  static pegar_protocolo(): string {
    // encontrar o elemento com o protocolo
    const elemento_protocolo = document.querySelector(".protocolo")

    // verificar se é nulo e se possui texto
    if (elemento_protocolo && elemento_protocolo.textContent) {
      // retirar o texto desnecessário e manter apenas o número de protocolo
      const protocolo = elemento_protocolo.textContent.replace(" Protocolo: ", "")
      // retornar o protocolo
      return protocolo
    } else {
      // caso não seja encontrado o elemento com o protocolo, o painel ainda não foi carregado
      // lançar um erro informando
      throw new Error("Protocolo inexistente :(")
    }
  }
}

alert(Panel.pegar_protocolo())
