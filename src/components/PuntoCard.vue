<template>
  <div class="puntoCard">
    <div v-for="dotRow in dots" v-bind:key="dotRow" class="puntoCard__row">
      <div
        v-for="dot in dotRow"
        v-bind:key="dot"
        class="puntoCard__dot"
        :class="{ dotWithColor: dot === '.' }">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PuntoCard",
  data() {
    return {
      dots: [],
    }
  },
  props: {
    option: String,
  },
  mounted() {
    switch (this.option) {
      case 'one': {
        this.dots = [
          ['.', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];

        break;
      }
      case 'two': {
        this.dots = [
          ['.', '', ''],
          ['', '', ''],
          ['', '', '.'],
        ];

        break;
      }
      case 'three': {
        this.dots = [
          ['', '', '.'],
          ['', '.', ''],
          ['.', '', ''],
        ];

        break;
      }
      case 'four': {
        this.dots = [
          ['.', '', '.'],
          ['', '', ''],
          ['.', '', '.'],
        ];

        break;
      }
      case 'five': {
        this.dots = [
          ['.', '', '.'],
          ['', '.', ''],
          ['.', '', '.'],
        ];

        break;
      }
      case 'six': {
        this.dots = [
          ['.', '.', '.'],
          ['', '', ''],
          ['.', '.', '.'],
        ];

        break;
      }
      case 'seven': {
        this.dots = [
          ['.', '.', '.'],
          ['', '.', ''],
          ['.', '.', '.'],
        ];

        break;
      }
      case 'eight': {
        this.dots = [
          ['.', '.', '.'],
          ['.', '', '.'],
          ['.', '.', '.'],
        ];

        break;
      }
      case 'nine': {
        this.dots = [
          ['.', '.', '.'],
          ['.', '.', '.'],
          ['.', '.', '.'],
        ];

        break;
      }

      default: {
        break;
      }
    }
  }
};
</script>
<style lang="scss">
@import "PuntoCard.scss";
</style>
