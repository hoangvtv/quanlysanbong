<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Add Merchandise</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="merchandiseName" />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="text" class="form-control" v-model="price" />
          </div>
          <button type="button" class="btn btn-primary" @click="addCategory">
            Submit
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const sweetalert = require("sweetalert");
export default {
  props: ["baseURL"],
  data() {
    return {
      merchandiseName: "",
      price: "",
    };
  },
  methods: {
    addCategory() {
      const newMerchandise = {
        name: this.merchandiseName,
        price: this.price,
      };

      axios
        .post(this.baseURL + "merchandise/create", newMerchandise)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Merchandise" });
          sweetalert({
            text: "Merchandise added successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
          sweetalert({
            text: "Merchandise added failed",
            icon: "error",
          });
        });
    },
  },
};
</script>
<style scoped></style>
