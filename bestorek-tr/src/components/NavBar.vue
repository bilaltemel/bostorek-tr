<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">{{
        brandName
      }}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'books' }">Books</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'dashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'register' }"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link border-0 bg-transparent" @click="logoutUser">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";
export default {
  name: "NavBar",
  data() {
    return {
      brandName: "Bostorek",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.custom-nav {
  background-color: var(--primary-color);
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
  color: var(--secondary-color);
}

.active-link {
  color: var(--secondary-color);
}

.navbar-toggler {
  border-color: #fff;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 767.98px) {
  .navbar-collapse {
    background-color: var(--primary-color);
    padding: 10px;
    margin-top: 10px;
  }
}
</style>
