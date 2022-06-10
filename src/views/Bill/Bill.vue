<template>
  <div class="container">
    <v-app>
      <v-data-table
        :headers="headers"
        :items="listBill"
        class="elevation-1 mt-3"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ new Date(item.createdate).toLocaleDateString() }}</td>
              <td>{{ item.user.firstName }}</td>
              <td>{{ item.matchDetails.yardLocation.name }}</td>
              <td>{{ item.custommer }}</td>
              <td>{{ item.serviceMoney }}</td>
              <td>{{ item.merchandiseMoney }}</td>
              <td>{{ item.totalMoney }}</td>
              <td>
                {{ item.status == 1 ? "Đã thanh toán" : "Chưa thanh toán" }}
              </td>
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
            <v-toolbar-title style="font-size: 26px">List Bill</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Bill
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <label> Trận đấu</label>
                        <select
                          class="form-control"
                          v-model="editedItem.matchDetails"
                          required
                        >
                          <option
                            v-for="m in listMatch"
                            :key="m.id"
                            :value="m.id"
                          >
                            {{ m.soccerField.name }} : {{ m.name }}:
                            {{ m.yardLocation.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="editedItem.serviceMoney"
                          label="Tiền dịch vụ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="editedItem.merchandiseMoney"
                          label="Tiền hàng hóa"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <label>Trạng thái</label>
                        <select class="form-control" v-model="status" required>
                          <option
                            v-for="s in listStatus"
                            :key="s.id"
                            :value="s.id"
                          >
                            {{ s.name }}
                          </option>
                        </select>
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
        <!-- <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template> -->
      </v-data-table>

      <div class="row mt-5">
        <div class="col-4">
          <div class="form-group">
            <label style="font-size: 1rem; font-weight: 600">Start Date</label>
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
              <button class="btn btn-primary" @click="getListBill">
                Thống kê
              </button>
            </div>
            <div class="col-8">
              <div class="form-group">
                <label style="font-size: 1rem; font-weight: 600"
                  >Tổng tiền</label
                >
                <br />
                <span style="font-size: 1.5rem; font-weight: 600">
                  {{ formatPrice(moneyTotal) }} VND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert";
export default {
  data: () => ({
    token: null,
    moneyTotal: 0,
    startDate: "",
    endDate: "",
    listBill: [],
    listMatch: [],
    status: null,
    listStatus: [
      { id: 0, name: "Chưa thanh toán" },
      { id: 1, name: "Đã thanh toán" },
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Ngày lập",
        align: "start",
        sortable: false,
        value: "createdate",
      },
      { text: "Tên người lập", value: "user.firstName" },
      { text: "Tên sân", value: "matchDetails.yardLocation.name" },
      { text: "Khách hàng", value: "custommer" },
      { text: "Dịch vụ", value: "serviceMoney" },
      { text: "Hàng hóa", value: "merchandiseMoney" },
      { text: "Tổng tiền", value: "totalMoney" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      matchDetails: null,
      serviceMoney: null,
      merchandiseMoney: null,
      status: null,
    },
    defaultItem: {
      matchDetails: null,
      serviceMoney: null,
      merchandiseMoney: null,
      status: null,
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
    listBill: {
      deep: true,
      handler() {
        this.moneyTotal = 0;
        this.listBill.forEach((item) => {
          this.moneyTotal += item.totalMoney;
        });
      },
    },
  },

  methods: {
    formatPrice(price) {
      return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    async getBill() {
      await axios
        .get("http://localhost:8081/bill/list")
        .then((res) => {
          this.listBill = res.data;
          console.log("list Bill: " + this.listBill);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getListBill() {
      await axios
        .get("http://localhost:8081/bill/listDate", {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        })
        .then((res) => {
          this.listBill = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    totalMoney() {
      let total = 0;
      this.listBill.forEach((item) => {
        total += item.totalMoney;
      });
      this.moneyTotal = total;
    },

    async getListMatchDate() {
      await axios
        .get("http://localhost:8081/match/listDate")
        .then((res) => {
          this.listMatch = res.data;
          console.log("list match" + this.listMatch);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      console.log("item: " + this.editedItem);
      console.log("id: " + this.editedIndex);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listBill.indexOf(item.id);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      console.log(this.editedItem.id);
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
        const bill = {
          matchDetails: this.editedItem.matchDetails,
          serviceMoney: this.editedItem.serviceMoney,
          merchandiseMoney: this.editedItem.merchandiseMoney,
          status: this.status,
        };
        console.log("bill: ", bill);
        await axios
          .put(
            `http://localhost:8081/bill/update/${this.editedIndex}/${this.token}`,
            bill
          )
          .then(() => {
            Swal({
              text: "Bill has been updated!",
              icon: "success",
            });
            this.getBill();
          })
          .catch((err) => {
            console.log(err);
            Swal({
              text: "Bill has not been updated!",
              icon: "error",
            });
          });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        const bill = {
          matchDetails: this.editedItem.matchDetails,
          serviceMoney: this.editedItem.serviceMoney,
          merchandiseMoney: this.editedItem.merchandiseMoney,
          status: this.status,
        };

        await axios
          .post(`http://localhost:8081/bill/create/${this.token}`, bill)
          .then(() => {
            Swal({
              text: "Bill has been added",
              icon: "success",
            });
            this.getBill();
          })
          .catch((err) => {
            Swal({
              text: "Bill has been failed",
              icon: "error",
            });
            console.log(err);
          });
      }
      this.close();
    },
  },
  mounted() {
    this.getBill();
    // this.getListBill();
    this.getListMatchDate();
    this.token = localStorage.getItem("token");
  },
};
</script>
