<template>
  <div class="container">
    <v-app>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listMatch"
        sort-by="calories"
        class="elevation-1 mt-3"
        :search="search"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ new Date(item.startDate).toLocaleDateString() }}</td>
              <td>{{ item.user.firstName }}</td>
              <td>{{ item.yardLocation.name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ new Date(item.startTime).toLocaleTimeString() }}</td>
              <td>{{ new Date(item.endTime).toLocaleTimeString() }}</td>
              <td>
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="font-size: 26px"
              >List Match</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="time"
                          min="0"
                          v-model="editedItem.serviceMoney"
                          label="Start Time"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="time"
                          min="0"
                          v-model="editedItem.merchandiseMoney"
                          label="End Time"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>

      <v-card-title>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label style="font-size: 1rem; font-weight: 600"
                >Start Date</label
              >
              <input
                type="date"
                class="form-control"
                v-model="startDate"
                required
              />
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label style="font-size: 1rem; font-weight: 600">End Date</label>
              <input
                type="date"
                class="form-control"
                v-model="endDate"
                required
              />
            </div>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-4" style="margin: 35px auto">
                <button class="btn btn-primary" @click="getMatchForDate">
                  Thống kê
                </button>
              </div>
            </div>
          </div>
        </div>
      </v-card-title>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert";
export default {
  data: () => ({
    search: "",
    token: null,
    startDate: "",
    endDate: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Ngày đá",
        align: "start",
        // sortable: false,
        value: "startDate",
      },
      { text: "Tên người lập", value: "user.firstName" },
      { text: "Tên sân", value: "yardLocation.name" },
      { text: "Khách hàng", value: "name" },
      { text: "Điện thoại", value: "phone" },
      { text: "Giờ đá", value: "startTime" },
      { text: "Giờ kết thúc", value: "endTime" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    listMatch: [],
    editedIndex: -1,
    editedItem: {
      matchDetails: null,
      serviceMoney: null,
      merchandiseMoney: null,
    },
    defaultItem: {
      matchDetails: null,
      serviceMoney: null,
      merchandiseMoney: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {},

  methods: {
    async getListMatchDate() {
      await axios
        .get("http://localhost:8081/match/listDate")
        .then((res) => {
          this.listMatch = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMatchForDate() {
      await axios
        .get("http://localhost:8081/match/getMatchForDate", {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        })
        .then((res) => {
          this.listMatch = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("item: " + item);
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("id:", this.editedItem.id);
      axios
        .delete("http://localhost:8081/match/delete/" + this.editedItem.id)
        .then(() => {
          Swal({
            text: "Match deleted successfully!",
            icon: "success",
          });
          this.getListMatchDate();
          this.closeDelete();
        })
        .catch((err) => {
          Swal({
            text: "The match has been billed!",
            icon: "error",
          });
          console.log(err);
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        // const bill = {
        //   matchDetails: this.editedItem.matchDetails,
        //   serviceMoney: this.editedItem.serviceMoney,
        //   merchandiseMoney: this.editedItem.merchandiseMoney,
        //   status: this.status,
        // };

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // const bill = {
        //   matchDetails: this.editedItem.matchDetails,
        //   serviceMoney: this.editedItem.serviceMoney,
        //   merchandiseMoney: this.editedItem.merchandiseMoney,
        //   status: this.status,
        // };
      }
      this.close();
    },
  },
  mounted() {
    this.getListMatchDate();
    this.token = localStorage.getItem("token");
  },
};
</script>
