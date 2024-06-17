<script setup>
//import ref and onMounted
import { ref, onMounted } from 'vue';

//import sidebar component
import SidebarMenu from '../../components/SidebarMenu.vue'

//import js cookie
import Cookies from 'js-cookie'

//init user
const user = ref(null);

onMounted(() => {
    // Get user data from cookies
    const userData = Cookies.get('user');
    if (userData) {
        user.value = JSON.parse(userData);
    }
});
</script>

<template>
    <div class="container mx-auto mt-5 mb-5">
        <div class="flex">
            <div class="w-1/4">
                <SidebarMenu />
            </div>
            <div class="w-3/4">
                <div class="bg-white rounded shadow-md">
                    <div class="border-b p-4">
                        DASHBOARD
                    </div>
                    <div class="p-4">
                        Selamat Datang, <strong>{{ user?.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
