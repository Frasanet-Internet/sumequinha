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
            // retornar se o atendimento está inativo
            return this._esta_inativo(atendimento);
        }
        // se a última mensagem do atendente não foi visualizada
        // retornar que o atendimento não está inativo e visualizado
        return false;
    }
    static _esta_inativo(atendimento) {
        // pegar o texto que mostra o horário do atendimento
        const texto_horario = this._pegar_horario_atendimento(atendimento);
        // verifiicar se é um texto em formato de hora válido
        if (this._texto_hora_valido(texto_horario)) {
            // se já tiver passado 20 minutos retornar que o atendimento está inativo
            // se não, retornar que o atendimento não está inativo
            return this._a_diferenca_eh_maior_que(19, texto_horario);
        }
        else {
            // se não for uma hora válida siguinifica que já se passou mais de um dia
            // nesse caso retornar que o atendimento está inativo
            return true;
        }
    }
    static pegar_informacoes_do_atendimento(atendimento) {
        const informacoes_do_atendimento = {
            // definir que o estado inicial do atendimento é como "válido"
            estado: "valido",
            // verificar se o atendimento está selecionado
            selecionado: this._esta_selecionado(atendimento)
        };
        // verificar se tem nova mensagem no atendimento
        if (this._tem_nova_mensagem(atendimento)) {
            informacoes_do_atendimento.estado = "com_nova_mensagem";
        }
        // verificar se o atendimento tem a tag "não encerrar"
        else if (this._deve_ser_ignorado(atendimento)) {
            informacoes_do_atendimento.estado = "ignorado";
        }
        // verificar se o atendimento tem a tag de "inatividade" e se passou 10 minutos
        else if (this._esta_expirado(atendimento)) {
            informacoes_do_atendimento.estado = "expirado";
        }
        // verificar se a última mensagem do atendimento foi a 20 minutos
        // e foi visualizada pelo cliente
        else if (this._esta_inativo_e_visualizado(atendimento)) {
            informacoes_do_atendimento.estado = "inativo_visualizado";
        }
        // verificar se a última mensagem do atendimento foi a 20 minutos
        else if (this._esta_inativo(atendimento)) {
            informacoes_do_atendimento.estado = "inativo";
        }
        // retornar as informações
        return informacoes_do_atendimento;
    }
}
class Controller {
    static adicionar_funcao_ao_clicar_na_lista(funcao) {
        // pegar o elemento correspondente a lista
        const lista_de_atendimentos = document.querySelector(".list_dados");
        // atrelar a função ao evento de clique do elemento
        lista_de_atendimentos.addEventListener("click", funcao);
    }
}
function sumequinha() {
    // essa parte do código está em um try catch pois pode falhar, já que os elementos
    // utilizados aqui dependem que o atendente clique no atendimento para aparecer
    // 
    try {
        // pegar o nome do cliente que está selecionado na lista de atendimentos
        const nome_do_cliente_selecionado = ListPage.nome_do_cliente_selecionado();
        // verificar se a última mensagem do chat atual é do atendente
        // e foi vista pelo cliente
        if (ChatPage.ultima_mensagem_do_atendente_foi_vista()) {
            // salvar essas informações no banco de dados
            Data.set(nome_do_cliente_selecionado, "sim");
        }
        else {
            // salvar essas informações no banco de dados
            Data.set(nome_do_cliente_selecionado, "não");
        }
    }
    catch (error) {
        // :(
    }
    // essa parte aqui não precisa de um try catch pois se os elementos necessários
    // não estiverem na tela, isso siguinifica que o atendente está acessando outras funções
    // da página que não o chat de atendimentos, logo, a extensão não teria utilidade
    // de qualquer forma
    //
    // pegar o elemento correspondente a lista de atendimentos
    const lista_de_atendimentos = document.querySelector(".list_dados");
    // pegar todos os atendimentos da lista
    const atendimentos = lista_de_atendimentos.getElementsByClassName("chat");
    // iteirar por cada atendimento da lista
    for (const atendimento of atendimentos) {
        // pegar as informações do atendimento
        // (o estado e se está selecionado)
        const informacoes = Bichanu.pegar_informacoes_do_atendimento(atendimento);
        // mudar a cor do atendimento de acordo com o estado
        // e se está ou não selecionado
        ListView.adicionar_classe_correspondente_ao_estado(atendimento, informacoes.estado, informacoes.selecionado);
    }
}
// primeira execução
sumequinha();
// rodar a funçao quando o atendente clicar na lista
Controller.adicionar_funcao_ao_clicar_na_lista(sumequinha);
