<template>
  <div>
    <header>
      <h1>Witaj na stronie czytelni</h1>
    </header>

    <main>
      <slot></slot>
    </main>

  </div>
</template>

<script>
export default {
  name: 'AlternativeLayout',
}
</script>

<style scoped>
header {
  background-color: #ff9800;
  color: white;
  padding: 10px;
}
footer {
  background-color: #ff9800;
  color: white;
  padding: 10px;
}
</style>
