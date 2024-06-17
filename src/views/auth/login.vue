<script setup>
//import reactive and ref from vue
import { reactive, ref } from 'vue'

//import useRouter from vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//import services api
import api from '../../services/api'

//import js-cookie
import Cookies from 'js-cookie'

//state user
const user = reactive({
    email: '',
    password: '',
})

//state validation
const validation = ref([])
const loginFailed = ref([])

//method login
const login = async () => {

    //call api login
    await api.post('/api/v1/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {

        //set token and user on cookies
        Cookies.set('token', response.data.data.token)
        Cookies.set('user', JSON.stringify(response.data.data.user))

        // Verify the token is set before redirecting
        if (Cookies.get('token')) {
            //redirect to dashboard
            router.push({ name: 'dashboard' })
        } 
        
    })
    .catch(error => {
        //assign validation value with error
        validation.value = error.response.data

        //assign loginFailed value with error
        loginFailed.value = error.response.data
    })

}
</script>

<template>
    <div class="flex justify-center mt-5">
        <div class="w-full max-w-md">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h4 class="text-xl font-bold">LOGIN</h4>
                <hr class="my-4">
                <div v-if="validation.errors" class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>
                <div v-if="loginFailed.message" class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {{ loginFailed.message }}
                </div>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
                        <input type="email" v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email Address" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
                    </div>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">LOGIN</button>
                </form>
            </div>
        </div>
    </div>
</template>
