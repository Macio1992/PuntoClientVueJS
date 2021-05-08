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
        <Board :option="generatedCard" :color="player.playerColor" />
      </div>
      <div class="col-4 playerArea">
        <div class="players" v-if="players.length > 0">
          <ul class="playersList row">
            <li
              v-for="player in players"
              :key="player.id"
              :class="[`player player--${player.color} col-6`]"
            ></li>
          </ul>
        </div>
        <button @click="generateCard()" class="my-2">Generate card</button>
        <PuntoCard
          v-if="generatedCard"
          :option="generatedCard"
          :color="player.playerColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import env from "../environment/environment";
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
      socket: {},
      players: [],
      player: {
        playerJoined: false,
        playerColor: "",
      },
      generatedCard: "",
    };
  },
  created() {
    const { SERVER_URL } = env;
    this.socket = io(SERVER_URL);
  },
  mounted() {
    const { SERVER } = dictionary;
    const { SEND_PLAYERS } = SERVER;
    this.socket.on(SEND_PLAYERS, (players) => {
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

      this.socket.emit(JOIN_GAME);
      this.socket.on(SEND_PLAYERS, (players) => {
        this.players = players;
        this.player.playerJoined = true;
      });
      this.socket.on(SEND_PLAYER_COLOR, (color) => {
        this.player.playerColor = color;
      });
    },
  },
};
</script>

<style lang="scss">
@import "Game.scss";
</style>
