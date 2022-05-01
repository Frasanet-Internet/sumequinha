
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
    // retornar se o atendimento está selecionado
    return atendimento.classList.contains("selected")
  }

  static _tem_nova_mensagem(atendimento: Element): boolean {
    // pegar o icone whatsapp dentro do atendimento
    const icone_whatsapp = atendimento.querySelector(".notif .fa-whatsapp")
    // retornar se o atendimento possui uma nova mensagem do cliente 
    return icone_whatsapp ? icone_whatsapp.classList.contains("piscar") : false
  }

  static pegar_informacoes_do_atendimento(atendimento: Element) {
    const informacoes_do_atendimento: informacoes_do_atendimento = {
      estado: "valido",
      // verificar se o atendimento está selecionado
      selecionado: this._esta_selecionado(atendimento)
    }

    return informacoes_do_atendimento
  }
}

// teste
const lista_atendimentos = document.querySelector(".list_dados")
const chat_elementos = lista_atendimentos.getElementsByClassName("chat")
const array = []

for (let index = 0; index < chat_elementos.length; index++) {
  const elemento_atual = chat_elementos[index]
  array.push(Bichanu._tem_nova_mensagem(elemento_atual))
}

window.console.log(array)
