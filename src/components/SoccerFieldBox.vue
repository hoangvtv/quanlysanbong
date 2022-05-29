<template>
  <div class="card h-100 w-100">
    <!-- <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="soccerField.name"
        alt="Card image cap"
      />
    </div> -->
    <div class="card-body">
      <h5 class="card-title">{{ soccerField.name }}</h5>
      <!-- <p class="card-text">YardLocation: {{ soccerField.yardLocation.name }}</p> -->
      <p class="card-text">{{ soccerField.description }}</p>
      <p class="card-text">
        Price: {{ soccerField.price.toLocaleString() }} VNĐ/1h
      </p>
      <router-link
        :to="{ name: 'EditSoccerFlied', params: { id: soccerField.id } }"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "SoccerFliedBox",
  props: ["soccerField", "soccerFields"],
  data() {
    return {
      yardLocation: {},
    };
  },
  mounted() {
    this.yardLocation = this.soccerField.yardLocation;
    // console.log(this.soccerField.yardLocation);
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
