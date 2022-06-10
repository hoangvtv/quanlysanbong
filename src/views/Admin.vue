<template>
  <div class="text-center mt-3">
    <router-link :to="{ name: 'Category' }" v-if="roleId == 1">
      <button class="btn btn-primary btn-lg">Admin Category</button>
    </router-link>

    <br />
    <router-link :to="{ name: 'Address' }" v-if="roleId == 1">
      <button class="btn btn-primary btn-lg">Admin Address</button>
    </router-link>
    <br />

    <router-link :to="{ name: 'SoccerFlied' }" v-if="roleId == 1">
      <button class="btn btn-primary btn-lg">Admin Soccer</button>
    </router-link>

    <br />
    <router-link :to="{ name: 'ListMatch' }">
      <button class="btn btn-primary btn-lg">Admin Match</button>
    </router-link>
    <br />

    <router-link :to="{ name: 'ListUser' }" v-if="roleId == 1">
      <button class="btn btn-primary btn-lg">Admin User</button><br />
    </router-link>

    <router-link :to="{ name: 'Bill' }">
      <button class="btn btn-primary btn-lg">Admin Bill</button>
    </router-link>

    <br />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      token: null,
      users: null,
      roleId: null,
    };
  },
  methods: {
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
  created() {
    this.token = localStorage.getItem("token");
    this.getUser();
  },
};
</script>
<style>
.btn {
  margin-bottom: 20px;
}
</style>
