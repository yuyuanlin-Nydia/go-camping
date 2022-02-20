<template>
  <Nav />
  <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-if="!$route.meta.keepAlive" />

  <MyFooter />
</template>

<script>
import Nav from "./components/nav.vue";
import MyFooter from "./components/footer.vue";
import { mapMutations, mapState } from "vuex";


export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Nav,
    MyFooter,
  },
  created() {
  },
  methods: {
    ...mapMutations(["TOGGLE_NAV"]),
   
  },

  computed: {
    ...mapState(["navToggle"]),
  },
};
</script>

<style lang="scss">
</style>
