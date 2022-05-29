<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Add YardLocation</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="form-group">
            <label>Apartment Number</label>
            <input type="text" class="form-control" v-model="apartmentNumber" />
          </div>
          <div class="form-group">
            <label>Street Name</label>
            <input type="text" class="form-control" v-model="streetName" />
          </div>
          <div class="form-group">
            <label>Ward Name</label>
            <input type="text" class="form-control" v-model="wardName" />
          </div>
          <div class="form-group">
            <label>District Name</label>
            <input type="text" class="form-control" v-model="districtName" />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="text" class="form-control" v-model="note" />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="addYardLocation"
          >
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
      name: null,
      apartmentNumber: null,
      streetName: null,
      wardName: null,
      districtName: null,
      note: null,
    };
  },
  methods: {
    addYardLocation() {
      const newYardLocation = {
        name: this.name,
        apartmentNumber: this.apartmentNumber,
        streetName: this.streetName,
        wardName: this.wardName,
        districtName: this.districtName,
        note: this.note,
      };

      axios
        .post(this.baseURL + "yardLocation/create", newYardLocation)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Address" });
          sweetalert({
            text: "YardLocation added successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
          sweetalert({
            text: "YardLocation added failed",
            icon: "error",
          });
        });
    },
  },
};
</script>
<style scoped></style>
