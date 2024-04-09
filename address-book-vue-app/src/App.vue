<template>
  <div id="app" class="small-container">
      <div id="app">
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/authors">Authors</router-link></li>
        </ul>
      </nav>

      <router-view/>
    </div>
    <person-form @add:person="addPerson" />
    <persons-table :personsSource="persons" />
  </div>
</template>
<script>
import PersonsTable from "@/components/PersonsTable.vue";
import PersonForm from "@/components/PersonForm.vue";

export default {
  name: "app",
  components: {
    PersonsTable,
    PersonForm,
  },
  data() {
    return {
      persons: [
        {
          id: 1,
          name: "Adam Słodowy",
          email: "adam.slodowy@zrobtosam.pl",
          phone: "+48 787 774 664",
        },
        {
          id: 2,
          name: "Michał Studencki",
          email: "ms@student.pwr.edu.pl",
          phone: "+48 600 565 454",
        },
        {
          id: 3,
          name: "Kamila Napokaz",
          email: "kami2003@h2.pl",
          phone: "+48 609 554 987",
        },
      ],
    };
  },
  methods: {
    addPerson(person) {
      this.persons = [...this.persons, person];
    },
    async getPersons() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        this.persons = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getPersons();
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