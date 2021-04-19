<template>
  <div class="main">
    <div class="board">
      <button v-if="players.length < 4" @click="generatePlayerName()">Generate name for you</button>
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

  export default {
    name: "App",
    data() {
      return {
        socket: {},
        players: [],
      };
    },
    created() {
      this.socket = io("http://localhost:3000");
    },
    mounted() {
      this.socket.on("send players", (players) => {
        console.log("Players on client side ", players);
        this.players = players;
      });
    },
    methods: {
      generatePlayerName() {
        this.socket.emit("create player");
        this.socket.on("send players", (players) => {
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
