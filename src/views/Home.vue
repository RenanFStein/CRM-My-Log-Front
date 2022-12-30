<template>
    <div class=" bg-lime-600 h-screen w-screen" :class="{
            'dashboard-on': $store.state.sideBar.statusBar,
            'dashboard-off': !$store.state.sideBar.statusBar,
            }">
    <Sidebar />
    <div class="bg-blue-50 rounded-lg my-1.5 mr-1.5 overflow-auto">
      <RouterView />
    </div>

  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {Sidebar},
  data() {
    return {

    }
  },

  methods: {

  },

}
</script>

<style>
.dashboard-on {
  display: grid;
  grid-template-columns: 150px 1fr;
}
.dashboard-off {
  display: grid;
  grid-template-columns: 65px 1fr;
}


</style>