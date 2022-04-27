
class Lista {
  static nome_do_cliente_selecionado(): string {
    // encontrar o elemento que contém o nome do cliente e está selecionado
    const elemento_titulo = document.querySelector(".list_dados .selected .title")

    if (elemento_titulo) {
      // retornar o nome do cliente ou uma string vazia caso não exista
      return elemento_titulo.textContent ? elemento_titulo.textContent : ""
    } else {
      // informar que o elemento não foi encontrado
      throw new Error("Não foi possível encontrar o atendimento que está selecionado na lista")
    }
  }
}

alert(Lista.nome_do_cliente_selecionado())
