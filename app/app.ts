
function sumequinha() {
  try {
    // pegar o nome do cliente que está selecionado na lista de atendimentos
    const nome_do_cliente_selecionado = ListPage.nome_do_cliente_selecionado()

    // verificar se a última mensagem do chat atual é do atendente
    // e foi vista pelo cliente
    if (ChatPage.ultima_mensagem_do_atendente_foi_vista()) {
      // salvar essas informações no banco de dados
      Data.set(nome_do_cliente_selecionado, "sim")
    } else {
      // salvar essas informações no banco de dados
      Data.set(nome_do_cliente_selecionado, "não")
    }
  } catch (error) {
    // :(
  }
}

sumequinha()
/* teste
const lista_atendimentos = document.querySelector(".list_dados")
const chat_elementos = lista_atendimentos.getElementsByClassName("chat")
const array = []

Data.set("Teste IXC", "não")

for (let index = 0; index < chat_elementos.length; index++) {
  const elemento_atual = chat_elementos[index]
  array.push(Bichanu.pegar_informacoes_do_atendimento(elemento_atual))
}

window.console.log(array)
*/
