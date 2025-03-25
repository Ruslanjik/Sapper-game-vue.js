<template>
  <div>
    <div class="tophav">
      <router-link class="txt settings" to="/settings">Settings</router-link>
      <p class="txt game_name">Sapper Game</p>
      <router-link class="txt lider_tables" to="/table">Table of Leaders</router-link>
    </div>

    <div v-if="$route.path === '/'" class="intro">
      <p class="intro-text">
        Welcome to the ultimate Sapper Game! Test your skills and strategy by avoiding hidden mines. Are you ready for the challenge?<br>
        Click on settings, choose the difficulty level and start the game!
      </p>
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const showTitle = ref(false);

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 500);
});
</script>

<style scoped>
.tophav {
  background-color: #222;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  position: relative;
}

.game_name {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.settings {
  margin-right: auto;
}

.lider_tables {
  margin-left: auto;
}

.txt {
  color: white;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  transition: color 0.3s ease, transform 0.3s ease;
}

.txt:hover {
  color: #5f5e5b;
  transform: scale(1.1);
  text-shadow: 0px 0px 8px rgba(248, 247, 245, 0.8);
}

.intro {
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(90deg, #8a8686, #000000);
  border-radius: 8px;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
