<template>
  <div class="container">
    <div class="col-12 text-center mt-1">
      <h3 class="pt-3" style="font-size: 26px">Your Match</h3>
    </div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="listMatch" :search="search">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.yardLocation.name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ new Date(item.startDate).toLocaleDateString() }}</td>
              <td>{{ new Date(item.startTime).toLocaleTimeString() }}</td>
              <td>{{ new Date(item.endTime).toLocaleTimeString() }}</td>
            </tr>
          </tbody>
        </template></v-data-table
      >
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Tên sân",
          align: "start",
          filterable: false,
          value: "yardLocation.name",
        },
        { text: "Người đặt", value: "name" },
        { text: "Ngày đá", value: "startDate" },
        { text: "Giờ đá", value: "startTime" },
        { text: "Giờ kết thúc", value: "endTime" },
        // { text: "Iron (%)", value: "iron" },
      ],
      listMatch: [],
      token: null,
    };
  },

  methods: {
    getMatchForUser() {
      axios
        .get(`http://localhost:8081/match/${this.token}`)
        .then((res) => {
          this.listMatch = res.data;
          console.log("listMatch: " + this.listMatch);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.getMatchForUser();
  },
};
</script>
