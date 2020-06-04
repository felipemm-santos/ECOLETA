// API DO IBGE:
//  https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

function getcities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  const ufValue = event.target.value;

  const indexOfSelectdState = event.target.selectedIndex;

  stateInput.value = event.target.options[indexOfSelectdState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `;
  citySelect.innerHTML = '<option value>Selecione a cidade</optioni>';

  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

populateUFs();

document.querySelector('select[name=uf]').addEventListener('change', getcities);

// Items de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');


let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target;

  // add or remove class
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => item  == itemId)

  if (alreadySelected != -1) {
    const filteredItems = selectedItems.filter(item => item != itemId)

    selectedItems = filteredItems     

  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
  
}



