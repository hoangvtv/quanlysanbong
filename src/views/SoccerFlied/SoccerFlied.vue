<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-3">
        <h4 style="font-size: 26px">Our SoccerFlied</h4>
        <router-link :to="{ name: 'AddSoccerFlied' }" style="float: right">
          <button class="btn btn-primary">Add SoccerFlied</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <!--            display all the products in productbox component-->
      <div
        v-for="soccerField of soccerFields"
        :key="soccerField.id"
        class="col-md-4 col-xl-4 col-12 pt-3 d-flex"
      >
        <SoccerFieldBox
          :soccerField="soccerField"
          :soccerFields="soccerFields"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SoccerFieldBox from "../../components/SoccerFieldBox";
export default {
  components: { SoccerFieldBox },
  props: ["soccerFields"],
  mounted() {},
};
</script>
