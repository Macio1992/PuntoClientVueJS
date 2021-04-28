<template>
  <div class="container main">
    <div class="row">
      <div class="board col-8">
        <button v-if="players.length < 4" @click="joinGame()">Join Game</button>
      </div>
      <div class="players col-4" v-if="players.length > 0">
        <ul class="playersList row">
          <li
            v-for="player in players"
            :key="player.id"
            :class="[`player player--${player.color} col-6`]">{{ player.playerName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import env from "./environment/environment";

export default {
  name: "App",
  data() {
    return {
      socket: {},
      players: [],
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

    this.socket.on(SEND_PLAYERS, players => {
      this.players = players;
    });
  },
  methods: {
    joinGame() {
      const { SERVER, CLIENT } = this.dictionary;
      const { SEND_PLAYERS } = SERVER;
      const { JOIN_GAME } = CLIENT;

      this.socket.emit(JOIN_GAME);
      this.socket.on(SEND_PLAYERS, players => {
        this.players = players;
      });
    },
  },
};
</script>

<style lang="scss">
  @import "App.scss";
</style>
