<template>
  <div>
    <h1>Leaderboard</h1>
    <router-link class="home_back" to="/">Back to Home</router-link>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Score</th>
          <th>Duration (s)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leader, index) in leaders" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ leader.playerName }}</td>
          <td>{{ leader.score }}</td>
          <td>{{ leader.duration }}</td>
          <td>{{ leader.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const leaders = ref([]);

onMounted(() => {
  leaders.value = JSON.parse(localStorage.getItem("leaders")) || [];
});
</script>

<style scoped>
table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: black;
  color: white;
}
h1
{
  text-align: center;
}
.home_back
{

  color: black;
}
</style>

