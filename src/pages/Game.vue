<template>
    <div class="game-container">
      <h1>Sapper Game</h1>
      <p v-if="gameOver" class="game-over">💥 Game Over! You hit a mine! 💥</p>
      <p v-if="win" class="win">🎉 Congratulations! You win! 🎉</p>
  
      <div class="grid" :style="gridStyle">
        <div
          v-for="(cell, index) in grid"
          :key="index"
          class="cell"
          :class="{
            revealed: cell.revealed,
            mine: cell.mine && cell.revealed,
            flagged: cell.flagged,
          }"
          @click="revealCell(index)"
          @contextmenu.prevent="toggleFlag(index)"
        >
          <span v-if="cell.revealed && !cell.mine">{{ cell.neighborMines || "" }}</span>
          <span v-if="cell.revealed && cell.mine">💣</span>
          <span v-if="cell.flagged && !cell.revealed">🚩</span>
        </div>
      </div>
  
      <button @click="restartGame" class="restart-btn">Restart</button>
      <router-link to="/" class="back-btn">Back to Home</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  // Данные сложности
  const difficultySettings = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 32, cols: 16, mines: 100 },
  };
  
  // Настройки игры по умолчанию
  const grid = ref([]);
  const gameOver = ref(false);
  const win = ref(false);
  const rows = ref(0);
  const cols = ref(0);
  const totalMines = ref(0);
  
  // Чтение параметров сложности из URL
  const route = useRoute();
  
  onMounted(() => {
    const difficulty = route.query.difficulty || "easy"; // По умолчанию easy
    const { rows: rowCount, cols: colCount, mines } = difficultySettings[difficulty];
    rows.value = rowCount;
    cols.value = colCount;
    totalMines.value = mines;
  
    createGrid();
  });
  
  // Стиль для динамической сетки
  const gridStyle = computed(() => {
    return {
      gridTemplateColumns: `repeat(${cols.value}, 50px)`, // Количество столбцов
      gridTemplateRows: `repeat(${rows.value}, 50px)`, // Количество строк
    };
  });
  
  // Создание игрового поля
  function createGrid() {
    grid.value = Array.from({ length: rows.value * cols.value }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      neighborMines: 0,
    }));
  
    // Расставляем мины
    let minesPlaced = 0;
    while (minesPlaced < totalMines.value) {
      const index = Math.floor(Math.random() * grid.value.length);
      if (!grid.value[index].mine) {
        grid.value[index].mine = true;
        minesPlaced++;
      }
    }
  
    // Подсчёт мин вокруг
    grid.value.forEach((cell, index) => {
      if (!cell.mine) {
        const neighbors = getNeighbors(index);
        cell.neighborMines = neighbors.filter((i) => grid.value[i].mine).length;
      }
    });
  }
  
  // Функция нахождения соседних ячеек
  function getNeighbors(index) {
    const neighbors = [];
    const x = index % cols.value;
    const y = Math.floor(index / cols.value);
  
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
  
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < cols.value && ny >= 0 && ny < rows.value) {
          neighbors.push(ny * cols.value + nx);
        }
      }
    }
    return neighbors;
  }
  
  // Открытие ячейки
  function revealCell(index) {
    if (gameOver.value || grid.value[index].revealed || grid.value[index].flagged) return;
  
    grid.value[index].revealed = true;
  
    if (grid.value[index].mine) {
      gameOver.value = true;
    } else if (grid.value[index].neighborMines === 0) {
      getNeighbors(index).forEach((i) => revealCell(i));
    }
  
    checkWin();
  }
  
  // Установка/снятие флажка
  function toggleFlag(index) {
    if (gameOver.value || grid.value[index].revealed) return;
  
    grid.value[index].flagged = !grid.value[index].flagged;
    checkWin();
  }
  
  // Проверка на победу
  function checkWin() {
    const allMinesFlagged = grid.value
      .filter((cell) => cell.mine) // Фильтруем только мины
      .every((cell) => cell.flagged); // Проверяем, что все мины помечены флажками
  
    const allNonMinesRevealed = grid.value
      .filter((cell) => !cell.mine) // Фильтруем не минные ячейки
      .every((cell) => cell.revealed); // Проверяем, что все не минные ячейки открыты
  
    win.value = allMinesFlagged && allNonMinesRevealed;
  }
  
  // Перезапуск игры
  function restartGame() {
    gameOver.value = false;
    win.value = false;
    createGrid();
  }
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
    color: white;
  }
  
  .grid {
    display: grid;
    gap: 5px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .cell {
    width: 50px;
    height: 50px;
    background: #444;
    border: 2px solid #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
  }
  
  .cell.revealed {
    background: #888;
    border: 2px solid #bbb;
  }
  
  .cell.mine {
    background: red;
  }
  
  .cell.flagged {
    background: #444;
  }
  
  .game-over {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
  
  .win {
    color: green;
    font-size: 20px;
    font-weight: bold;
  }
  
  .restart-btn,
  .back-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .back-btn {
    background:black;
    margin-left: 10px;
  }
  </style>