<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3" style="font-size: 26px">Our Categories</h3>
        <router-link :to="{ name: 'AddCategory' }">
          <button class="btn btn-primary" style="float: right">
            Add Category
          </button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="category of categories"
        :key="category.id"
        class="col-xl-4 col-md-4 col-12 pt-3 d-flex"
      >
        <CategoryBox :category="category"> </CategoryBox>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryBox from "../../components/CategoryBox.vue";
export default {
  name: "Category",
  props: ["categories"],
  components: { CategoryBox },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
