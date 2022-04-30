
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

  static _remover_classes_de_estilo(elemento: Element): void {
    // remover todas as classes do elemento especificado
    // que forem iguais as classes de atendimento
    elemento.classList.remove(...this.CLASSES_ATENDIMENTO)
  }

  static adicionar_classe_correspondente_ao_estado(elemento: Element, estado: estado_atendimento, selecionado: boolean = false) {
    // remover possíveis classes de estilo
    this._remover_classes_de_estilo(elemento)

    // armazenar o prefixo que é usado nas classes 
    // que estilizam os atendimentos normais
    let prefixo = "b"

    // se o atendimento estiver selecionado
    if (selecionado) {
      // armazenar o prefixo para atendimento selecionado
      prefixo = "bs"
    }

    // adicionar a classe de estilo correspondente ao estado
    // do atendimento
    switch (estado) {
      case "com_nova_mensagem":
        elemento.classList.add(prefixo + "_com_nova_mensagem")
        break;
      case "ignorado":
        elemento.classList.add(prefixo + "_ignorado")
        break;
      case "expirado":
        elemento.classList.add(prefixo + "_expirado")
        break;
      case "inativo_visualizado":
        elemento.classList.add(prefixo + "_inativo_visualizado")
        break;
      case "inativo":
        elemento.classList.add(prefixo + "_inativo")
        break;
      case "valido":
        elemento.classList.add(prefixo + "_valido")
        break;
    }
  }
}
