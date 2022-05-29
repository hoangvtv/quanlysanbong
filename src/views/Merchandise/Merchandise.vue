<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3" style="font-size: 26px">Our Merchandise</h3>
        <router-link :to="{ name: 'AddMerchandise' }">
          <button class="btn" style="float: right">Add</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="merchandise of merchandises"
        :key="merchandise.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <MerchandiseBox :merchandise="merchandise"> </MerchandiseBox>
      </div>
    </div>
  </div>
</template>
<script>
import MerchandiseBox from "../../components/MerchandiseBox.vue";
export default {
  name: "Merchandise",
  props: ["merchandises"],
  components: { MerchandiseBox },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
