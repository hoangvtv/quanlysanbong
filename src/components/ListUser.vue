<template>
  <div class="container-fluid">
    <h2 class="pt-4 pl-4 text-center" style="font-size: 26px; margin: 0 auto">
      List User
    </h2>
    <v-app>
      <v-data-table
        :headers="headers"
        :items="listUser"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :items="roles"
                          v-model="role"
                          label="Quyền"
                        ></v-select>
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
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Email",
        align: "start",
        sortable: false,
        value: "email",
      },
      { text: "FirstName", value: "firstName" },
      { text: "LastName", value: "lastName" },
      { text: "Phone", value: "phone" },
      { text: "Quyền", value: "role.role" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    listUser: [],
    roles: [],
    role: "",
    editedIndex: -1,
    editedItem: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "",
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
    role(val) {
      // this.editedItem.role = val;
      // console.log(val);
      this.role = val;
      console.log(this.role);
    },
  },

  created() {
    this.getListUser();
    this.getListRole();
  },

  methods: {
    getListRole() {
      axios
        .get("http://localhost:8081/role/list")
        .then((response) => {
          // this.roles = response.data;
          response.data.forEach((item) => {
            this.roles.push(item.role);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getListUser() {
      axios
        .get("http://localhost:8081/user/list")
        .then((res) => {
          this.listUser = res.data;
        })
        .catch((err) => console.log("err", err));
    },

    editItem(item) {
      // console.log(item);
      // const user = {
      //   email: item.email,
      //   firstName: item.firstName,
      //   lastName: item.lastName,
      //   phone: item.phone,
      //   role: this.role,
      // };
      // console.log(user);

      this.editedIndex = this.listUser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listUser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.listUser.splice(this.editedIndex, 1);
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.listUser[this.editedIndex], this.editedItem);
      } else {
        this.listUser.push(this.editedItem);
      }
      this.close();
    },
  },

  mounted() {
    // this.getListUser();
  },
};
</script>
