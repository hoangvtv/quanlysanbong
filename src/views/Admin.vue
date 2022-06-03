<template>
  <div class="text-center mt-3">
    <router-link :to="{ name: 'Category' }">
      <button class="btn btn-primary btn-lg">Admin Category</button>
    </router-link>

    <br />

    <router-link :to="{ name: 'SoccerFlied' }">
      <button class="btn btn-primary btn-lg">Admin Soccer</button>
    </router-link>

    <br />

    <router-link :to="{ name: 'Address' }">
      <button class="btn btn-primary btn-lg">Admin Address</button>
    </router-link>
    <br />

    <router-link :to="{ name: 'SoccerService' }">
      <button class="btn btn-primary btn-lg">Admin Service</button>
    </router-link>

    <br />

    <router-link :to="{ name: 'Merchandise' }">
      <button class="btn btn-primary btn-lg">Admin Merchandise</button>
    </router-link>

    <br />

    <router-link :to="{ name: 'ListUser' }">
      <button class="btn btn-primary btn-lg">Admin User</button><br />
    </router-link>

    <router-link :to="{ name: 'Bill' }">
      <button class="btn btn-primary btn-lg">Admin Bill</button>
    </router-link>

    <br />

    <router-link :to="{ name: '' }">
      <button class="btn btn-primary btn-lg">Admin Match</button>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style>
.btn {
  margin-bottom: 20px;
}
</style>
