<template>
    <div id="book-form">
        <form @submit.prevent="handleSubmit">
        <label>Tytuł</label>
        <input
            v-model="book.title"
            type="text"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            @keypress="clearStatus"
        />
        <label>Podtytuł</label>
        <input
            v-model="book.subtitle"
            type="text"
            :class="{ 'has-error': submitting && invalidSubtitle }"
            @focus="clearStatus"
            @keypress="clearStatus"
        />
        <label>Autor&#40;zy&#41;</label>
        <div id="aList">
        <ul v-if= "authors.length>0" >
        <li v-for="author in authors" :key="author.id">
            <label>
            <input
                type="checkbox"
                :id="`author-${author.id}`"
                :value="author.id"
                v-model="selectedAuthors"
            />
            {{ author.firstName + ' ' + author.lastName }}
            </label>
        </li>
        </ul>
        </div>
        <label>Rok publikacji</label>
        <input
            v-model="book.yearOfPublication"
            type="number"
            placeholder="YYYY" 
            :class="{ 'has-error': submitting && invalidYear }"
            @focus="clearStatus"
            @keypress="clearStatus"
        />
        <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
        </p>
        <p v-if="success" class="success-message">Dane poprawnie zapisano</p>
        <button>Dodaj książkę</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "book-form",
    data() {
        return {
        book: {
            title: "",
            subtitle: "",
            authors: [],
            yearOfPublication: ""
        },
        authors: [],
        selectedAuthors: [],
        submitting: false,
        error: false,
        success: false
        };
    },
    methods: {
        handleSubmit() {
            this.submitting = true;
            this.clearStatus();
            if(this.invalidTitle || this.invalidSubtitle || this.invalidYear) {
                this.error = true;
                return;
            }
            this.book.authors = this.selectedAuthors;

            this.$emit("add:book", this.book);

            this.book.title = "";
            this.book.subtitle = "";
            this.book.authors = [];
            this.book.yearOfPublication = "";

            this.error = false;
            this.success = true;
            this.submitting = false;

            console.log("book added");
        }, 
        clearStatus() {
        this.success = false;
        this.error = false;
        },
    },
    computed: {
        invalidTitle() {
            return this.book.title === "";
        },
        invalidSubtitle() {
            return this.book.subtitle === "";
        },
        invalidYear() {
            return (this.book.yearOfPublication < 1000 || this.book.yearOfPublication > 2024); 
        }
    },
    async mounted() {
    try {
        const response = await fetch('http://localhost:8080/get/authors');
        const authors = await response.json();
        this.authors = authors;
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
}
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
#aList{
    overflow-y: auto
}
</style>