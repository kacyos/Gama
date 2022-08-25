const baseURL = "http://localhost:3000";

const getAllBooks = async () => {
  try {
    const response = await fetch(`${baseURL}/books?_expand=categories`);
    const books = await response.json();
    return books;
  } catch (error) {
    console.error(error);
  }
};

const getBookByCategory = (category) => {
  fetch(`${baseURL}/books`)
    .then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getBookByName = (name) => {
  fetch(`${baseURL}/books/books.name=${name}`)
    .then((response) => {
      response.json().then((data) => {
        console.log("TESTE", data);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export { getAllBooks, getBookByName };
