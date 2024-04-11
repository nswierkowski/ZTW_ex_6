<template>
    <div>
    <h2>Zaktualizuj dane książki</h2>
    <form @submit.prevent="handleSubmit">
        <label for="title">Tytuł:</label>
        <input type="text" id="title" v-model="book.title" required>
        <label for="subtitle">Podtytuł:</label>
        <input type="text" id="subtitle" v-model="book.subtitle">
        <label>Autorzy:</label>
        <div id="aList">
        <ul v-if="authors.length>0" >
        <li v-for="author in authors" :key="author.id">
            <label>
            <input
                type="checkbox"
                :id="`author-${author.id}`"
                :value="author.id"
                v-model="selectedAuthors"
                :checked="book.authors.some(assignedAuthor => assignedAuthor.id === author.id)"
            />
            {{ author.firstName + ' ' + author.lastName }}
            </label>
        </li>
        </ul>
        <p v-else>Brak dostępnych autorów.</p>
        </div>
        <label for="pubYear">Rok publikacji:</label>
        <input type="number" id="pubYear" placeholder="YYYY" v-model="book.yearOfPublication" required>
        <button type="submit">Zaktualizuj</button>
    </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            book: {
                id: null,
                title: '',
                subtitle: '',
                authors: [],
                yearOfPublication: ''
            },
            authors: [],
            selectedAuthors: []
        };
    },
    methods: {
    async getBook(id) {
      try {
        const response = await fetch(
          `http://localhost:8080/get/books/${id}`
        );
        const returnedBook = await response.json();
        return returnedBook;
      } catch (error) {
        console.error(error);
      }
    },
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
    async handleSubmit() {
        if(this.book.title === "" || this.book.yearOfPublication < 1000 || this.book.yearOfPublication > 2024)
        {
            alert("Tytuł książki nie może być pusty! Rok musi być prawidłową liczbą!");
            return;
        }

        this.book.authors = this.selectedAuthors;

        let bookWithAutors = {
            title: this.book.title,
            subtitle: this.book.subtitle,
            authors: [],
            yearOfPublication: this.book.yearOfPublication
        };

        let authors = [];
        for(let id of this.book.authors)
        {
            authors.push(await this.getAuthor(id));
        }
        bookWithAutors.authors = authors;
        console.log(JSON.stringify(bookWithAutors));

        try {
            const response = await fetch(
                `http://localhost:8080/update/books/${this.book.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookWithAutors)
                }
            );
            if(response.ok) {
                alert("Dane książki zaktualizowano pomyślnie");
                this.$router.push('/books');
            } else {
                alert("Aktualizacja danych książki zakończyła się niepowodzeniem");
            }
        } catch(error) {
            console.error(error);
            alert("Błąd podczas aktualizacji danych książki");
        }
    }
    },
    async mounted() {
        console.log("book id in update: "+this.$route.params.id);
        const updatedBook = await this.getBook(this.$route.params.id);
        this.book.id=updatedBook.id;
        this.book.title=updatedBook.title;
        this.book.subtitle=updatedBook.subtitle;
        this.book.authors=updatedBook.authors;
        this.book.yearOfPublication=updatedBook.yearOfPublication;
        this.selectedAuthors = updatedBook.authors.map(author => author.id);

        try {
            const response = await fetch('http://localhost:8080/get/authors');
            const authors = await response.json();
            this.authors = authors;
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    }
}
</script>

<style>
#aList{
    overflow-y: auto
}
</style>