<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <router-link :to="{ name: 'CreateMatch' }">
            <h3 class="mb-4 rounded" id="heading">
              <a class="bg-white px-2 py-2 rounded">
                Start setting up the pitch
              </a>
            </h3>
          </router-link>
          <p class="lead mb-0 bg-dark p-1 rounded">
            Nhóm 21:Phạm Tấn Hoàng N19DCAT032, Nguyễn Quang Vinh N19DCAT97, Trần
            Ngọc Sang N19DCAT065
          </p>
        </header>
      </div>
      <hr />
    </div>

    <!--    display Price -->
    <div class="container mt-2">
      <div class="col-12 text-center">
        <h2 class="pt-3">Stadium fee</h2>
      </div>
      <table class="table text-center">
        <thead>
          <tr>
            <th>Loại sân</th>
            <th>Giá tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sân 5</td>
            <td>160000 VND/h</td>
          </tr>
          <tr>
            <td>Sân 7</td>
            <td>230000 VND/h</td>
          </tr>
          <tr>
            <td>Sân 11</td>
            <td>360000 VND/h</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <!--    display yardLocation-->
    <div class="container mt-2">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">Yard Location</h2>
        </div>
      </div>
      <div class="row">
        <div
          v-for="index in this.yardLocationSize"
          :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-center d-flex"
        >
          <AddressBox :yardLocation="yardLocations[index - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressBox from "../components/AddressBox.vue";
export default {
  name: "Home",
  components: { AddressBox },
  props: ["yardLocations"],
  data() {
    return {
      yardLocationSize: 0,
    };
  },
  mounted() {
    this.yardLocationSize = Math.min(6, this.yardLocations.length);
  },
};
</script>
<style>
.page-holder {
  min-height: 100vh;
}
.bg-cover {
  background-size: cover !important;
}
#background-div {
  background: url("../assets/home.png");
}
#heading {
  font-weight: 400;
}
</style>
