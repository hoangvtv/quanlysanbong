<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit SoccerFlied</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="soccerFlied">
          <div class="form-group">
            <label> Category</label>
            <select
              class="form-control"
              v-model="soccerFlied.categoryId"
              required
            >
              <option
                v-for="category of categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label> Yard Location</label>
            <select
              class="form-control"
              v-model="soccerFlied.yardLocationId"
              required
            >
              <option
                v-for="yardLocation of yardLocations"
                :key="yardLocation.id"
                :value="yardLocation.id"
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
              v-model="soccerFlied.name"
              required
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              v-model="soccerFlied.description"
              required
            />
          </div>

          <div class="form-group">
            <label>Price</label>
            <input
              type="number"
              class="form-control"
              v-model="soccerFlied.price"
              required
            />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="soccerFlied.status" required>
              <option v-for="s in listStatus" :key="s.id" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="editSoccerField"
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
      soccerFlied: null,
      id: null,
      listStatus: [
        {
          id: 0,
          name: "Unavailable",
        },
        {
          id: 1,
          name: "Available",
        },
      ],
    };
  },
  props: ["baseURL", "categories", "yardLocations", "soccerFields"],
  methods: {
    async editSoccerField() {
      await axios
        .put(`${this.baseURL}soccerField/update/${this.id}`, this.soccerFlied)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "SoccerFlied" });
          swal({
            text: "soccerFlied has been updated successfully",
            icon: "success",
          });
        })
        .catch(
          (err) => console.log("err", err),
          swal({
            text: "SoccerFlied has not been updated",
            icon: "error",
          })
        );
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.soccerFlied = this.soccerFields.find(
      (soccerFlied) => soccerFlied.id == this.id
    );
    console.log(this.soccerFlied);
  },
};
</script>
