<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3" style="font-size: 26px">Our YardLocation</h3>
        <router-link :to="{ name: 'AddAddress' }">
          <button class="btn btn-primary" style="float: right">
            Add Address
          </button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="yardLocation of yardLocations"
        :key="yardLocation.id"
        class="col-xl-4 col-md-4 col-12 pt-3 d-flex"
      >
        <AddressBox :yardLocation="yardLocation"> </AddressBox>
      </div>
    </div>
  </div>
</template>
<script>
import AddressBox from "../../components/AddressBox.vue";
export default {
  name: "Address",
  props: ["yardLocations"],
  components: { AddressBox },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
