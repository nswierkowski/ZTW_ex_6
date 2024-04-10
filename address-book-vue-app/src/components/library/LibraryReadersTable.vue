<template>
  <div id="readers-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in displayedBooksInfo" :key="reader.id">
          <td>{{ reader.id }}</td>
          <td>{{ reader.firstName }}</td>
          <td>{{ reader.lastName }}</td>
          <div>
            <button @click="login(reader.id)">Zaloguj się</button>
          </div>
        </tr>
      </tbody>
    </table>
    <pagination-buttons
      v-if="readers.length > pageSize"
      :sourceLength="readers.length"
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
  props: {
    readers: Array,
  },
  components: {
    PaginationButtons,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
    };
  },
  computed: {
    displayedBooksInfo() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.readers.slice(startIndex, endIndex);
    },
    showLoadMoreButton() {
      return (
        this.readers.length >
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
    login(id) {
      this.$emit("login-reader", id);
    },
  },
};
</script>
<style scoped>
.button-cell button {
  margin-right: 10px;
}
</style>
