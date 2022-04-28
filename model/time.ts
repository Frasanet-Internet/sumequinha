
class Time {
  static converter_texto_em_hora(texto: string): Date {
    // criar um objeto Date
    const tempo = new Date()

    // retirar espaços em branco
    const texto_sem_espaco = texto.trim()

    // separar os digitos de hora e minutos em um array 
    const texto_separado: string[] = texto_sem_espaco.split(":")

    // transformar de texto para número
    const texto_horas: number = parseInt(texto_separado[0])
    const texto_minutos: number = parseInt(texto_separado[1])

    // definir a hora e os minutos do objeto Date
    tempo.setHours(texto_horas)
    tempo.setMinutes(texto_minutos)

    // retornar o objeto Date
    return tempo
  }

  // Obs: a precisão dessa função é apenas de horas e não dias
  static diferenca_hora_atual(data_comparacao: Date): number {
    // armazenar os millisegundos correspondentes ao horário atual
    const milisegundos_atuais = new Date().getTime()

    // armazenar os millisegundos correspondentes ao horário a ser comparado
    const milisegundos_comparar = data_comparacao.getTime()

    // pegar a diferença das duas datas em milisegundos
    const diferenca = Math.abs(milisegundos_atuais - milisegundos_comparar)

    // converter de milisegundos para minutos
    const resultado_total_em_minutos = Math.trunc(diferenca / (1000 * 60))

    // retornar a diferença das duas datas em minutos
    return resultado_total_em_minutos
  }
}

const hora1 = Time.converter_texto_em_hora("12:00")
alert(Time.diferenca_hora_atual(hora1) / 60)
