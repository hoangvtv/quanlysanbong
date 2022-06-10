<template>
  <div class="container">
    <h2 class="pt-4 pl-4 text-center" style="font-size: 26px; margin: 0 auto">
      List User
    </h2>
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
        :items="listUser"
        :search="search"
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
                        <label>Quyền</label>
                        <select class="form-control" v-model="role" required>
                          <option
                            v-for="role in roles"
                            :key="role.id"
                            :value="role.id"
                          >
                            {{ role.name }}
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
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            style="align-items: center"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert";
export default {
  data: () => ({
    search: "",
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
    roles: [
      { id: 1, name: "MANAGER" },
      { id: 2, name: "ADMIN" },
      { id: 3, name: "USER" },
    ],

    role: null,
    editedIndex: -1,
    editedItem: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "",
    },
    defaultItem: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "",
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

    role: {
      deep: true,
      handler(val) {
        this.editedItem.role = val;
      },
    },
  },

  created() {
    this.getListUser();
  },

  methods: {
    getListUser() {
      axios
        .get("http://localhost:8081/user/list")
        .then((res) => {
          this.listUser = res.data;
        })
        .catch((err) => console.log("err", err));
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await axios
          .put(
            `http://localhost:8081/user/update/${this.editedItem.id}/${this.role}`
          )
          .then(() => {
            Swal({
              text: "User has been updated!",
              icon: "success",
            });
            this.getListUser();
          })
          .catch((err) => console.log("err", err));
      }
      this.close();
    },
  },
};
</script>
