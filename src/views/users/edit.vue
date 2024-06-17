<script setup>
// import sidebar component
import SidebarMenu from '../../components/SidebarMenu.vue';

// import reactive and ref from vue
import { reactive, ref, onMounted } from 'vue';

// import useRouter and useRoute from vue router
import { useRouter, useRoute } from 'vue-router';

// initialize vue router on Composition API
const router = useRouter();
const route = useRoute();

// import js cookie
import Cookies from 'js-cookie';

// import api
import api from '../../services/api';

// get token from cookies
const token = Cookies.get('token');

// state user
const user = reactive({
    name: '',
    email: '',
    password: '',
});

// state validation
const validation = ref([]);

// onMounted
onMounted(async () => {
    // fetch detail data user by ID
    api.defaults.headers.common['Authorization'] = token;
    await api.get(`/api/v1/users/${route.params.id}`)
        .then(response => {
            // set response data to state
            user.name = response.data.data.name;
            user.email = response.data.data.email;
        });
});

// method updateUser
const updateUser = async () => {
    // call api store user
    api.defaults.headers.common['Authorization'] = token;
    await api.put(`/api/v1/users/${route.params.id}`, {
        name: user.name,
        email: user.email,
        password: user.password,
    })
        .then(() => {
            // redirect to users index page
            router.push({ name: 'users.index' });
        })
        .catch(error => {
            // assign validation value with error
            validation.value = error.response.data;
        });
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
                        <span class="font-bold text-gray-700">EDIT USER</span>
                        <router-link :to="{ name: 'users.index' }"
                            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                            BACK
                        </router-link>
                    </div>
                    <div class="p-4">
                        <div v-if="validation.errors" class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">
                                    {{ `${error.path} : ${error.msg}` }}
                                </li>
                            </ul>
                        </div>
                        <form @submit.prevent="updateUser">
                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Full Name</label>
                                <input type="text" v-model="user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Full Name" />
                            </div>
                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
                                <input type="email" v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email Address" />
                            </div>
                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Password</label>
                                <input type="password" v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
                            </div>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
