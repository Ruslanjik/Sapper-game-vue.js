<template>
  <div>
    <h1>Welcome to Sapper Game</h1>

    <button @click="saveGameResult">Finish Game</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const saveGameResult = () => {
  const playerName = prompt("Enter your name:", "Player");
  if (!playerName) return;
  
  const score = Math.floor(Math.random() * 100); // Генерация случайного счета
  const duration = Math.floor(Math.random() * 300); // Время игры в секундах

  const gameResult = { playerName, score, duration, date: new Date().toLocaleString() };

  let leaders = JSON.parse(localStorage.getItem("leaders")) || [];
  leaders.push(gameResult);
  leaders.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaders", JSON.stringify(leaders));

  alert("Game saved! Go to the leaderboard to see results.");
  router.push("/table");
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
}

p {
  text-align: center;
  color: gray;
}

button {
  display: block;
  margin: 20px auto;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover{
  background-color: #ebe4e4;

}

</style>