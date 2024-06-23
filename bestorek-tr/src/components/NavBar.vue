<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">{{
        brandName
      }}</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'books' }"
            >Books</router-link
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="nav-link" :to="{ name: 'dashboard' }"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" :to="{ name: 'login' }"
            >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" :to="{ name: 'register' }"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="nav-link" @click="logoutUser">Logout</button>
        </li>
      </ul>
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
</style>
