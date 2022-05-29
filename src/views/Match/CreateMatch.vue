<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3" style="font-size: 26px">Create Match</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label style="font-size: 1rem; font-weight: 600"
              >YardLocation</label
            >
            <select class="form-control" v-model="yardLocationId" required>
              <option
                v-for="yardLocation in yardLocations"
                :key="yardLocation.id"
                :value="yardLocation.id"
              >
                {{ yardLocation.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label style="font-size: 1rem; font-weight: 600">Category</label>
            <select class="form-control" v-model="categoryId" required>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <b-field label="Select a date">
              <b-datepicker
                placeholder="Click to select..."
                :min-date="minDate"
                :max-date="maxDate"
                v-model="dateMatch"
              >
              </b-datepicker>
            </b-field>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <b-field label="Start time">
                  <b-timepicker
                    placeholder="Click to select..."
                    :min-time="minTimeStart"
                    :max-time="maxTimeStart"
                    v-model="startTime"
                  >
                  </b-timepicker>
                </b-field>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <b-field label="End time">
                  <b-timepicker
                    placeholder="Click to select..."
                    :min-time="minTimeEnd"
                    :max-time="maxTimeEnd"
                    v-model="endTime"
                  >
                  </b-timepicker>
                </b-field>
              </div>
            </div>
          </div>
          <!-- <div class="form-group">
            <label>Start date </label>
            <input type="date" class="form-control" v-model="time" />
          </div> -->
          <button
            type="button"
            class="btn btn-primary"
            @click="findSoccerField"
          >
            Đặt sân
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const sweetalert = require("sweetalert");
export default {
  props: ["baseURL", "categories", "yardLocations"],
  data() {
    const today = new Date();
    const minStart = new Date();
    minStart.setHours();
    minStart.setMinutes(0);
    const maxStart = new Date();
    maxStart.setHours(22);
    maxStart.setMinutes(0);

    const minEnd = new Date();
    minEnd.setHours(minStart.getHours() + 1);
    minEnd.setMinutes(0);
    const maxEnd = new Date();
    maxEnd.setHours(minStart.getHours() + 2);
    maxEnd.setMinutes(0);

    return {
      date: new Date(),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      maxDate: new Date(today.getFullYear(), today.getMonth() + 1, 31),
      minTimeStart: minStart,
      maxTimeStart: maxStart,
      minTimeEnd: minEnd,
      maxTimeEnd: maxEnd,
      dateMatch: null,
      startTime: null,
      endTime: null,
      categoryId: null,
      yardLocationId: null,

      time: "",
    };
  },
  watch: {
    startTime() {
      console.log(this.startTime);
    },
  },

  methods: {
    // addYardLocation() {
    //   const newYardLocation = {
    //     name: this.name,
    //     apartmentNumber: this.apartmentNumber,
    //     streetName: this.streetName,
    //     wardName: this.wardName,
    //     districtName: this.districtName,
    //     note: this.note,
    //   };
    //   axios
    //     .post(this.baseURL + "yardLocation/create", newYardLocation)
    //     .then(() => {
    //       this.$emit("fetchData");
    //       this.$router.push({ name: "Address" });
    //       sweetalert({
    //         text: "YardLocation added successfully",
    //         icon: "success",
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //       sweetalert({
    //         text: "YardLocation added failed",
    //         icon: "error",
    //       });
    //     });
    // },
    formatHourse(date) {
      {
        try {
          let hour = date.getHours();
          let minutes = date.getMinutes();

          if (hour < 10) {
            hour = "0" + hour;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          return hour + ":" + minutes;
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    findSoccerField() {
      const newMatch = {
        yardLocationId: this.yardLocationId,
        categoryId: this.categoryId,
        matchDate: this.time,
        // startTime: this.formatHourse(this.startTime),
        // endTime: this.formatHourse(this.endTime),
        startTime: this.startTime,
        endTime: this.endTime,
      };
      console.log(newMatch);

      axios
        .post(this.baseURL + "match/findMatch", newMatch)
        .then(() => {
          this.$emit("fetchData");
          // this.$router.push({ name: "Match" });
          sweetalert({
            text: "Đặt sân thành công",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
          sweetalert({
            text: "Đặt sân thất bại",
            icon: "error",
          });
        });
    },
  },
};
</script>
<style scoped></style>
