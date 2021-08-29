<template>
  <div class="container game">
    <div class="row">
      <div class="col-8">
        <button
          class="joinButton"
          v-if="!player.playerJoined"
          @click="joinGame()"
        >
          Join Game
        </button>
        <Board
          v-if="player.playerColor && !$testMode"
          :card="generatedCard"
          :color="player.playerColor"
          @setActivePlayer="setActivePlayer($event)"
        />
      </div>
      <div class="col-4">
        <ul class="players d-flex m-0 p-0" v-if="players.length > 0">
          <li
            v-for="player in players"
            :key="player.id"
            :class="[
              `player player--${player.color} ${
                player.color === activePlayer ? 'active' : ''
              } mt-2`,
            ]"
          ></li>
        </ul>
        <p
          v-if="player.playerColor"
          :class="[`player player--${player.playerColor} mt-5`]"
        ></p>
        <button @click="generateCard()" class="my-2">Generate card</button>
        <PuntoCard
          v-if="generatedCard"
          :card="generatedCard"
          :color="player.playerColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PuntoCard from "./PuntoCard";
import Board from "./Board";
import dictionary from "../assets/dictionaries/_socketActionsDictionary";
import cards from "../assets/dictionaries/_cards";

export default {
  name: "Game",
  components: {
    PuntoCard,
    Board,
  },
  data() {
    return {
      players: [],
      player: {
        playerJoined: false,
        playerColor: "",
      },
      generatedCard: "",
      activePlayer: "",
    };
  },
  mounted() {
    const { SERVER } = dictionary;
    const { SEND_PLAYERS } = SERVER;
    this.$socketio.on(SEND_PLAYERS, (players) => {
      this.players = players;
    });
  },
  methods: {
    generateIndex(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    generateCard() {
      const cardsValues = Object.values(cards);
      const randomIndex = this.generateIndex(0, cardsValues.length);
      this.generatedCard = cardsValues[randomIndex];
    },
    joinGame() {
      const { SERVER, CLIENT } = dictionary;
      const { SEND_PLAYERS, SEND_PLAYER_COLOR } = SERVER;
      const { JOIN_GAME } = CLIENT;

      this.$socketio.emit(JOIN_GAME);
      this.$socketio.on(SEND_PLAYERS, (players) => {
        this.players = players;
        this.player.playerJoined = true;
      });
      this.$socketio.on(SEND_PLAYER_COLOR, (color) => {
        this.player.playerColor = color;
      });
    },
    setActivePlayer(activePlayer) {
      this.activePlayer = activePlayer;
    },
  },
};
</script>

<style lang="scss">
@import "Game.scss";
</style>
