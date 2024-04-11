<template>
    <div id="app" class="small-container">
    <h2>Książki</h2>
    <books-table :booksSource="books" @update-book="updateBook" @delete-book="deleteBook"/>
    <hr/>
    <h2>Dodaj książkę</h2>
    <books-form @add:book="addBook"/>
    </div>
</template>

<script>
import BooksTable from "../books/BooksTable.vue";
import BooksForm from "../books/BooksForm.vue";

export default {
  name: "books-main",
  components: {
    BooksTable,
    BooksForm
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
      async getAuthor(id) {
      try {
        const response = await fetch(
          `http://localhost:8080/get/authors/${id}`
        );
        const author = await response.json();
        return author;
      } catch (error) {
        console.error(error);
      }
    },
    async addBook(book) {
      let bookWithAutors = {
        title: book.title,
        subtitle: book.subtitle,
        authors: [],
        yearOfPublication: book.yearOfPublication
      };
      let authors = [];
      for(let id of book.authors)
      {
          authors.push(await this.getAuthor(id));
      }
      bookWithAutors.authors = authors;
      console.log(JSON.stringify(bookWithAutors));
      try {
        const response = await fetch(
          "http://localhost:8080/create/books",
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookWithAutors)
          }
        );
        if (response.ok) {
          this.getBooks();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getBooks() {
      try {
        const response = await fetch(
          "http://localhost:8080/get/books"
        );
        const data = await response.json();
        this.books = data;
      } catch(error) {
        console.error(error);
      }
      for(let book of this.books)
      {
        console.log("book: "+book.title);
        console.log(book.authors[0]);
        book.authorNames=[];
        for(let author of book.authors)
        {
          console.log("author: ");
          console.log(author);
          book.authorNames.push(author.firstName + " " + author.lastName);
        }
      }
    },
    async updateBook(id) {
      console.log("bookID: "+id);
      this.$router.push({name: 'updateBook', params: {id}});
    },
    async deleteBook(bookID) {
      try {
        const response = await fetch(
        `http://localhost:8080/delete/books/${bookID}`,
        {
          method: 'DELETE',
        }
      );
      if(response.ok) {
        alert("Książka została usunięta poprawnie");
        this.getBooks();
      } else {
        alert("Usuwanie książki zakończyło się niepowodzeniem");
      }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}
.small-container {
  max-width: 680px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  background: #333;
  color: white;
  padding: 1rem;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline;
  margin-right: 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>