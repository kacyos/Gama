import { getAllBooks, getBookByName } from "../api/service.js";

const tableBody = document.getElementById("table-body");
const btnSearch = document.getElementById("btn-search");

async function listAllBooks() {
  const bookList = await getAllBooks();
  createTableItem(bookList);
}

async function createTableItem(bookList) {
  tableBody.innerHTML = "";
  const tableRow = document.createElement("tr");
  const tableDataName = document.createElement("td");
  const tableDataCategory = document.createElement("td");
  const tableDataPages = document.createElement("td");

  bookList.map((book) => {
    tableDataName.innerText = book.name;
    tableDataCategory.innerText = book.categories.name;
    tableDataPages.innerText = book.pages;

    tableRow.appendChild(tableDataName);
    tableRow.appendChild(tableDataCategory);
    tableRow.appendChild(tableDataPages);

    tableBody.appendChild(tableRow);
  });
}

async function findBookByName(bookName) {
  const bookList = await getAllBooks();
  const booksFiltered = [];

  for (let index = 0; index < bookList.length; index++) {
    if (bookList[index].name.toUpperCase().includes(bookName.toUpperCase())) {
      booksFiltered.push(bookList[index]);
    }
  }

  createTableItem(booksFiltered);
}

listAllBooks();
findBookByName("java");
