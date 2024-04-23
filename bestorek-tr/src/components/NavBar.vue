<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{ brandName }}</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/books">Books</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contact-us">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      brandName: "Bostorek",
    }
  }
};
</script>

<style scoped>
.custom-nav {
    background-color: #063547;
    padding: 15px 0;
}

.navbar-brand {
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.nav-link {
    padding: 10px 15px !important;
    color: #fff;
    text-align: center;
}

.nav-link:hover {
  color: #44b89d;
}

.active-link {
  color: #44b89d;
}
</style>