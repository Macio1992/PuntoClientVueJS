<template>
  <div class="main">
    <div class="board">
      <button v-if="players.length < 4" @click="joinGame()">Join Game</button>
    </div>
    <div class="players">
      <ul class="playersList">
        <li
          v-for="player in players"
          :key="player.id"
          :class="[`player player--${player.color}`]"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import io from "socket.io-client";
  import env from './environment/environment';

  export default {
    name: "App",
    data() {
      return {
        socket: {},
        players: [],
        dictionary: {
          CLIENT: {
            JOIN_GAME: 'JoinGame'
          },
          SERVER: {
            SEND_PLAYERS: 'SendPlayers'
          }
        }
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
        console.log("Players on client side ", players);
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
          console.log("Players on client side ", players);
          this.players = players;
        });
      },
    },
  };
</script>

<style lang="scss">
  @import "App.scss";
</style>
