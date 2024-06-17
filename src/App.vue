<script setup>

</script>

<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto">
        <router-link :to="{ name: 'home' }" class="text-white text-lg font-semibold">HOME</router-link>
      </div>
    </nav>

    <!-- Render router view -->
    <div class="container mx-auto mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
