<script setup>
//import reactive and ref from vue
import { reactive, ref } from 'vue'

//import useRouter from vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//import services api
import api from '../../services/api'

//state user
const user = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

//state validation
const validation = ref([])

//method register
const register = async () => {

    //call api register
    await api.post('/api/v1/register', {
        name: user.name,
        email: user.email,
        password: user.password,
    })
        .then(() => {
            //redirect ke halaman login
            router.push({
                name: 'login'
            })
        })
        .catch(error => {
            //assign validation value with error
            validation.value = error.response.data
        })

}

</script>

<template>
    <div class="flex justify-center mt-5">
        <div class="w-full max-w-md">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h4 class="text-xl font-bold">REGISTER</h4>
                <hr class="my-4">
                <div v-if="validation.errors" class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>
                <form @submit.prevent="register">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input type="text" v-model="user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Full Name" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
                        <input type="email" v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email Address" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
                    </div>

                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">REGISTER</button>
                </form>
            </div>
        </div>
    </div>
</template>
