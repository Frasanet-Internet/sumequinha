
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

  static _a_diferenca_eh_maior_que(minutos: number, texto_horario: string): boolean {
    // transformar o texto em um objeto de data e hora
    const horario_atendimento = Time.converter_texto_em_hora(
      texto_horario
    )

    // receber a diferença da hora atual com o horário passado
    const diferenca_do_horario_atual = Time.diferenca_hora_atual(horario_atendimento)

    // retornar se a diferença em minutos é maior que o especificado
    return diferenca_do_horario_atual > minutos ? true : false
  }

  static _pegar_nome_do_cliente(atendimento: Element): string {
    const elemento_titulo = atendimento.querySelector(".title")
    // retornar o nome do cliente ou uma string vazia caso não exista
    return elemento_titulo.textContent ? elemento_titulo.textContent : ""
  }

  static _texto_hora_valido(texto_hora: string): boolean {
    return /^\d\d:\d\d$/i.test(texto_hora)
  }

  static _pegar_horario_atendimento(atendimento: Element): string {
    return atendimento.querySelector(".data_hora_ultima_msg").textContent
  }

  static _tem_a_tag(atendimento: Element, nome_da_tag: string): boolean {
    // converter nome da tag para minúsculo
    const nome_da_tag_em_minusculo = nome_da_tag.toLowerCase();

    // pegar cada item do atendimento que é uma tag
    const tags = atendimento.getElementsByClassName("tag")

    for (const tag of tags) {
      // retirar espaços do texto da tag e converter em minúsculo
      const texto_tag = tag.textContent.trim().toLowerCase();

      // retornar verdadeiro caso encontre uma tag com o mesmo nome
      if (texto_tag == nome_da_tag_em_minusculo) {
        return true
      }
    }

    // retornar falso se não houver uma tag com o nome informado
    return false
  }

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

  static _deve_ser_ignorado(atendimento: Element): boolean {
    // retornar se o atendimento possui a tag para não encerrar
    return this._tem_a_tag(atendimento, "(bichanu) não encerrar")
  }

  static _esta_expirado(atendimento: Element): boolean {
    // verificar se possui a tag de inatividade 
    if (this._tem_a_tag(atendimento, "(bichanu) aviso inatividade")) {

      // pegar o texto que mostra o horário do atendimento
      const texto_horario = this._pegar_horario_atendimento(atendimento)

      // caso seja um texto em formato de hora válido comparar com horário atual
      if (this._texto_hora_valido(texto_horario)) {

        // se já tiver se passado 10 minutos retornar que o atendimento está expirado
        // se não, retornar que o atendimento ainda não expirou
        return this._a_diferenca_eh_maior_que(9, texto_horario)
      } else {
        // se não for uma hora válida siguinifica que já se passou mais de um dia
        // nesse caso retornar que o atendimento está expirado
        return true
      }
    }
    // se não possui a tag de inatividade retornar que o atendimento não está expirado
    return false
  }

  static _esta_inativo_e_visualizado(atendimento: Element): boolean {
    // pegar o nome do cliente desse atendimento
    const nome_do_cliente = this._pegar_nome_do_cliente(atendimento)

    // buscar no banco de dados se a última mensagem desse atendimento
    // foi visualizada pelo cliente
    if (Data.get(nome_do_cliente) == "sim") {

      // retornar se o atendimento está inativo
      return this._esta_inativo(atendimento)
    }
    // se a última mensagem do atendente não foi visualizada
    // retornar que o atendimento não está inativo e visualizado
    return false
  }

  static _esta_inativo(atendimento: Element): boolean {
    // pegar o texto que mostra o horário do atendimento
    const texto_horario = this._pegar_horario_atendimento(atendimento)

    // verifiicar se é um texto em formato de hora válido
    if (this._texto_hora_valido(texto_horario)) {

      // se já tiver passado 20 minutos retornar que o atendimento está inativo
      // se não, retornar que o atendimento não está inativo
      return this._a_diferenca_eh_maior_que(19, texto_horario)
    } else {
      // se não for uma hora válida siguinifica que já se passou mais de um dia
      // nesse caso retornar que o atendimento está inativo
      return true
    }
  }

  static pegar_informacoes_do_atendimento(atendimento: Element) {
    const informacoes_do_atendimento: informacoes_do_atendimento = {
      // definir que o estado inicial do atendimento é como "válido"
      estado: "valido",
      // verificar se o atendimento está selecionado
      selecionado: this._esta_selecionado(atendimento)
    }

    // verificar se tem nova mensagem no atendimento
    if (this._tem_nova_mensagem(atendimento)) {
      informacoes_do_atendimento.estado = "com_nova_mensagem"
    }

    // verificar se o atendimento tem a tag "não encerrar"
    else if (this._deve_ser_ignorado(atendimento)) {
      informacoes_do_atendimento.estado = "ignorado"
    }

    // verificar se o atendimento tem a tag de "inatividade" e se passou 10 minutos
    else if (this._esta_expirado(atendimento)) {
      informacoes_do_atendimento.estado = "expirado"
    }

    // verificar se a última mensagem do atendimento foi a 20 minutos
    // e foi visualizada pelo cliente
    else if (this._esta_inativo_e_visualizado(atendimento)) {
      informacoes_do_atendimento.estado = "inativo_visualizado"
    }

    // verificar se a última mensagem do atendimento foi a 20 minutos
    else if (this._esta_inativo(atendimento)) {
      informacoes_do_atendimento.estado = "inativo"
    }

    // retornar as informações
    return informacoes_do_atendimento
  }
}
