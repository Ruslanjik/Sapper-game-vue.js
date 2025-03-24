<template>
  <div>
    <div class="tophav">
      <p class=" txt game_name">Sapper Game</p>
      <router-link class="txt settings" to="/settings"> Settings</router-link>
      <router-link class="txt lider_tables" to="/table">Table of Liders</router-link>
    </div>

    <router-view />  <!-- Здесь будет рендериться текущая страница (Home или Settings) -->
  </div>
</template>

<script setup>
// Здесь можно добавить логику, если нужно
</script>

<style scoped>
.tophav {
  background-color: black;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  justify-content: space-around;
}

.game_name {

  order:2;
}
.lider_tables{
  order:3;
}


.txt{
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: right;
 

}
</style>
