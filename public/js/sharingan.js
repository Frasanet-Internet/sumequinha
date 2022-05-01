class ListView {
    static _remover_classes_de_estilo(elemento) {
        // remover todas as classes do elemento especificado
        // que forem iguais as classes de atendimento
        elemento.classList.remove(...this.CLASSES_ATENDIMENTO);
    }
    static adicionar_classe_correspondente_ao_estado(elemento, estado, selecionado = false) {
        // remover possíveis classes de estilo
        this._remover_classes_de_estilo(elemento);
        // armazenar o prefixo que é usado nas classes 
        // que estilizam os atendimentos normais
        let prefixo = "b";
        // se o atendimento estiver selecionado
        if (selecionado) {
            // armazenar o prefixo para atendimento selecionado
            prefixo = "bs";
        }
        // adicionar a classe de estilo correspondente ao estado
        // do atendimento
        switch (estado) {
            case "com_nova_mensagem":
                elemento.classList.add(prefixo + "_com_nova_mensagem");
                break;
            case "ignorado":
                elemento.classList.add(prefixo + "_ignorado");
                break;
            case "expirado":
                elemento.classList.add(prefixo + "_expirado");
                break;
            case "inativo_visualizado":
                elemento.classList.add(prefixo + "_inativo_visualizado");
                break;
            case "inativo":
                elemento.classList.add(prefixo + "_inativo");
                break;
            case "valido":
                elemento.classList.add(prefixo + "_valido");
                break;
        }
    }
}
ListView.CLASSES_ATENDIMENTO = [
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
];
class ChatPage {
    static _pegar_ultima_msg() {
        // pegar os elementos com as mensagens entre o atendente e o cliente
        const mensagens = document.getElementsByClassName("msg");
        // verificar se mensagens é nulo
        if (mensagens) {
            // selecionar a última mensagem
            return mensagens[mensagens.length - 1];
        }
        else {
            // informar erro caso não seja encontrado mensagens
            throw new Error("Não foram encontradas mensagens no chat");
        }
    }
    static ultima_mensagem_do_atendente_foi_vista() {
        var _a;
        try {
            // selecionar a última mensagem
            const ultima_mensagem = this._pegar_ultima_msg();
            // selecionar elemento de status dentro da mensagem
            const status_mensagem = ultima_mensagem.querySelector("#message-status");
            // verificar se mensagens é nulo
            if (status_mensagem) {
                // retornar true se o status da mensagem indicar que ela foi lida
                return ((_a = status_mensagem.getAttribute("title")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "mensagem lida";
            }
            else {
                // retornar false caso a mensagem não tenha o elemento de status
                // pois nesse caso a mensagem não é do atendente
                return false;
            }
        }
        catch (_b) {
            // se der erro é porque o chat ainda não foi carregado na tela, 
            // nesse caso apenas retorne false.
            return false;
        }
    }
}
class ListPage {
    static nome_do_cliente_selecionado() {
        // encontrar o elemento que contém o nome do cliente e está selecionado
        const elemento_titulo = document.querySelector(".list_dados .selected .title");
        if (elemento_titulo) {
            // retornar o nome do cliente ou uma string vazia caso não exista
            return elemento_titulo.textContent ? elemento_titulo.textContent : "";
        }
        else {
            // informar que o elemento não foi encontrado
            throw new Error("Não foi possível encontrar o atendimento que está selecionado na lista");
        }
    }
}
class Data {
    // salvar a informação de que a última mensagem do atendente foi lida
    // usando o nome do cliente como índice
    static set(nome_cliente, ultima_mensagem_do_atendente_foi_lida) {
        return localStorage.setItem(nome_cliente, ultima_mensagem_do_atendente_foi_lida);
    }
    static get(nome_cliente) {
        // pegar o valor armazenado usando o nome do cliente como índice
        const valor = localStorage.getItem(nome_cliente);
        // verificar se o valor retornado é nulo
        if (valor) {
            // retornar se a última mensagem do atendente foi lida
            return valor;
        }
        else {
            // caso o índice não exista no armazenamento local crie ele usando "não" como padrão
            this.set(nome_cliente, "não");
            return "não";
        }
    }
}
class Time {
    static converter_texto_em_hora(texto) {
        // criar um objeto Date
        const tempo = new Date();
        // retirar espaços em branco
        const texto_sem_espaco = texto.trim();
        // separar os digitos de hora e minutos em um array 
        const texto_separado = texto_sem_espaco.split(":");
        // transformar de texto para número
        const texto_horas = parseInt(texto_separado[0]);
        const texto_minutos = parseInt(texto_separado[1]);
        // definir a hora e os minutos do objeto Date
        tempo.setHours(texto_horas);
        tempo.setMinutes(texto_minutos);
        // retornar o objeto Date
        return tempo;
    }
    // Obs: a precisão dessa função é apenas de horas e não dias
    static diferenca_hora_atual(data_comparacao) {
        // armazenar os millisegundos correspondentes ao horário atual
        const milisegundos_atuais = new Date().getTime();
        // armazenar os millisegundos correspondentes ao horário a ser comparado
        const milisegundos_comparar = data_comparacao.getTime();
        // pegar a diferença das duas datas em milisegundos
        const diferenca = Math.abs(milisegundos_atuais - milisegundos_comparar);
        // converter de milisegundos para minutos
        const resultado_total_em_minutos = Math.trunc(diferenca / (1000 * 60));
        // retornar a diferença das duas datas em minutos
        return resultado_total_em_minutos;
    }
}
class Bichanu {
    static _a_diferenca_eh_maior_que(minutos, texto_horario) {
        // transformar o texto em um objeto de data e hora
        const horario_atendimento = Time.converter_texto_em_hora(texto_horario);
        // receber a diferença da hora atual com o horário passado
        const diferenca_do_horario_atual = Time.diferenca_hora_atual(horario_atendimento);
        // retornar se a diferença em minutos é maior que o especificado
        return diferenca_do_horario_atual > minutos ? true : false;
    }
    static _pegar_nome_do_cliente(atendimento) {
        const elemento_titulo = atendimento.querySelector(".title");
        // retornar o nome do cliente ou uma string vazia caso não exista
        return elemento_titulo.textContent ? elemento_titulo.textContent : "";
    }
    static _texto_hora_valido(texto_hora) {
        return /^\d\d:\d\d$/i.test(texto_hora);
    }
    static _pegar_horario_atendimento(atendimento) {
        return atendimento.querySelector(".data_hora_ultima_msg").textContent;
    }
    static _tem_a_tag(atendimento, nome_da_tag) {
        // converter nome da tag para minúsculo
        const nome_da_tag_em_minusculo = nome_da_tag.toLowerCase();
        // pegar cada item do atendimento que é uma tag
        const tags = atendimento.getElementsByClassName("tag");
        for (const tag of tags) {
            // retirar espaços do texto da tag e converter em minúsculo
            const texto_tag = tag.textContent.trim().toLowerCase();
            // retornar verdadeiro caso encontre uma tag com o mesmo nome
            if (texto_tag == nome_da_tag_em_minusculo) {
                return true;
            }
        }
        // retornar falso se não houver uma tag com o nome informado
        return false;
    }
    // O atendimento...
    static _esta_selecionado(atendimento) {
        // retornar se o atendimento está selecionado
        return atendimento.classList.contains("selected");
    }
    static _tem_nova_mensagem(atendimento) {
        // pegar o icone whatsapp dentro do atendimento
        const icone_whatsapp = atendimento.querySelector(".notif .fa-whatsapp");
        // retornar se o atendimento possui uma nova mensagem do cliente 
        return icone_whatsapp ? icone_whatsapp.classList.contains("piscar") : false;
    }
    static _deve_ser_ignorado(atendimento) {
        // retornar se o atendimento possui a tag para não encerrar
        return this._tem_a_tag(atendimento, "(bichanu) não encerrar");
    }
    static _esta_expirado(atendimento) {
        // verificar se possui a tag de inatividade 
        if (this._tem_a_tag(atendimento, "(bichanu) aviso inatividade")) {
            // pegar o texto que mostra o horário do atendimento
            const texto_horario = this._pegar_horario_atendimento(atendimento);
            // caso seja um texto em formato de hora válido comparar com horário atual
            if (this._texto_hora_valido(texto_horario)) {
                // se já tiver se passado 10 minutos retornar que o atendimento está expirado
                // se não, retornar que o atendimento ainda não expirou
                return this._a_diferenca_eh_maior_que(9, texto_horario);
            }
            else {
                // se não for uma hora válida siguinifica que já se passou mais de um dia
                // nesse caso retornar que o atendimento está expirado
                return true;
            }
        }
        // se não possui a tag de inatividade retornar que o atendimento não está expirado
        return false;
    }
    static _esta_inativo_e_visualizado(atendimento) {
        // pegar o nome do cliente desse atendimento
        const nome_do_cliente = this._pegar_nome_do_cliente(atendimento);
        // buscar no banco de dados se a última mensagem desse atendimento
        // foi visualizada pelo cliente
        if (Data.get(nome_do_cliente) == "sim") {
            // pegar o texto que mostra o horário do atendimento
            const texto_horario = this._pegar_horario_atendimento(atendimento);
            // caso seja um texto em formato de hora válido comparar com horário atual
            if (this._texto_hora_valido(texto_horario)) {
                // se já tiver passado 20 minutos retornar que o atendimento está inativo e visualizado
                // se não, retornar que o atendimento ainda não está inativo e visualizado
                return this._a_diferenca_eh_maior_que(19, texto_horario);
            }
            else {
                // se não for uma hora válida siguinifica que já se passou mais de um dia
                // nesse caso retornar que o atendimento está inativo e visualizado
                return true;
            }
        }
        // se a última mensagem do atendente não foi visualizada
        // retornar que o atendimento não está inativo e visualizado
        return false;
    }
    static pegar_informacoes_do_atendimento(atendimento) {
        const informacoes_do_atendimento = {
            estado: "valido",
            // verificar se o atendimento está selecionado
            selecionado: this._esta_selecionado(atendimento)
        };
        return informacoes_do_atendimento;
    }
}
// teste
const lista_atendimentos = document.querySelector(".list_dados");
const chat_elementos = lista_atendimentos.getElementsByClassName("chat");
const array = [];
Data.set("Teste IXC", "sim");
for (let index = 0; index < chat_elementos.length; index++) {
    const elemento_atual = chat_elementos[index];
    array.push(Bichanu._esta_inativo_e_visualizado(elemento_atual));
}
window.console.log(array);
