<script setup>

</script>

<template>
    <div class="p-5 mb-4 bg-gray-100 rounded-lg shadow-sm">
        <div class="container mx-auto py-5">
            <h1 class="text-4xl font-bold">FULLSTACK DEVELOPER</h1>
            <p class="text-xl">Technical Tes Mustika</p>
            <hr class="my-4" />
            <router-link :to="{ name: 'register' }"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg mr-3">Register</router-link>
            <router-link :to="{ name: 'login' }"
                class="bg-gray-500 text-white py-2 px-4 rounded-lg text-lg">Login</router-link>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
