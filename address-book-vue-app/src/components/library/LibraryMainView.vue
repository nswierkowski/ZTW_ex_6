<template>
  <div id="app" class="small-container">
    <h2>Czytelnicy</h2>
    <library-readers-table :readers="readers" @login-reader="loginReader" />
    <button @click="showLendingRegister()">Zobacz rejest wypożyczeń</button>
  </div>
</template>
<script>
import LibraryReadersTable from "./LibraryReadersTable.vue";

export default {
  name: "app",
  components: {
    LibraryReadersTable,
  },
  data() {
    return {
      readers: [],
    };
  },
  methods: {
    async addAuthor(author) {
      try {
        const response = await fetch("http://localhost:8080/create/authors", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(author),
        });
        if (response.ok) {
          this.getReaders();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getReaders() {
      try {
        const response = await fetch("http://localhost:8080/get/readers");
        const data = await response.json();
        this.readers = data;
      } catch (error) {
        console.error(error);
      }
    },
    loginReader(id) {
      this.$router.push({
        name: "libraryTable",
        params: { readerId: id },
      });
    },
    showLendingRegister() {
      this.$router.push({
        name: "lendingRegisterTable"
      });
    },
  },
  mounted() {
    this.getReaders();
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
</style>