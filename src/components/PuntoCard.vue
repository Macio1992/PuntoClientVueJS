<template>
  <div class="puntoCard d-flex flex-column">
    <div v-for="dotRow in dots" :key="dotRow" class="puntoCard__row d-flex">
      <div
        v-for="dot in dotRow"
        :key="dot"
        class="puntoCard__dot d-flex justify-content-center align-items-center"
        :class="setClass(dot)"
      ></div>
    </div>
  </div>
</template>
<script>
import cards from "../assets/dictionaries/_cards";

export default {
  name: "PuntoCard",
  props: {
    option: String,
    color: String,
  },
  methods: {
    setClass(dot) {
      return {
        puntoCard__dotWithColor: dot === ".",
        "puntoCard__dotWithColor--red": this.color === "red" && dot === ".",
        "puntoCard__dotWithColor--blue": this.color === "blue" && dot === ".",
        "puntoCard__dotWithColor--green": this.color === "green" && dot === ".",
        "puntoCard__dotWithColor--orange":
          this.color === "orange" && dot === ".",
      };
    },
  },
  computed: {
    dots() {
      const {
        ONE_DOT_CARD,
        TWO_DOT_CARD,
        THREE_DOT_CARD,
        FOUR_DOT_CARD,
        FIVE_DOT_CARD,
        SIX_DOT_CARD,
        SEVEN_DOT_CARD,
        EIGHT_DOT_CARD,
        NINE_DOT_CARD
      } = cards;

      switch (this.option) {
        case ONE_DOT_CARD: {
          return [
            [".", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
        }
        case TWO_DOT_CARD: {
          return [
            [".", "", ""],
            ["", "", ""],
            ["", "", "."],
          ];
        }
        case THREE_DOT_CARD: {
          return [
            ["", "", "."],
            ["", ".", ""],
            [".", "", ""],
          ];
        }
        case FOUR_DOT_CARD: {
          return [
            [".", "", "."],
            ["", "", ""],
            [".", "", "."],
          ];
        }
        case FIVE_DOT_CARD: {
          return [
            [".", "", "."],
            ["", ".", ""],
            [".", "", "."],
          ];
        }
        case SIX_DOT_CARD: {
          return [
            [".", ".", "."],
            ["", "", ""],
            [".", ".", "."],
          ];
        }
        case SEVEN_DOT_CARD: {
          return [
            [".", ".", "."],
            ["", ".", ""],
            [".", ".", "."],
          ];
        }
        case EIGHT_DOT_CARD: {
          return [
            [".", ".", "."],
            [".", "", "."],
            [".", ".", "."],
          ];
        }
        case NINE_DOT_CARD: {
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
