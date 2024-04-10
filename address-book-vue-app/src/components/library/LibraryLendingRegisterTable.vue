<template>
  <div id="lending-register-table">
    <h2>Historia wypożyczeń</h2>
    <table>
      <thead>
        <tr>
          <th>ID Książki</th>
          <th>ID Czytelnika</th>
          <th>Data wypożyczenia</th>
          <th>Przewidywana data oddania</th>
          <th>Data zwrócenia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lendingRegister in displayedLendingRegister" :key="lendingRegister.id">
          <td>{{ lendingRegister.bookID }}</td>
          <td>{{ lendingRegister.readerID }}</td>
          <td>{{ lendingRegister.bookBorrowedDate}}</td>
          <td>{{ lendingRegister.expectedBookReturnDate }}</td>
          <td>{{ lendingRegister.bookReturnDate }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-buttons
      v-if="lengingRegisterSource.length > pageSize"
      :sourceLength="lengingRegisterSource.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @load-more-authors="loadMorelendingRegisters"
      @go-to-previous-page="goToPreviousPage"
    />
  </div>
</template>
<script>
import PaginationButtons from "../pagination/PaginationButtons.vue";

export default {
  name: "lending-register-table",
  components: {
    PaginationButtons,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      lengingRegisterSource: [],
    };
  },
  computed: {
    displayedLendingRegister() { // Corrected name here
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.lengingRegisterSource.slice(startIndex, endIndex);
    },
    showLoadMoreButton() {
      return (
        this.lengingRegisterSource.length >
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    loadMorelendingRegisters() {
      this.currentPage++;
    },
    goToPreviousPage() {
      this.currentPage--;
    },
    async getLendingRegister() {
      try {
        const response = await fetch("http://localhost:8080/get/lendingRegister");
        const data = await response.json();
        this.lengingRegisterSource = data;
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
    this.getLendingRegister();
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
