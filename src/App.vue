<template>
  <div>
    <Spinner v-if="loading" class="flex h-screen w-screen justify-content-center items-center"/>
    <div >
      <RouterView />
    </div>
  </div>

</template>
<script >
import Spinner from "@/components/SpinnerGreen.vue";

export default {
  name: 'App',
  components: {Spinner},
  data() {
    return {
      loading: false
    }
  },


  created() {
    this.loading = true
    this.$store.dispatch('getFretes').finally(() => {
      setTimeout(() =>{
        this.loading = false
      }, 400)
    })
    this.$store.dispatch('getVeiculos').finally(() => {
          setTimeout(() =>{
            this.loading = false
          }, 400)})
  },
}
</script>

<style>

</style>
