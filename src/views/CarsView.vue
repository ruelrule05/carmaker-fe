<template>
  <div id="carsWrapper" class="container mx-auto mt-5">
    <h1 class="font-bold text-lg">Cars Manager</h1>

    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-3 border-r-4 border-gray-200 mt-3 p-2">
        <div>Add Car</div>
        <form action="#" @submit.prevent="addCar">
            <div class="block">
                <label class="text-sm" for="color">Color:</label>
                <select class="block w-full capitalize border border-gray-300 px-2 py-1" v-model="color">
                    <option v-for="color in this.$store.getters.getColors" :key="color.id" :value="color.id">{{ color.name }}</option>
                </select>
                <p v-if="colorError.length > 0" id="error" class="text-red-500 text-sm">{{ colorError }}</p>
            </div>
            <div class="block mt-2">
                <label class="text-sm" for="type">Type:</label>
                <select class="block w-full capitalize border border-gray-300 px-2 py-1" v-model="carType">
                    <option v-for="carType in this.$store.getters.getCarTypes" :key="carType.id" :value="carType.id">{{ carType.name }}</option>
                </select>
                <p v-if="carTypeError.length > 0" id="error" class="text-red-500 text-sm">{{ carTypeError }}</p>
            </div>

            <div class="block mt-2">
                <label class="text-sm" for="manufacturer">Manufacturer:</label>
                <select class="block w-full capitalize border border-gray-300 px-2 py-1" v-model="manufacturer">
                    <option v-for="manufacturer in this.$store.getters.getManufacturers" :key="manufacturer.id" :value="manufacturer.id">{{ manufacturer.name }}</option>
                </select>
                <p v-if="manufacturerError.length > 0" id="error" class="text-red-500 text-sm">{{ manufacturerError }}</p>
            </div>
            <div class="block mt-2">
                <label class="text-sm" for="name">Name:</label>
                <input type="text" class="border block  w-full border-gray-300 px-2 py-1" v-model="name" placeholder="Enter name...">
                <p v-if="error.length > 0" id="error" class="text-red-500 text-sm">{{ error }}</p>
            </div>
            <div class="block mt-2">
                <button type="submit" class="text-sm border border-gray-300 hover:bg-green-300 hover:text-white px-2 py-1">Add</button>
            </div>
        </form>
      </div>
      <div class="col-span-9">
        <div id="color-list" class="grid grid-cols-12 gap-2 mt-3">
          <div v-for="car in this.$store.getters.getCars" :key="car.id" class="capitalize col-span-3 border border-gray-200 py-10 cursor-pointer hover:bg-green-200 relative">
            <span class="text-right absolute top-0 right-0 mr-2" @click="deleteCar(car.id)">x</span>
            <p class="flex justify-center font-extrabold text-2xl">{{ car.name }}</p>
            <div class="block mt-5 px-2">
                <p class="text-sm">Type: <span class="font-bold text-sm">{{ car.car_type }}</span></p>
                <p class="text-sm">Color: <span class="font-bold text-sm">{{ car.color }}</span></p>
                <p class="text-sm">Manufacturer: <span class="font-bold text-sm">{{ car.manufacturer }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import * as _ from 'lodash'

export default {
  name: 'CarsView',
  components: {
  },
  data() {
    return {
        color: null,
        carType: null,
        manufacturer: null,
        name: '',
        error: '',
        colorError: '',
        carTypeError: '',
        manufacturerError: ''
    }
  },
  methods: {
    ...mapActions(['addCar']),
    addCar: function () {
      let that = this
      const carForm = new FormData()

        this.error = ''
        this.colorError = ''
        this.carTypeError = ''
        this.manufacturerError = ''

      carForm.append('name', this.name)
      carForm.append('color_id', this.color)
      carForm.append('car_type_id', this.carType)
      carForm.append('manufacturer_id', this.manufacturer)

      axios.post('/cars', carForm).then((response) => {
        if (response.data.success) {
          this.$swal(this.name, 'A new car has been added.', 'success')

          this.name = ''
          this.$store.dispatch('getCars');
        }
      }).catch((err) => {
          if(err.response.status == 422) {
              _.each(err.response.data.errors, function(value, key) {
                if(key == 'name'){
                  that.error = err.response.data.errors.name[0]; //NB: emailError is registered in Vue data 
                }

                if (key == 'color_id'){
                    that.colorError = err.response.data.errors.color_id[0]
                }

                if (key == 'car_type_id'){
                    that.carTypeError = err.response.data.errors.car_type_id[0]
                }

                if (key == 'manufacturer_id'){
                    that.manufacturerError = err.response.data.errors.manufacturer_id[0]
                }
                  
              });
          }
      });
    },
    deleteCar: function (id) {
      let that = this

      this.$swal({
        title: "Confirm Delete",
        text: "Are you sure you want to deleted the selected car?",
        icon: "warning",
        buttons: {
          cancel: {
            text: 'No',
            closeModal: true,
            visible: true
          },
          confirm: {
            text: 'Yes',
            closeModal: true
          }
        }
      }).then(function(proceed) {
        if (proceed) {
          axios.delete('/cars/' + id).then(response => {
            if (response.data.success) {
              that.$swal('Delete Car', 'The selected car has been deleted.', 'success')
              that.$store.dispatch('getCars')
            } else {
              that.$swal('Delete Car', 'Failed to delete selected car.', 'error')
            }
          })
        }
      })
    }
  }
}
</script>
