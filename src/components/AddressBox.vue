<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="card-body">
      <h5 class="card-title">{{ yardLocation.name }}</h5>
      <p class="card-text">
        Địa chỉ: Số : {{ yardLocation.apartmentNumber }}, Đường:
        {{ yardLocation.streetName }}, Phường:{{ yardLocation.wardName }}, Quận
        {{ yardLocation.districtName }}
      </p>
      <p class="card-text">Số điện thoại: {{ yardLocation.note }}</p>

      <router-link
        :to="{ name: 'EditAddress', params: { id: yardLocation.id } }"
        v-show="$route.name == 'Address'"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddressBox",
  props: ["yardLocation"],
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
