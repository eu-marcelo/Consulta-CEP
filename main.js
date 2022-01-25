
const limpaFormulario = () => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const preencherFormulario = (endereco) => {
    
    document.getElementById('endereco').value = endereco.logradouro // endereço no parâmetro como de acordo com o formulário recebe logradouro que é o campo referente no json.
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep) 

const consultaCep = async() => {
    limpaFormulario()

    const cep = document.getElementById('cep').value
    const url = `http://viacep.com.br/ws/${cep}/json/`
        if(cepValido(cep)){
            const dados = await fetch(url) // fetch() vai buscar os dados junto a url e salva em uma variável no caso dados.
            const endereco = await dados.json() // json trata os dados para o formato json que queremos
            if (endereco.hasOwnProperty('erro')){ //.hsOwnProperty serve para verificar se o elemento passado por parametro existe no json.
                document.getElementById('endereco').value = 'Cep não encontrado !'
            }else {
                preencherFormulario(endereco) // depois de tratados os dados do endereço são enviados para a função preencherFormulario para que ocupe os campos do formulário na tela.
            }
        }else {
            document.getElementById('endereco').value = 'Cep incorreto !'
        }
        
   
}

document.getElementById('cep').addEventListener('focusout', consultaCep)