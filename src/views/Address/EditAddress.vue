<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit YardLocation</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="yardLocation">
          <div class="form-group">
            <label> Name</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.name"
              required
            />
          </div>
          <div class="form-group">
            <label>Apartment Number</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.apartmentNumber"
              required
            />
          </div>
          <div class="form-group">
            <label>Street Name</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.streetName"
              required
            />
          </div>
          <div class="form-group">
            <label>Ward Name</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.wardName"
              required
            />
          </div>
          <div class="form-group">
            <label>District Name</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.districtName"
              required
            />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              v-model="yardLocation.note"
              required
            />
          </div>
          <button type="button" class="btn btn-primary" @click="editAddress">
            Submit
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      yardLocation: null,
      id: null,
    };
  },
  props: ["baseURL", "yardLocations"],
  methods: {
    async editAddress() {
      //   delete this.category["soccerFlied"];
      await axios
        .put(`${this.baseURL}yardLocation/edit/${this.id}`, this.yardLocation)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Address" });
          swal({
            text: "YardLocation has been updated successfully",
            icon: "success",
          });
        })
        .catch(
          (err) => console.log("err", err),
          swal({
            text: "YardLocation has not been updated",
            icon: "error",
          })
        );
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.yardLocation = this.yardLocations.find(
      (yardLocation) => yardLocation.id == this.id
    );
  },
};
</script>
