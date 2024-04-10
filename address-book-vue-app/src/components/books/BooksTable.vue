<template>
    <div id="books-table">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tytuł</th>
                <th>Podtytuł</th>
                <th>Autorzy</th>
                <th>Rok publikacji</th>
                <th>Akcja</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="book in displayedBooks" :key="book.id">
                    <td>{{book.id}}</td>
                    <td>{{book.title}}</td>
                    <td>{{book.subtitle}}</td>
                    <td>{{book.authorNames}}</td>
                    <td>{{book.yearOfPublication}}</td>
                    <td class="button-cell">
                        <button @click="updateBook(book.id)">Edytuj</button>
                        <button @click="deleteBook(book.id)">Usuń</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-buttons">
            <button v-if="currentPage !== 1" @click="goToPreviousPage">Previous page</button>
            <button v-if="showLoadMoreButton" @click="loadMoreBooks">Show more</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: "books-table",
        props: {
            booksSource: Array,
        },
        data() {
            return {
                pageSize: 5,
                currentPage: 1
            };
        },
        computed: {
            displayedBooks() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return this.booksSource.slice(startIndex,endIndex);
            },
            showLoadMoreButton() {
                return this.booksSource.length > this.currentPage * this.pageSize;
            }
        },
        methods: {
            updateBook(id) {
                this.$emit("update-book", id);
            },
            deleteBook(id) {
                this.$emit("delete-book", id);
            },
            loadMoreBooks() {
                this.currentPage++;
            },
            goToPreviousPage() {
                this.currentPage--;
            }
        },
    };
</script>

<style scoped>
.button-cell button {
  margin-right: 10px;
}

.pagination-buttons button {
  margin-right: 10px;
}
</style>