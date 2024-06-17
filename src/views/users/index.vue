<script setup>
// Import SidebarMenu component
import SidebarMenu from '../../components/SidebarMenu.vue';

// Import ref and onMounted
import { ref, onMounted, watch } from 'vue';

// Import js-cookie
import Cookies from 'js-cookie';

// Import api
import api from '../../services/api';

// Get token from cookies
const token = Cookies.get('token');

// Define state
const users = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = ref(5); // Items per page
const totalItems = ref(0); // Total number of items
const searchQuery = ref(''); // Search query

// Method fetchDataUsers
const fetchDataUsers = async (page = 1, query = '') => {
    const skip = (page - 1) * itemsPerPage.value;
    // Fetch data with pagination and search query
    api.defaults.headers.common['Authorization'] = token;
    await api.get(`/api/v1/users?take=${itemsPerPage.value}&skip=${skip}&q=${query}`)
        .then(response => {
            // Set response data to state "users"
            users.value = response.data.data;
            totalItems.value = response.data.total_items; // Assuming your API response includes total_items
            totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
        });
};

// Run hook "onMounted"
onMounted(() => {
    // Call method "fetchDataUsers"
    fetchDataUsers();
});

// Watch searchQuery and currentPage for changes
watch([searchQuery, currentPage], () => {
    fetchDataUsers(currentPage.value, searchQuery.value);
});

// Method deleteUser
const deleteUser = async (id) => {
    // Confirm delete
    if (confirm('Are you sure you want to delete this data?')) {
        // Call API delete user
        api.defaults.headers.common['Authorization'] = token;
        await api.delete(`/api/v1/users/${id}`)
            .then(() => {
                // Call method "fetchDataUsers"
                fetchDataUsers(currentPage.value, searchQuery.value);
                // Show alert success
                alert('Data has been deleted successfully!');
            });
    }
};

// Method to go to the next page
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// Method to go to the previous page
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<template>
    <div class="container mx-auto mt-5 mb-5">
        <div class="flex">
            <div class="w-1/4">
                <SidebarMenu />
            </div>
            <div class="w-3/4">
                <div class="bg-white rounded shadow-md">
                    <div class="border-b p-4 flex justify-between items-center">
                        <span class="font-bold">USERS</span>
                        <router-link :to="{ name: 'users.create' }"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            ADD USER
                        </router-link>
                    </div>
                    <div class="p-4">
                        <div class="mb-3">
                            <input v-model="searchQuery" @input="currentPage = 1" type="text"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Search users...">
                        </div>
                        <table class="min-w-full bg-white border">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-2 px-4">Full Name</th>
                                    <th class="py-2 px-4">Email Address</th>
                                    <th class="py-2 px-4" style="width:17%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="users.length == 0">
                                    <td colspan="3" class="text-center p-4">
                                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                            role="alert">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(user, index) in users" :key="index">
                                    <td class="border px-4 py-2">{{ user.name }}</td>
                                    <td class="border px-4 py-2">{{ user.email }}</td>
                                    <td class="border px-4 py-2 text-center flex justify-center">
                                        <router-link :to="{ name: 'users.edit', params: { id: user.id } }"
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            EDIT
                                        </router-link>
                                        <button @click="deleteUser(user.id)"
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Pagination Controls -->
                        <div class="flex justify-between items-center mt-4">
                            <button @click="prevPage" :disabled="currentPage === 1"
                                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Previous
                            </button>
                            <span>Page {{ currentPage }} of {{ totalPages }}</span>
                            <button @click="nextPage" :disabled="currentPage === totalPages"
                                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
