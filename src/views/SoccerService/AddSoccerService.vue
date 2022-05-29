<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>Add New SoccerService</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>YardLocation</label>
            <select class="form-control" v-model="yardLocation" required>
              <option
                v-for="yardLocation in yardLocations"
                :key="yardLocation.id"
                :value="yardLocation"
              >
                {{ yardLocation.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="nameService" class="form-control" />
          </div>

          <div class="form-group">
            <label>Price</label>
            <input type="number" v-model="price" class="form-control" />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="addSoccerService"
          >
            Add SoccerService
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>

    <!--        Form-->
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  props: ["baseURL", "categories", "yardLocations"],
  data() {
    return {
      id: null,
      yardLocation: null,
      nameService: null,
      price: null,
    };
  },

  methods: {
    addSoccerService() {
      const newSoccerService = {
        nameService: this.nameService,
        price: this.price,
        yardLocation: this.yardLocation,
      };

      axios
        .post(this.baseURL + "service/create", newSoccerService)
        .then(() => {
          this.$router.push({ name: "SoccerService" });
          swal({
            text: "SoccerService has been added",
            icon: "success",
          });
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log("err", err);
          swal({
            text: "SoccerService has not been added",
            icon: "error",
          });
        });
    },
  },
};
</script>
