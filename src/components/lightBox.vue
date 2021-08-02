<template>
  <div class="bg" @click.self="closeLightBox">
    <div class="myContainer" @click.self="closeLightBox">
      <slot>
        <!-- <splide
          :options="primaryOptions"
          ref="primary"
          @click.self="closeLightBox"
        >
          <splide-slide v-for="slide in slides" :key="slide.src">
            <img :src="slide.src" alt="slide.alt" />
          </splide-slide>
        </splide>
        <splide :options="secondaryOptions" ref="secondary">
          <splide-slide v-for="slide in slides" :key="slide.src">
            <img :src="slide.src" alt="slide.alt" />
          </splide-slide>
        </splide> -->
      </slot>
    </div>
  </div>
</template>

<script>
// import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: "lightBox",
  components: {
    // Splide,
    // SplideSlide,
  },
  props: ["parentIdx"],
  data() {
    return {
    };
  },
  mounted() {
    // Set the sync target.
    // this.$refs.primary.sync(this.$refs.secondary.splide);
  },
  methods: {
    closeLightBox() {
      this.$emit("update", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0.1rem);
  display: flex;
  justify-content: center;
  align-self: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  .myContainer {
    width: 95%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
}
  }
  .splide {
    padding: 1rem 3em;
    margin: 0 auto;
   
  }
  .splide__slide img {
    width: 100%;
    height: auto;
  }
  .splide__track{
      width: 100%;
      margin: 0 auto;
  }
}
</style>