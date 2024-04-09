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
        <tr v-for="author in authorsSource" :key="author.id">
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
  </div>
</template>
<script>
export default {
  name: "authors-table",
  props: {
    authorsSource: Array,
  },
  methods: {
    deleteAuthor(authorId) {
      this.$emit("delete-author", authorId);
    },
  },
};
</script>
<style scoped>

.button-cell button {
  margin-right: 10px;
}

</style>