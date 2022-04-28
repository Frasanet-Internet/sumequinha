
type sim_nao = "sim" | "não"

class Data {
  // salvar a informação de que a última mensagem do atendente foi lida
  // usando o nome do cliente como índice
  static set(nome_cliente: string, ultima_mensagem_do_atendente_foi_lida: sim_nao): void {
    return localStorage.setItem(nome_cliente, ultima_mensagem_do_atendente_foi_lida)
  }

  static get(nome_cliente: string): string {
    // pegar o valor armazenado usando o nome do cliente como índice
    const valor = localStorage.getItem(nome_cliente)

    // verificar se o valor retornado é nulo
    if (valor) {
      // retornar se a última mensagem do atendente foi lida
      return valor
    } else {
      // caso o índice não exista no armazenamento local crie ele usando "não" como padrão
      this.set(nome_cliente, "não")
      return "não"
    }
  }
}

alert(Data.get("Kenny G"))
