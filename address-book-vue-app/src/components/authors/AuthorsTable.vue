<template>
  <div id="authors-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in displayedAuthors" :key="author.id">
          <td>{{ author.id }}</td>
          <td>{{ author.firstName }}</td>
          <td>{{ author.lastName }}</td>
          <td class="button-cell">
            <button
              class="button-update"
              @click="
                updateAuthor(author.id, author.firstName, author.lastName)
              "
            >
              Update
            </button>
            <button @click="deleteAuthor(author.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-buttons
      v-if="authorsSource.length > pageSize"
      :sourceLength="authorsSource.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @load-more-authors="loadMoreAuthors"
      @go-to-previous-page="goToPreviousPage"
    />
  </div>
</template>
<script>
import PaginationButtons from '../pagination/PaginationButtons.vue';

export default {
  name: "authors-table",
  components: {
    PaginationButtons
  },
  props: {
    authorsSource: Array,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
    };
  },
  computed: {
    displayedAuthors() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.authorsSource.slice(startIndex, endIndex);
    },
  },
  methods: {
    updateAuthor(id, firstName, lastName) {
      this.$emit("update-author", { id, firstName, lastName });
    },
    deleteAuthor(authorId) {
      this.$emit("delete-author", authorId);
    },
    loadMoreAuthors() {
      this.currentPage++;
    },
    goToPreviousPage() {
      this.currentPage--;
    },
  },
};
</script>
<style scoped>
.button-cell button {
  margin-right: 10px;
}
</style>