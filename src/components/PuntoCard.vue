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
import colors from "../assets/dictionaries/_colors";
import boards from '../assets/dictionaries/_boards';

export default {
  name: "PuntoCard",
  props: {
    option: String,
    color: String,
  },
  methods: {
    setClass(dot) {
      const {
        RED_COLOR,
        ORANGE_COLOR,
        GREEN_COLOR,
        BLUE_COLOR,
      } = colors;

      return {
        puntoCard__dotWithColor: dot === ".",
        "puntoCard__dotWithColor--red":
          this.color === RED_COLOR && dot === ".",
        "puntoCard__dotWithColor--blue":
          this.color === BLUE_COLOR && dot === ".",
        "puntoCard__dotWithColor--green":
          this.color === GREEN_COLOR && dot === ".",
        "puntoCard__dotWithColor--orange":
          this.color === ORANGE_COLOR && dot === ".",
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
        NINE_DOT_CARD,
      } = cards;

      const {
        ONE_DOT_BOARD,
        TWO_DOT_BOARD,
        THREE_DOT_BOARD,
        FOUR_DOT_BOARD,
        FIVE_DOT_BOARD,
        SIX_DOT_BOARD,
        SEVEN_DOT_BOARD,
        EIGHT_DOT_BOARD,
        NINE_DOT_BOARD,
        DEFAULT_BOARD,
      } = boards;

      switch (this.option) {
        case ONE_DOT_CARD: {
          return ONE_DOT_BOARD;
        }
        case TWO_DOT_CARD: {
          return TWO_DOT_BOARD;
        }
        case THREE_DOT_CARD: {
          return THREE_DOT_BOARD;
        }
        case FOUR_DOT_CARD: {
          return FOUR_DOT_BOARD;
        }
        case FIVE_DOT_CARD: {
          return FIVE_DOT_BOARD;
        }
        case SIX_DOT_CARD: {
          return SIX_DOT_BOARD;
        }
        case SEVEN_DOT_CARD: {
          return SEVEN_DOT_BOARD;
        }
        case EIGHT_DOT_CARD: {
          return EIGHT_DOT_BOARD;
        }
        case NINE_DOT_CARD: {
          return NINE_DOT_BOARD;
        }
        default: {
          return DEFAULT_BOARD;
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "PuntoCard.scss";
</style>
