<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Merchandise</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="merchandise">
          <div class="form-group">
            <label>Merchandise Name</label>
            <input
              type="text"
              class="form-control"
              v-model="merchandise.name"
              required
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="text"
              class="form-control"
              v-model="merchandise.price"
              required
            />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="editMerchandise"
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
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      merchandise: null,
      id: null,
    };
  },
  props: ["baseURL", "merchandises"],
  methods: {
    async editMerchandise() {
      //   delete this.category["soccerFlied"];
      await axios
        .put(`${this.baseURL}merchandise/update/${this.id}`, this.merchandise)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Merchandise" });
          swal({
            text: "Merchandise has been updated successfully",
            icon: "success",
          });
        })
        .catch(
          (err) => console.log("err", err),
          swal({
            text: "Merchandise has not been updated",
            icon: "error",
          })
        );
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.merchandise = this.merchandises.find(
      (merchandise) => merchandise.id == this.id
    );
  },
};
</script>
