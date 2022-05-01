
function sumequinha() {
  // essa parte do código está em um try catch pois pode falhar, já que os elementos
  // utilizados aqui dependem que o atendente clique no atendimento para aparecer
  // 
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

  // essa parte aqui não precisa de um try catch pois se os elementos necessários
  // não estiverem na tela, isso siguinifica que o atendente está acessando outras funções
  // da página que não o chat de atendimentos, logo, a extensão não teria utilidade
  // de qualquer forma
  //
  // pegar o elemento correspondente a lista de atendimentos
  const lista_de_atendimentos = document.querySelector(".list_dados")
  // pegar todos os atendimentos da lista
  const atendimentos = lista_de_atendimentos.getElementsByClassName("chat")

  // iteirar por cada atendimento da lista
  for (const atendimento of atendimentos) {
    // pegar as informações do atendimento
    // (o estado e se está selecionado)
    const informacoes = Bichanu.pegar_informacoes_do_atendimento(atendimento)

    // mudar a cor do atendimento de acordo com o estado
    // e se está ou não selecionado
    ListView.adicionar_classe_correspondente_ao_estado(
      atendimento,
      informacoes.estado,
      informacoes.selecionado
    )
  }
}

// primeira execução
sumequinha()

// rodar a funçao quando o atendente clicar na lista
Controller.adicionar_funcao_ao_clicar_na_lista(sumequinha)
