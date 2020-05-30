//Criação de classe despesa a qual será atribuido os valores dos campos
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        // criação da varavel i que atráves do this recebe todas os inidicies das variaveis da classe despesa
        for (let i in this) {
            // atraves do this[i] é possivel pegar os valores dos inidices das variaveis, para que assim seja possivel
            // realizar o teste de validação dos valores
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}
// Criação da classe bd para armazenamento das informações 
class Bd {
    //Quando o objeto é criado atráves do método construtor é verificado se existe algum elemento no localStorage
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0) //Caso não exista o valor 0 é atribuido a ele
        }
    }
    //Após pegar o valor do inice contido no Bd a variavel proximoId soma +1 ao indice do banco para que o valor seja
    //atribuido a esse novo indice.
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {


        //Criação de variavel para receber o novo id e assim ser capaz de atualizar o indice e o valor a cada nova
        //gravação no objeto Bd.
        let id = this.getProximoId()

        //conversão do objeto literal despesa em JSON para armazenamento utilizando o setItem para  setar o localStorage
        //como local de armazenamento.
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
        //Necesse caso o Json.stringify foi utilizado para que o objeto despesa fosse convertido em uma string JSON
        //para que assim podesse ser armazenado.   
    }
    //metodo criado para recuperar todos os registros
    recuperarTodosRegistros() {
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')
        //lógica para recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            //lógica para recuperar também a o documento contido no id
            let despesa = JSON.parse(localStorage.getItem(i))


            //lógica para pular valores nulos na lista de indices, que pode ocorrer caso algum valor seja excluido
            if (despesa === null) {
                continue
            }
            //inserção dos objetos recuperados no array despesas
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }
    //Metodo pesquisar criado para receber todas as despesas cadastradas
    pesquisar(despesa) {
        //após recuperar todas as despesas a função ira aplicar os filtros em cada campo
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)

        console.log(despesasFiltradas) 
        
        //filtro para o ano
        
        if (despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        
        if (despesa.mes != '') {
            
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if (despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descrição
        if (despesa.descricao != '') {
            console.log('filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != '') {
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
        
        } 

        remover(id){
            localStorage.removeItem(id)
        }
    }
//Instanciando BD
let bd = new Bd()

//Função responsável por recuperar o valor dos campos de cadastro
function cadastrarDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //instanciação do objeto da classe Despessa que recebe os valores de cada campo
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    //Teste para caso validarDados retorne true os itens serão gravados e será exibido um dialog de sucesso
    if (despesa.validarDados()) {
        //chamada de metódo para gravar a despesa
        bd.gravar(despesa)
        $('#sucessoGravacao').modal('show')

        //limpando os dados para nova inserção após serem gravados com sucesso
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        //caso seja falso será exibido um dialog de erro
        document.getElementById('msg').innerHTML = "Existem campos obrigatórios que não foram preenchidos"
        document.getElementById('btn1').innerHTML = "Voltar e corrigir"
        document.getElementById('exampleModalLabel').innerHTML = "Erro na gravação"
        document.getElementById('btn1').className = ' btn btn-danger'
        document.getElementById('mHeader').className = ' btn btn-danger'

        $('#sucessoGravacao').modal('show')
    }
}

function carregarListaDespesa(despesas = Array(), filtro = false) {
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //percorrendo o array despesas, listando cada despesa de forma dinamica utilizando o foreach
    despesas.forEach(function (d) {

        //criando a linha para a tabela
        let linha = listaDespesas.insertRow()

        //criar as colunas 
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`


        //ajustar tipo 
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar botão de exclusão e inserindo ela na linha 4

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function (){
            //remover despesa
            let id = this.id.replace('id_despesa_','')

            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        console.log(d)
        
    })
}
//função criada para pesquisar  as despesas, que instancia um novo objeto despesa e recebe todas as despesas cadastradas
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregarListaDespesa(despesas, true)
}