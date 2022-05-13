<template>
  <div id="manufacturersWrapper" class="container mx-auto mt-5">
    <h1 class="font-bold text-lg">Manufacturer Manager</h1>

    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-2 border-r-4 border-gray-200 mt-3 p-2">
        <div>Add Manufacturer</div>
        <form action="#" @submit.prevent="addManufacturer">
          <div class="block">
            <label class="text-sm" for="name">Name:</label>
            <input type="text" class="border border-gray-300 px-2 py-1" v-model="color" placeholder="Enter manufacturer...">
            <p v-if="error.length > 0" id="error" class="text-red-500 text-sm">{{ error }}</p>
          </div>
          <div class="block mt-2">
            <button type="submit" class="text-sm border border-gray-300 hover:bg-green-300 hover:text-white px-2 py-1">Add</button>
          </div>
        </form>
      </div>
      <div class="col-span-10">
        <div id="color-list" class="grid grid-cols-10 gap-2 mt-3">
          <div v-for="manufacturer in this.$store.getters.getManufacturers" :key="manufacturer.id" class="capitalize col-span-1 border border-gray-200 flex justify-center py-10 cursor-pointer hover:bg-green-200 relative">
            <span class="text-right absolute top-0 right-0 mr-2" @click="deleteManufacturer(manufacturer.id)">x</span>
            {{ manufacturer.name }}
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
  name: 'TypesView',
  components: {
  },
  data() {
    return {
      color: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['addManufacturer']),
    addManufacturer: function () {
      let that = this
      const typeForm = new FormData()

      typeForm.append('name', this.color)

      axios.post('/manufacturers', typeForm).then((response) => {
        if (response.data.success) {
          this.$swal(this.color, 'A new manufacturer has been added.', 'success')

          this.color = ''
          this.error = ''
          this.$store.dispatch('getManufacturers');
        }
      }).catch((err) => {
          if(err.response.status == 422) {
              _.each(err.response.data.errors, function(value, key) {
                if(key == 'name'){
                  that.error = err.response.data.errors.name[0]; //NB: emailError is registered in Vue data 
                }
                  
              });
          }
      });
    },
    deleteManufacturer: function (id) {
      let that = this

      this.$swal({
        title: "Confirm Delete",
        text: "Are you sure you want to deleted the selected manufacturer?",
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
          axios.delete('/manufacturers/' + id).then(response => {
            if (response.data.success) {
              that.$swal('Delete Manufacturer', 'The selected manufacturer has been deleted.', 'success')
              that.$store.dispatch('getManufacturers')
            } else {
              that.$swal('Delete Manufacturer', 'Failed to delete selected manufacturer.', 'error')
            }
          })
        }
      })
    }
  }
}
</script>
