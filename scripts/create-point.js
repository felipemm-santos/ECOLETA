// API DO IBGE:
//  https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs

function populateUFs() {
  const ufSelect = document.querySelector('select=uf');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      ufSelect.innerHTML = `
        <option value="1">Valor</option>`;
    });
}


document.querySelector('select=uf').addEventListener('change', () => {
  Console.log('Mudei');
});
