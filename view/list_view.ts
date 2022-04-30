

class ListView {
  static CLASSES_ATENDIMENTO: string[] = [
    // classes de estilo css para os atendimentos
    "b_com_nova_mensagem",
    "b_ignorado",
    "b_expirado",
    "b_inativo_visualizado",
    "b_inativo",
    "b_valido",

    // classes de estilo css para o atendimento que estiver selecionado
    "bs_com_nova_mensagem",
    "bs_ignorado",
    "bs_expirado",
    "bs_inativo_visualizado",
    "bs_inativo",
    "bs_valido",
  ]

  static remover_classes_de_estilo(elemento: Element): void {
    // remover todas as classes do elemento especificado
    // que forem iguais as classes de atendimento
    elemento.classList.remove(...this.CLASSES_ATENDIMENTO)
  }

  //static adicionar_classe_correspondente_ao_estado(elemento: Element, estado: estado_atendimento) {
  //}
}

const chat_elementos = document.getElementsByClassName("chat")

for (let index = 0; index < chat_elementos.length; index++) {
  ListView.remover_classes_de_estilo(chat_elementos[index])
}
