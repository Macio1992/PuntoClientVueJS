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
        <template v-if="board[i][j]">
          <PuntoCard :option="board[i][j].option" :color="board[i][j].color" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PuntoCard from "./PuntoCard";
import dictionary from "../assets/dictionaries/_socketActionsDictionary";

export default {
  name: "Board",
  components: {
    PuntoCard,
  },
  props: {
    option: String,
    color: String,
    socket: Object,
  },
  mounted() {
    const { SERVER } = dictionary;
    const { SEND_BOARD_SERVER } = SERVER;

    this.socket.on(SEND_BOARD_SERVER, (board) => {
      this.board = board;
    });
  },
  methods: {
    setCell(i, j) {
      const { SERVER, CLIENT } = dictionary;
      const { SEND_BOARD_SERVER } = SERVER;
      const { SEND_BOARD_CLIENT } = CLIENT;

      this.board[i][j] = {
        color: this.color,
        option: this.option,
      };
      this.socket.emit(SEND_BOARD_CLIENT, this.board);
      this.socket.on(SEND_BOARD_SERVER, (board) => {
        this.board = board;
      });
    },
  },
  data() {
    return {
      board: [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
    };
  },
};
</script>

<style lang="scss">
@import "Board.scss";
</style>
