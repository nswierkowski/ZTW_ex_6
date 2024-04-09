<template>
  <div id="author-form">
    <form @submit.prevent="handleSubmit">
      <label>Imię</label>
      <input
        v-model="author.firstName"
        type="text"
        :class="{ 'has-error': submitting && invalidFirstName }"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <label>Nazwisko</label>
      <input
        v-model="author.lastName"
        type="text"
        :class="{ 'has-error': submitting && invalidLastName }"
        @focus="clearStatus"
      />
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">Dane poprawnie zapisano</p>
      <button>Dodaj autora</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "person-form",
  data() {
    return {
      author: {
        firstName: "",
        lastName: "",
      },
      submitting: false,
      error: false,
      success: false,
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();
      if (this.invalidFirstName || this.invalidLastName) {
        this.error = true;
        return;
      }

      this.$emit("add:author", this.author);

      this.author.firstName = "";
      this.author.lastName = "";

      this.error = false;
      this.success = true;
      this.submitting = false;
    },

    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    invalidFirstName() {
      return this.author.firstName === "";
    },
    invalidLastName() {
      return this.author.lastName === "";
    },
  },
};
</script>
<style scoped>
form {
  margin-bottom: 2rem;
}
[class*="-message"] {
  font-weight: 500;
}
.error-message {
  color: #d33c40;
}
.success-message {
  color: #32a95d;
}
</style>