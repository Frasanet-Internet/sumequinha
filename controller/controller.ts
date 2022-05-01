
class Controller {
  static adicionar_funcao_ao_clicar_na_lista(funcao): void {
    // pegar o elemento correspondente a lista
    const lista_de_atendimentos = document.querySelector(".list_dados")
    // atrelar a função ao evento de clique do elemento
    lista_de_atendimentos.addEventListener("click", funcao)
  }
}
