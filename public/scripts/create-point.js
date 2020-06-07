

function populateUFs(){ // funcao pega os estados no link com o fetch, converte para json
    const ufSelect = document.querySelector("[name=uf]") //select

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //funcao anonima retornando valor
    .then( states => {

        for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //Utilizando html ('+=' pega vc mesmo e soma com o resultado
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]") //select
    const stateInput = document.querySelector("[name=state]") //input


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex    //pega o estado selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option></option>" // limpa o campo de cidades
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(const city of cities){
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>` 
        }

        citySelect.disabled = false

    })


}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //itens selecionados inciam vazios

function handleSelectedItem(){
    // adiciona ou remove uma classe em js
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id //separando ids

    //verifica se existem item selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => { //funcao anonima
        const itemFound = item === itemId //será true ou false
        return itemFound
    }) 

    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => { //funcao anonima recebendo item
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

    selectedItems = filteredItems

    } else{ // se não estiver selecionado, add a seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}