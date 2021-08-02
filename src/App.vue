<template>
  <Nav />
  <router-view />

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
    console.log(this.$store.state.logIn)
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
