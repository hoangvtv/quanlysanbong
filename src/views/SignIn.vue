<template>
  <div class="container">
    <div class="row">
      <h2 class="pt-4 pl-4" style="font-size: 26px; margin: 0 auto">
        Đăng nhập
      </h2>
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin" class="flext-item border text-center">
          <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email </label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Password </label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>
            <button class="btn btn-primary mt-2 py-0">Continue</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        Bạn chưa có tài khoản?
        <router-link :to="{ name: 'SignUp' }"> Đăng ký tại đây </router-link>
        <!-- <button class="btn btn-primary"></button> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  props: ["baseURL"],
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password,
      };
      await axios
        .post(`${this.baseURL}user/signin`, user)
        .then((res) => {
          // this.$router.replace("/");
          localStorage.setItem("token", res.data.token);
          swal({
            text: "Login successful",
            icon: "success",
          });
          this.$emit("fetchData");
          // this.$router.push({ name: "Home" });
          this.$router.push({ name: "Home" });
        })
        .catch(
          (err) => console.log("err", err),
          swal({
            text: "Password or email is incorrect",
            icon: "error",
          })
        );
    },
  },
};
</script>
<style scoped>
.btn-primary {
  background-color: #f0c14b;
  color: black;
}

@media screen and (min-width: 992px) {
  #signin {
    width: 40%;
  }
}
</style>
