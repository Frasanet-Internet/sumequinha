
// definir o tipo correspondente aos estados em que um atendimento pode estar
type estado_atendimento =
  "com_nova_mensagem" |
  "ignorado" |
  "expirado" |
  "inativo_visualizado" |
  "inativo" |
  "valido"

// definir o tipo que será retornado com as informações do atendimento 
interface informacoes_do_atendimento {
  estado: estado_atendimento,
  selecionado: boolean
}

class Bichanu {
  // O atendimento...

  static _esta_selecionado(atendimento: Element): boolean {
    // retornar se o elemento está selecionado
    return atendimento.classList.contains("selected")
  }

  static pegar_informacoes_do_atendimento(atendimento: Element) {
    const informacoes_do_atendimento: informacoes_do_atendimento = {
      estado: "valido",
      selecionado: this._esta_selecionado(atendimento)
    }

    return informacoes_do_atendimento
  }
}

// teste
const chat_elementos = document.getElementsByClassName("chat")
const array = []

for (let index = 0; index < chat_elementos.length; index++) {
  const elemento_atual = chat_elementos[index]
  array.push(Bichanu.pegar_informacoes_do_atendimento(elemento_atual))
}

window.console.log(array)
