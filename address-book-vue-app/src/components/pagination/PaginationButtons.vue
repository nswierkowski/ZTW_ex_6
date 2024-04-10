<template>
  <div class="pagination-buttons">
    <button v-if="currentPage !== 1" @click="goToPreviousPage">Previous Page</button>
    <button v-if="showLoadMoreButton" @click="loadMoreAuthors">Show More</button>
  </div>
</template>

<script>
export default {
  props: {
    sourceLength: Number,
    currentPage: Number,
    pageSize: Number,
  },
  computed: {
    showLoadMoreButton() {
      return this.sourceLength > this.currentPage * this.pageSize;
    },
  },
  methods: {
    loadMoreAuthors() {
      this.$emit("load-more-authors");
    },
    goToPreviousPage() {
      this.$emit("go-to-previous-page");
    },
  },
};
</script>

<style scoped>
.pagination-buttons button {
  margin-right: 10px;
}
</style>
