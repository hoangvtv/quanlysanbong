<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Navbar content -->
    <!--    Logo-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" class="nav__logo" src="../assets/vtvlogo.png" />
    </router-link>
    <!--    Burger Button-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            size="100"
            type="text"
            class="form-control"
            placeholder="Search Items"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>
      <!-- <router-link :to="{ name: 'Admin' }"> Admin </router-link> -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="navbarAccount"
            data-toggle="dropdown"
          >
            Browse
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarAccount">
            <router-link class="dropdown-item" :to="{ name: 'Home' }"
              >Home
            </router-link>
            <router-link
              v-if="token"
              class="dropdown-item"
              :to="{ name: 'CreateMatch' }"
              >Đặt sân
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'Admin' }"
              >Admin
            </router-link>
          </div>
        </li>

        <!-- dropdown for account -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-light"
            href="#"
            id="navbarAccount"
            data-toggle="dropdown"
          >
            Accounts
          </a>
          <div
            class="dropdown-menu black--text"
            aria-labelledby="navbarAccount"
          >
            <router-link
              v-if="token"
              class="dropdown-item"
              :to="{ name: 'Match' }"
              >Sân của bạn
            </router-link>
            <router-link
              v-if="!token"
              class="dropdown-item"
              :to="{ name: 'SignUp' }"
              >Sign up
            </router-link>
            <router-link
              v-if="!token"
              class="dropdown-item"
              :to="{ name: 'SignIn' }"
              >Sign in
            </router-link>
            <a class="dropdown-item" v-if="token" href="#" @click="signout"
              >Sign out
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "Navbar",

  data() {
    return {
      token: null,
      users: null,
      roleId: null,
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      swal({
        text: "Logged you out. Visit again",
        icon: "success",
      });
      // this.$router.push({ name: "Home" });
      location.replace("/");
    },

    async getUser() {
      if (this.token) {
        await axios
          .get(`http://localhost:8081/user/${this.token}`)
          .then((res) => {
            this.users = res.data;
            this.roleId = this.users.role.id;
            console.log(this.users);
          })
          .catch((err) => console.log("err", err));
      }
    },
  },
  watch: {
    $route(to) {
      if (to.name === "SignIn" || to.name === "SignUp") {
        this.token = null;
      } else {
        this.token = localStorage.getItem("token");
        this.getUser();
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.getUser();
  },
};
</script>
<style scoped>
.nav__logo {
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;
}
a {
  color: black;
}
</style>
