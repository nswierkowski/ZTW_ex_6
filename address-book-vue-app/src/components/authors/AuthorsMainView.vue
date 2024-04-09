<template>
  <div id="app" class="small-container">
    <h2>Autorzy</h2>
    <authors-table :authorsSource="authors" @update-author="updateAuthor" @delete-author="deleteAuthor"/>
    <h2>Dodaj autora</h2>
    <authors-form @add:author="addAuthor"/>
  </div>
</template>
<script>
import AuthorsTable from "../authors/AuthorsTable.vue";
import AuthorsForm from "../authors/AuthorsForm.vue";


export default {
  name: "app",
  components: {
    AuthorsTable,
    AuthorsForm,
  },
  data() {
    return {
      authors: [],
    };
  },
  methods: {
    async addAuthor(author) {
      try {
        const response = await fetch(
          "http://localhost:8080/create/authors",
          {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(author)
            }
        );
        if (response.ok) {
          this.getAuthors();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getAuthors() {
      try {
        const response = await fetch(
          "http://localhost:8080/get/authors"
        );
        const data = await response.json();
        this.authors = data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateAuthor(authorData) {
      const { id, firstName, lastName } = authorData;
      this.$router.push({ name: 'updateAuthor', params: { id, firstName, lastName }});
    },
    async deleteAuthor(authorId) {
      try {
        const response = await fetch(
          `http://localhost:8080/delete/authors/${authorId}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          alert("Autor został usunięty poprawnie");
          this.getAuthors();
        } else {
          alert("Nie udało się usunąć autora");
        }
      } catch (error) {
        console.error(error);
        alert("BŁĄD: Próba usunięcia autora spowodowała nie przewidziane zachowanie");
      }
    },
  },
  mounted() {
    this.getAuthors();
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