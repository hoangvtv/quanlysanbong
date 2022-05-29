<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="card-body">
      <h5 class="card-title">{{ merchandise.name }}</h5>

      <p class="card-text">{{ merchandise.price }} VND/1</p>
      <router-link
        :to="{ name: 'EditMerchandise', params: { id: merchandise.id } }"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "MerchandiseBox",
  props: ["merchandise"],
  methods: {},
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
