
type sim_nao = "sim" | "não"

class Data {
  // salvar a informação de que a última mensagem do atendente foi lida
  // usando o nome do cliente como índice
  static set(nome_cliente: string, ultima_mensagem_do_atendente_foi_lida: sim_nao): void {
    return localStorage.setItem(nome_cliente, ultima_mensagem_do_atendente_foi_lida)
  }

  // retornar se a última mensagem do atendente foi lida
  static get(nome_cliente: string): string {
    return localStorage.getItem(nome_cliente)
  }
}

Data.set("Kenny G", "sim")
Data.set("Kenny G", "não")
alert(Data.get("Kenny G"))
