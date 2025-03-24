<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <p>Select game difficulty:</p>

    <!-- Кнопки выбора уровня сложности -->
    <button @click="setDifficulty('easy')">Easy: 8x8, 10 min</button>
    <button @click="setDifficulty('medium')">Medium: 16x16, 40 min</button>
    <button @click="setDifficulty('hard')">Hard: 32x16, 100 min</button>

    <!-- Пояснение к выбору -->
    <p v-if="selectedDifficulty">You selected: {{ selectedDifficulty }}</p>

    <!-- Кнопка "Back to Home" -->
    <button @click="goHome" class="back-btn">Back to Home</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const selectedDifficulty = ref('');
const router = useRouter();

// Функция для установки сложности
const setDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty;
  // Сохраняем выбор сложности в роутере, чтобы передать параметры в игру
  router.push({ path: '/game', query: { difficulty } });
};

// Функция для перехода на главную страницу
const goHome = () => {
  router.push("/"); // Переход на главную страницу
};
</script>

<style scoped>
.settings-container {
  text-align: center;
  color: white;
}

button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #ebe4e4;
}

p {
  margin-top: 20px;
}

.back-btn {
  background-color: black;
  font-size: 16px;
  margin-top: 20px;
}

.back-btn:hover {
  background-color: #ebe4e4;
}
</style>
