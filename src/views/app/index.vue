<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
        <div class="copyright text-muted text-center mt-5"> Cloud Application <strong>v{{version}}</strong> Crafted by <a href="https://bitzania.com" target="_blank"> <strong>Bitzania</strong></a></div>
      </div>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/containers/Sidebar'
import TopNav from '@/containers/TopNav'
import { mapGetters } from 'vuex'

export default {
    data () {
        return { show: false }
    },
    components: {
        TopNav,
        Sidebar
    },
    computed: {
        ...mapGetters(['getMenuType']),
        version () {
            return process.env.VUE_APP_VERSION
        }
    }
}
</script>
