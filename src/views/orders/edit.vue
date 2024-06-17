<script setup>

//import sidebar component
import SidebarMenu from '../../components/SidebarMenu.vue';

//import reactive and ref from vue
import { reactive, ref, onMounted } from 'vue';

//import useRouter from vue router
import { useRouter, useRoute } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//inisialisasi vue router on Composition API
const route = useRoute();

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../services/api';

//get token from cookies
const token = Cookies.get('token');

//state order
const order = reactive({
    product: '',
    price: '',
    qty: '',
});

//state validation
const validation = ref([]);

//onMounted
onMounted(async () => {

    //fetch detail data order by ID
    api.defaults.headers.common['Authorization'] = token;
    await api.get(`/api/v1/orders/${route.params.id}`)
        .then(response => {

            //set response data to state
            order.product = response.data.data.product
            order.qty = response.data.data.qty
            order.price = response.data.data.price
        });
})

//method updateOrder
const updateOrder = async () => {

    //call api store order
    api.defaults.headers.common['Authorization'] = token;
    await api.put(`/api/v1/orders/${route.params.id}`, {
        product: order.product,
        price: order.price,
        qty: order.qty,
    })
        .then(() => {
            //redirect ke halaman orders index
            router.push({
                name: 'orders.index'
            })
        })
        .catch(error => {
            //assign validation value with error
            validation.value = error.response.data
        })
}

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
                            <span class="font-bold text-gray-700">EDIT ORDERS</span>
                            <router-link :to="{ name: 'orders.index' }"
                                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">BACK</router-link>
                    </div>
                    <div class="p-4">
                        <div v-if="validation.errors" class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">
                                    {{ `${error.path} : ${error.msg}` }}
                                </li>
                            </ul>
                        </div>
                        <form @submit.prevent="updateOrder">

                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Product Name</label>
                                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="order.product" id="">
                                    <option value="" selected>Select Product</option>
                                    <option value="jam">Jam</option>
                                    <option value="handuk">Handuk</option>
                                    <option value="dompet">Dompet</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Qty</label>
                                <input type="number" min="0" v-model="order.qty" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Qty" />
                            </div>

                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-bold text-gray-700">Price</label>
                                <input type="number" min="0" v-model="order.price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Price" />
                            </div>

                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>