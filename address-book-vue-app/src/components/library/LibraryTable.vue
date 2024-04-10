<template>
  <div id="booksInfos-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tytuł</th>
          <th>Podtytuł</th>
          <th>Autorzy</th>
          <th>Rok publikacja</th>
          <th>Liczba kopii</th>
          <th>Dostępna liczba w bibliotece</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booksInfo in displayedBooksInfo" :key="booksInfo.id">
          <td>{{ booksInfo.id }}</td>
          <td>{{ booksInfo.title }}</td>
          <td>{{ booksInfo.subtitle }}</td>
          <td>{{ formatAuthors(booksInfo.authors) }}</td>
          <td>{{ booksInfo.yearOfPublication }}</td>
          <td>{{ booksInfo.copiesNumber }}</td>
          <td>{{ booksInfo.currentAvailable }}</td>
          <div class="button-container">
            <button @click="borrowBook(booksInfo.id)">Wypożycz</button>
            <button @click="returnBook(booksInfo.id)">Oddaj</button>
          </div>
        </tr>
      </tbody>
    </table>
    <pagination-buttons
      v-if="libraryFullBooksInfoSource.length > pageSize"
      :sourceLength="libraryFullBooksInfoSource.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @load-more-authors="loadMorebooksInfos"
      @go-to-previous-page="goToPreviousPage"
    />
  </div>
</template>
<script>
import PaginationButtons from "../pagination/PaginationButtons.vue";

export default {
  name: "library-table",
  components: {
    PaginationButtons,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      readerId: null,
      libraryFullBooksInfoSource: [],
    };
  },
  computed: {
    displayedBooksInfo() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.libraryFullBooksInfoSource.slice(startIndex, endIndex);
    },
    showLoadMoreButton() {
      return (
        this.libraryFullBooksInfoSource.length >
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    loadMorebooksInfos() {
      this.currentPage++;
    },
    goToPreviousPage() {
      this.currentPage--;
    },
    async borrowBook(bookId) {
      const url = `http://localhost:8080/borrow/book/${bookId}/reader/${this.readerId}`;

      try {
        const response = await fetch(url, {
          method: "PUT",
        });

        if (response.ok) {
          alert("Książka została wypożyczona");
        } else if (response.status === 404) {
          alert("Książka nie jest dostępna w bibliotece");
        } else if (response.status === 403) {
          alert(
            "Czytelnik nie może wypożyczyć książki, dopóki nie odda zaległej książki"
          );
        } else if (response.status === 409) {
          alert("Wszystkie egzemplarze tej książki zostały wypożyczone");
        } else {
          alert("BŁĄD: Podczas wypożyczanie doszło do nieoczekiwanego błędu");
        }
      } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
      }
      this.getFullBooksInfo();
    },
    async returnBook(bookId) {
      const url = `http://localhost:8080/return/book/${bookId}/reader/${this.readerId}`;

      try {
        const response = await fetch(url, {
          method: "PUT",
        });

        if (response.ok) {
          alert("Książka została zwrócona");
        } else if (response.status === 404) {
          alert("Książka lub Czytelnik nie są zapisane w bazie biblioteki");
        } else if (response.status === 409) {
          alert("Ten czytelnik nie wypożyczył tej książki");
        } else {
          alert("BŁĄD: Podczas zwracania doszło do nieoczekiwanego błędu");
        }
      } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
      }
      this.getFullBooksInfo();
    },
    async getFullBooksInfo() {
      try {
        const response = await fetch("http://localhost:8080/get/fullBookInfo");
        const data = await response.json();
        this.libraryFullBooksInfoSource = data;
      } catch (error) {
        console.error(error);
      }
    },
    formatAuthors(authors) {
      return authors
        .map((author) => `${author.firstName} ${author.lastName}`)
        .join(", ");
    },
  },
  mounted() {
    if (this.$route.params.readerId) {
      this.readerId = this.$route.params.readerId;
    }
    this.getFullBooksInfo();
  },
};
</script>
<style scoped>
.button-cell button {
  margin-right: 10px;
}

.button-container {
  align-content: center;
  margin-top: 10px;
}
</style>
