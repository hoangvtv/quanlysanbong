<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit SoccerService</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="soccerService">
          <div class="form-group">
            <label> Yard Location</label>
            <select
              class="form-control"
              v-model="soccerService.yardLocation"
              required
            >
              <option
                v-for="yardLocation of yardLocations"
                :key="yardLocation.id"
                :value="yardLocation"
              >
                {{ yardLocation.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              v-model="soccerService.nameService"
              required
            />
          </div>

          <div class="form-group">
            <label>Price</label>
            <input
              type="number"
              class="form-control"
              v-model="soccerService.price"
              required
            />
          </div>

          <button
            type="button"
            class="btn btn-primary"
            @click="editSoccerService"
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
      soccerService: null,
      id: null,
    };
  },
  props: ["baseURL", "yardLocations", "soccerServices"],
  methods: {
    async editSoccerService() {
      await axios
        .put(`${this.baseURL}service/update/${this.id}`, this.soccerService)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "SoccerService" });
          swal({
            text: "SoccerService has been updated successfully",
            icon: "success",
          });
        })
        .catch(
          (err) => console.log("err", err),
          swal({
            text: "SoccerService has not been updated",
            icon: "error",
          })
        );
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.soccerService = this.soccerServices.find(
      (soccerService) => soccerService.id == this.id
    );
  },
};
</script>
