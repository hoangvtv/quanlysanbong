<template>
  <div class="container">
    <div class="row">
      <div class="justify-content-center d-flex flex-row pt-5">
        <!-- display logoicon -->
      </div>
    </div>

    <!-- header  -->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <div id="signup-div" class="flex-item-border">
          <h2 class="pt-4 pl-4" style="font-size: 26px">Đăng ký</h2>
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label for="Email">Email</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label> First Name</label>
                  <input
                    type="text"
                    v-model="firstName"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label> Last Name</label>
                  <input
                    type="text"
                    v-model="lastName"
                    class="form-control"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label> Phone</label>
              <input type="tel" v-model="phone" class="form-control" required />
            </div>

            <!-- password -->
            <div class="form-group">
              <label for="Password"> Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                required
              />
            </div>

            <!-- confirm password -->
            <div class="form-group">
              <label for="Password"> Confirm password</label>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                required
              />
            </div>
            <button class="btn btn-primary mt-2">Create Account</button>
          </form>
        </div>
      </div>
    </div>
    <!-- from  -->

    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row">
        Bạn đã có tài khoản?
        <router-link :to="{ name: 'SignIn' }"> Đăng nhập tại đây </router-link>
        <!-- <button class="btn btn-primary"></button> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "SignUp",
  props: ["baseURL"],

  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
      password: null,
      confirmPassword: null,
      roleId: 3,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.confirmPassword) {
        // call signup api
        const user = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          password: this.password,
          roleId: this.roleId,
        };

        await axios
          .post(`${this.baseURL}user/signup`, user)
          .then(() => {
            swal({
              text: "User signup successful, please login",
              icon: "success",
            });
            this.$router.replace("/signin");
          })
          .catch((err) => {
            console.log("err", err);
            const errorMessage = err.response.data;
            if (errorMessage) {
              swal({
                text: "User already exists, please signup with another email",
                icon: "error",
              });
            } else {
              swal({
                text: "User signup failed, please try again",
                icon: "error",
              });
            }
          });
      } else {
        swal({
          text: "Passwords dont match",
          icon: "error",
        });
      }
    },
    // validateEmail(value) {
    //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    //     this.msg["email"] = "";
    //   } else {
    //     this.msg["email"] = "Please enter a valid email address";
    //   }
    // },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #f0c14b;
  color: #000;
}

@media screen and (min-width: 992px) {
  #signup {
    width: 40%;
  }
}
</style>
