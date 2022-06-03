<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>Add New SoccerFlied</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="categoryId" required>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>YardLocation</label>
            <select class="form-control" v-model="yardLocationId" required>
              <option
                v-for="yardLocation in yardLocations"
                :key="yardLocation.id"
                :value="yardLocation.id"
              >
                {{ yardLocation.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="name" class="form-control" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="description" class="form-control" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status" required>
              <option v-for="s in listStatus" :key="s.id" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="number"
              v-model="price"
              min="100000"
              class="form-control"
            />
          </div>
          <button type="button" class="btn btn-primary" @click="addSoccerFlied">
            Add SoccerFlied
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
      categoryId: null,
      yardLocationId: null,
      name: null,
      description: null,
      status: null,
      price: null,

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
  methods: {
    addSoccerFlied() {
      const newSoccerFlied = {
        categoryId: this.categoryId,
        yardLocationId: this.yardLocationId,
        description: this.description,
        name: this.name,
        status: this.status,
        price: this.price,
      };

      axios
        .post(this.baseURL + "soccerField/create", newSoccerFlied)
        .then(() => {
          this.$router.push({ name: "SoccerFlied" });
          swal({
            text: "SoccerFlied has been added",
            icon: "success",
          });
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log("err", err);
          swal({
            text: "SoccerFlied has not been added",
            icon: "error",
          });
        });
    },
  },
};
</script>
