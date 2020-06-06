// Function to add all states
function populateUfFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then ( states => {
        // for to create the options on menu 
        for ( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

// exec the function to populete the states field
populateUfFs()

// function to get the cities from state 
function getCities (event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = console.log = event.target.value
    
    const indexOfSelectState = event.target.selectedIndex
    
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option> Selecione a Cidade</option> ";
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities  => {
        for ( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

// always that the user change state this command
// will exec the functions to populate the cities
// i need do it, because when change the 'UF' the cities changes too
document.querySelector("select[name=uf]")
        .addEventListener("change",getCities)

// items to collect
const itemsCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//array
let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemid = itemLi.dataset.id

    const alreadySelectd = selectedItems.findIndex(item => {
        const itemFound =  item == itemid
        return itemFound
    })
    
    if (alreadySelectd >= 0){
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemid
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        selectedItems.push(itemid)
    }
    
    collectedItems.value = selectedItems
}