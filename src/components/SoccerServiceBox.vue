<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="card-body">
      <h5 class="card-title">{{ soccerService.nameService }}</h5>
      <p class="card-text">
        Price: {{ soccerService.price.toLocaleString() }} VNĐ/1 trận
      </p>

      <router-link
        :to="{ name: 'EditSoccerService', params: { id: soccerService.id } }"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "SoccerServiceBox",
  props: ["soccerService"],
  methods: {},
  mounted() {
    console.log(this.soccerService);
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
a {
  text-decoration: none;
}
.card-title {
  color: #484848;
}
</style>
