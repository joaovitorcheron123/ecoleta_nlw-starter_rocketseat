

function populateUFs(){ // funcao pega os estados no link com o fetch, converte para json
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json() ) //funcao anonima retornando valor
    .then( states => {

        for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //Utilizando html ('+=' pega vc mesmo e soma com o resultado
        }

    })
}

populateUFs()

function getCities(event){ // funcao semelhante a dos estados
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex // 0-26 
    stateInput.value = event.target.options[indexOfSelectedState].text //text vai para value ^^

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`

    fetch(url)
    .then((res) => res.json() ) //funcao anonima retornando valor
    .then( cities => {

        for(const city of cities){
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>` //Utilizando html ('+=' pega vc mesmo e soma com o resultado
        }

        citySelect.disabled = false
    })
}


    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)