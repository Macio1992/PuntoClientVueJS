<template>
  <div class="board d-flex flex-column">
    <div
      class="board__row d-flex"
      v-for="(boardRow, i) in board"
      :key="boardRow"
    >
      <div
        class="board__cell m-1"
        v-for="(boardCell, j) in boardRow"
        :key="boardCell"
        @click="setCell(i, j)"
      >
        <template v-if="board[i][j] !== ''">
          <PuntoCard :option="board[i][j]" :color="color" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PuntoCard from "./PuntoCard";

export default {
  name: "Board",
  components: {
    PuntoCard,
  },
  props: {
    option: String,
    color: String,
  },
  methods: {
    setCell(i, j) {
      this.board[i][j] = this.option;
    },
  },
  data() {
    return {
      board: [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
      ],
    };
  },
};
</script>

<style lang="scss">
@import "Board.scss";
</style>
