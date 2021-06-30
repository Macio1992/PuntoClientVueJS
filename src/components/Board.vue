<template>
  <div
    :class="[
      `board d-flex flex-column ${
        activePlayer !== color ? 'board--blocked' : ''
      }`,
    ]"
  >
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
    const { SEND_BOARD_SERVER, SEND_ACTIVE_PLAYER_SERVER } = SERVER;

    this.socket.on(SEND_BOARD_SERVER, (board) => {
      this.board = board;
    });

    this.socket.on(SEND_ACTIVE_PLAYER_SERVER, (activePlayer) => {
      this.activePlayer = activePlayer;
      this.$emit("setActivePlayer", this.activePlayer);
    });
  },
  methods: {
    setCell(i, j) {
      const { SERVER, CLIENT } = dictionary;
      const { SEND_BOARD_SERVER } = SERVER;
      const {
        SEND_BOARD_CLIENT,
        SEND_CARDS_CLIENT,
        SEND_NEXT_PLAYER_CLIENT,
      } = CLIENT;

      this.board[i][j] = {
        color: this.color,
        option: this.option,
      };
      this.socket.emit(SEND_BOARD_CLIENT, this.board);
      this.socket.on(SEND_BOARD_SERVER, (board) => {
        this.board = board;
      });
      const cardIndex = this.cards.indexOf(this.option);
      this.cards.splice(cardIndex, 1);
      this.socket.emit(SEND_CARDS_CLIENT, {
        color: this.color,
        cards: this.cards,
      });

      this.socket.emit(SEND_NEXT_PLAYER_CLIENT);
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
      cards: [
        "one_dot_card",
        "one_dot_card",
        "two_dot_card",
        "two_dot_card",
        "three_dot_card",
        "three_dot_card",
        "four_dot_card",
        "four_dot_card",
        "five_dot_card",
        "five_dot_card",
        "six_dot_card",
        "six_dot_card",
        "seven_dot_card",
        "seven_dot_card",
        "eight_dot_card",
        "eight_dot_card",
        "nine_dot_card",
        "nine_dot_card",
      ],
      activePlayer: "",
    };
  },
};
</script>

<style lang="scss">
@import "Board.scss";
</style>
