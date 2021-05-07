<template>
  <div class="container game">
    <div class="row">
      <div class="col-8">
        <button class="joinButton" v-if="!playerJoined" @click="joinGame()">
          Join Game
        </button>
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
        <button @click="generateCard()" class="my-2">
          Generate card
        </button>
        <PuntoCard v-if="generatedCard" :option="generatedCard" color="red" />
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import env from "../environment/environment";
import PuntoCard from "./PuntoCard";

export default {
  name: "Game",
  components: {
    PuntoCard,
  },
  data() {
    return {
      socket: {},
      players: [],
      playerJoined: false,
      generatedCard: "",
      dictionary: {
        CLIENT: {
          JOIN_GAME: "JoinGame",
        },
        SERVER: {
          SEND_PLAYERS: "SendPlayers",
        },
      },
    };
  },
  created() {
    const { SERVER_URL } = env;
    this.socket = io(SERVER_URL);
  },
  mounted() {
    const { SERVER } = this.dictionary;
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
      const cards = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      const randomIndex = this.generateIndex(0, cards.length);
      this.generatedCard = cards[randomIndex];
    },
    joinGame() {
      const { SERVER, CLIENT } = this.dictionary;
      const { SEND_PLAYERS } = SERVER;
      const { JOIN_GAME } = CLIENT;

      this.socket.emit(JOIN_GAME);
      this.socket.on(SEND_PLAYERS, (players) => {
        this.players = players;
        this.playerJoined = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "Game.scss";
</style>
