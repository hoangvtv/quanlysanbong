import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import AddCategory from "../views/Category/AddCategory.vue";
import Category from "../views/Category/Category.vue";
import EditCategory from "../views/Category/EditCategory.vue";
import Merchandise from "../views/Merchandise/Merchandise.vue";
import EditMerchandise from "../views/Merchandise/EditMerchandise.vue";
import AddMerchandise from "../views/Merchandise/AddMerchandise.vue";
import Address from "../views/Address/Address.vue";
import AddAddress from "../views/Address/AddAddress.vue";
import EditAddress from "../views/Address/EditAddress.vue";
import SoccerFlied from "../views/SoccerFlied/SoccerFlied.vue";
import AddSoccerFlied from "../views/SoccerFlied/AddSoccerFlied.vue";
import EditSoccerFlied from "../views/SoccerFlied/EditSoccerFlied.vue";
import SoccerService from "../views/SoccerService/SoccerService.vue";
import AddSoccerService from "../views/SoccerService/AddSoccerService.vue";
import EditSoccerService from "../views/SoccerService/EditSoccerService.vue";
import CreateMatch from "../views/Match/CreateMatch.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },

  //Category
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/admin/category/add",
    name: "AddCategory",
    component: AddCategory,
  },
  {
    path: "/admin/category/:id",
    name: "EditCategory",
    component: EditCategory,
  },

  //Merchandise
  {
    path: "/merchandise",
    name: "Merchandise",
    component: Merchandise,
  },
  {
    path: "/admin/merchandise/add",
    name: "AddMerchandise",
    component: AddMerchandise,
  },
  {
    path: "/admin/merchandise/:id",
    name: "EditMerchandise",
    component: EditMerchandise,
  },

  // Yard Location
  {
    path: "/address",
    name: "Address",
    component: Address,
  },
  {
    path: "/admin/address/add",
    name: "AddAddress",
    component: AddAddress,
  },
  {
    path: "/admin/address/:id",
    name: "EditAddress",
    component: EditAddress,
  },

  //SoccerFlied
  {
    path: "/soccerFlied",
    name: "SoccerFlied",
    component: SoccerFlied,
  },
  {
    path: "/admin/soccerFlied/add",
    name: "AddSoccerFlied",
    component: AddSoccerFlied,
  },
  {
    path: "/admin/address/:id",
    name: "EditSoccerFlied",
    component: EditSoccerFlied,
  },

  //Soccer Service
  {
    path: "/soccerService",
    name: "SoccerService",
    component: SoccerService,
  },
  {
    path: "/admin/soccerService/add",
    name: "AddSoccerService",
    component: AddSoccerService,
  },
  {
    path: "/admin/soccerService/:id",
    name: "EditSoccerService",
    component: EditSoccerService,
  },

  //Match
  {
    path: "/createMatch",
    name: "CreateMatch",
    component: CreateMatch,
  },

  //Account
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
