<template>
  <div id="app" class="big-container">
    <div id="app">
      <component :is="currentLayout">
        <nav>
          <ul>
            <li><router-link to="/authors">Authors</router-link></li>
            <li><router-link to="/library">Library</router-link></li>
          </ul>
        </nav>
      </component>
      <router-view />
    </div>
  </div>
</template>

<script>
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import LibraryLayout from './components/layouts/LibraryLayout.vue';

export default {
  name: "app",
  components: {
    DefaultLayout,
    LibraryLayout
  },
  computed: {
    currentLayout() {
      return this.$route.meta.layout === 'LibraryLayout' ? 'LibraryLayout' : 'DefaultLayout' ;
    }
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