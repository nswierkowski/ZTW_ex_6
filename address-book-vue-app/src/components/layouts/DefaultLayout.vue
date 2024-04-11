<template>
  <div>
    <header>
      <h1>Witaj na stronie developerskiej</h1>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <p>Wybierz zakładkę</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 10px;
}

header h1{
  color: white;
}

footer {
  background-color: #333;
  color: white;
  padding: 10px;
}
</style>
