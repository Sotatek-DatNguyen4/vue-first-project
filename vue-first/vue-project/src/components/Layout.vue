<template>
  <div class="layout">
    <div class="left">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div class="right">
      <slot name="children" />
    </div>
  </div>
</template>
<style scoped>
  .layout {
    display: flex;
  }
  .left {
    flex: 0 0 250px;
    max-width: 250px;
    height: 100vh;
    overflow-y: auto;
    background-color: #1d2451;
  }

  nav {
    width: 100%;;
  }

  nav a.router-link-exact-active {
    color: yellow;
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: block;
    padding: 10px 15px;
    color: #fff;
  }
</style>
