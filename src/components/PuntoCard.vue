<template>
  <div class="puntoCard">
    <div v-for="dotRow in dots" v-bind:key="dotRow" class="puntoCard__row">
      <div
        v-for="dot in dotRow"
        v-bind:key="dot"
        class="puntoCard__dot"
        :class="[
          {
            puntoCard__dotWithColor: dot === '.',
            'puntoCard__dotWithColor--red': color === 'red' && dot === '.',
            'puntoCard__dotWithColor--blue': color === 'blue' && dot === '.',
            'puntoCard__dotWithColor--green': color === 'green' && dot === '.',
            'puntoCard__dotWithColor--orange':
              color === 'orange' && dot === '.',
          },
        ]"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PuntoCard",
  props: {
    option: String,
    color: String,
  },
  computed: {
    dots() {
      switch (this.option) {
        case "one": {
          return [
            [".", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
        }
        case "two": {
          return [
            [".", "", ""],
            ["", "", ""],
            ["", "", "."],
          ];
        }
        case "three": {
          return [
            ["", "", "."],
            ["", ".", ""],
            [".", "", ""],
          ];
        }
        case "four": {
          return [
            [".", "", "."],
            ["", "", ""],
            [".", "", "."],
          ];
        }
        case "five": {
          return [
            [".", "", "."],
            ["", ".", ""],
            [".", "", "."],
          ];
        }
        case "six": {
          return [
            [".", ".", "."],
            ["", "", ""],
            [".", ".", "."],
          ];
        }
        case "seven": {
          return [
            [".", ".", "."],
            ["", ".", ""],
            [".", ".", "."],
          ];
        }
        case "eight": {
          return [
            [".", ".", "."],
            [".", "", "."],
            [".", ".", "."],
          ];
        }
        case "nine": {
          return [
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."],
          ];
        }
        default: {
          return [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "PuntoCard.scss";
</style>
