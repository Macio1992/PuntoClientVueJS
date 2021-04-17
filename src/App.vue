<template>
  <h1>Hello Punto Game!</h1>
  <button @click="generatePlayerName()">Generate name for you</button>
  <div class="users">
    <ul>
      <li v-for="player in players" v-bind:key="player.id" :class="player.color">
        {{ player.playerName }}
      </li>
    </ul>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: 'App',
    data() {
      return {
        socket: {},
        players: []
      }
    },
    created() {
      this.socket = io('http://localhost:3000');
    },

    mounted() {
      this.socket.on('send players', players => {
        console.log('Players on client side ', players);
        this.players = players;
      });
    },
    methods: {
      generateString() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      },
      generatePlayerName() {
        this.socket.emit('create player', this.generateString());
        this.socket.on('send players', players => {
          console.log('Players on client side ', players);
          this.players = players;
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .blue {
    color: blue;
  }
  .orange {
    color: orange;
  }
</style>
