const tableBody = document.getElementById("table-body");
const input = document.getElementById("input-cep");
const btnSearch = document.getElementById("btn-search");

async function searchCep(event) {
  event.preventDefault();
  const cep = input.value;
  const api = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const result = await api.json();
  input.value = "";
  createElements(result);
}

const createElements = (data) => {
  const tableRow = document.createElement("tr");
  const dataCEP = document.createElement("td");
  const dataLogradouro = document.createElement("td");
  const dataComplemento = document.createElement("td");
  const dataBairro = document.createElement("td");
  const dataCidade = document.createElement("td");
  const dataUF = document.createElement("td");

  dataCEP.innerText = data.cep;
  dataLogradouro.innerText = data.logradouro;
  dataComplemento.innerText = data.complemento || "--";
  dataBairro.innerText = data.bairro;
  dataCidade.innerText = data.localidade;
  dataUF.innerText = data.uf;

  tableRow.appendChild(dataCEP);
  tableRow.appendChild(dataLogradouro);
  tableRow.appendChild(dataComplemento);
  tableRow.appendChild(dataBairro);
  tableRow.appendChild(dataCidade);
  tableRow.appendChild(dataUF);

  tableBody.appendChild(tableRow);
};

btnSearch.addEventListener("click", searchCep);
