<template>
  <div>
    <h2>Zaaktualizuj dane autora</h2>
    <form @submit.prevent="handleSubmit">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="author.firstName" required>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="author.lastName" required>
      <button type="submit">Update Author</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: {
        id: null,
        firstName: '',
        lastName: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.author.firstName.trim() || !this.author.lastName.trim()) {
        alert("Imię i nazwisko nie mogą być puste");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/update/authors/${this.author.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.author)
          }
        );
        if (response.ok) {
          alert("Dane autora zostały pomyślnie zauktalizowane");
          this.$router.push('/authors'); 
        } else {
          alert("Aktualizacja danych autora nie powiodła się");
        }
      } catch (error) {
        console.error(error);
        alert("Error: occurred while updating author");
      }
    }
    
  },
  mounted() {
    if (this.$route.params.id) {
      this.author.id = this.$route.params.id;
    }
    if (this.$route.params.firstName) {
      this.author.firstName = this.$route.params.firstName;
    }
    if (this.$route.params.lastName) {
      this.author.lastName = this.$route.params.lastName;
    }
  }
};
</script>
