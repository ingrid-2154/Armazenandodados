// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()

const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []   

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )     

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {   
    evento.preventDefault()            

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === 
    nome.value)

    const itemAtual = {
     "nome": nome.value,
     "quantidade": quantidade.value
    }

    if (existe) {
      itemAtual.id = existe.id  
      
      atualizaElemento(itemAtual)

      itens[existe.id] = itemAtual
      
    } else {
      itemAtual.id = itens.length
      
      criaElemento(itemAtual)
      
       itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta())
  
    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
  
}

function botaoDeleta() {
   const ElementoBotao = document.createElement("button")
  ElementoBotao.innerHTML = "X"

  return ElementoBotao
}