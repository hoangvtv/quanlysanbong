<template>
  <div>
    <Navbar />
    <router-view
      v-if="yardLocations"
      style="min-height: 60vh"
      :baseURL="baseURL"
      :categories="categories"
      :soccerFields="soccerFields"
      :merchandises="merchandises"
      :yardLocations="yardLocations"
      :soccerServices="soccerServices"
      @fetchData="fetchData"
    >
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      baseURL: "http://localhost:8081/",
      soccerFields: null,
      categories: null,
      merchandises: null,
      yardLocations: null,
      soccerServices: null,
    };
  },
  methods: {
    async fetchData() {
      // api call to get all the categories
      await axios
        .get(this.baseURL + "category/list")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => console.log("err", err));

      // api call to get the soccerField

      await axios
        .get(this.baseURL + "soccerField/list")
        .then((res) => {
          this.soccerFields = res.data;
          // console.log(this.soccerFields);
        })
        .catch((err) => console.log("err", err));

      // api call to get the merchandises
      await axios
        .get(this.baseURL + "merchandise/list")
        .then((res) => {
          this.merchandises = res.data;
        })
        .catch((err) => console.log("err", err));

      // api call to get yard Location
      await axios
        .get(this.baseURL + "yardLocation/list")
        .then((res) => {
          this.yardLocations = res.data;
        })
        .catch((err) => console.log("err", err));

      // api call to get Soccer Service
      await axios
        .get(this.baseURL + "service/list")
        .then((res) => {
          this.soccerServices = res.data;
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
