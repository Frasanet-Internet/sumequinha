
class Controller {
  static acionar_funcao_ao_clicar_na_lista(funcao): void {
    // pegar o elemento correspondente a lista
    const lista_de_atendimentos = document.querySelector(".list_dados")
    // atrelar a função ao evento de clique do elemento
    lista_de_atendimentos.addEventListener("click", funcao)
  }

  static acionar_funcao_a_cada_segundo(funcao): void {
    // executar a função dada a cada 1 segundo 
    setInterval(() => {
      funcao()
    }, 1000)
  }
}
