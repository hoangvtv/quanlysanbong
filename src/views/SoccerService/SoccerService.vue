<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-5" style="font-size: 26px">Our SoccerService</h3>
        <router-link :to="{ name: 'AddSoccerService' }">
          <button class="btn" style="float: right">Add SoccerService</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="soccerService of soccerServices"
        :key="soccerService.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <SoccerServiceBox :soccerService="soccerService"> </SoccerServiceBox>
      </div>
    </div>
  </div>
</template>
<script>
import SoccerServiceBox from "../../components/SoccerServiceBox.vue";
export default {
  name: "SoccerService",
  props: ["soccerServices"],
  components: { SoccerServiceBox },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
