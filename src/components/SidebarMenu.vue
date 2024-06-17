<script setup>
// import useRouter from vue-router
import { useRouter } from 'vue-router'

// initialize router
const router = useRouter()

// import Cookies from js-cookie
import Cookies from 'js-cookie'

// method to handle logout
const logout = () => {

    //remove token and user on cookies
    Cookies.remove('token')
    Cookies.remove('user')

    // redirect to login
    router.push({ name: 'login' })
}
</script>

<template>
    <div class="bg-white rounded shadow-md mr-5">
        <div class="border-b p-4">
            Order App
        </div>
        <div class="p-4">
            <div class="flex flex-col space-y-2">
                <router-link :to="{ name: 'dashboard' }" class="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</router-link>
                <router-link :to="{ name: 'users.index' }" class="block px-4 py-2 rounded hover:bg-gray-100">Users</router-link>
                <router-link :to="{ name: 'orders.index' }" class="block px-4 py-2 rounded hover:bg-gray-100">Orders</router-link>
                <a href="#" @click="logout" class="block px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700">Logout</a>
            </div>
        </div>
    </div>
</template>
