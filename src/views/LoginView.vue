<template>
    <div id="loginWrapper" class="container mx-auto flex justify-center items-center h-screen">
        <div class="border border-gray-200 rounded-md w-4/12 mx-auto p-5">
            <form @submit.prevent="submit">
                <div class="mt-3">
                    <h4 class="font-bold text-center text-2xl">Login</h4>
                </div>
                <div class="mt-2">
                    <label class="text-sm" for="email">Email:</label>
                    <input class="border border-gray-300 block w-full py-1 px-2" type="text" name="email" v-model="form.email" placeholder="Enter e-mail address..." required autofocus />
                    <p v-if="error.length > 0" id="error" class="text-red-500">{{ error }}</p>
                </div>
                <div class="mt-2">
                    <label class="text-sm" for="password">Password:</label>
                    <input class="border border-gray-300 block w-full py-1 px-2" type="password" name="password" v-model="form.password" placeholder="Enter password..." required />
                </div>
                <div class="flex mt-3 justify-center">
                    <button class="border border-green-300 py-1 px-3 hover:bg-green-300 hover:text-white" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex'

    export default {
        name: "LoginView",
        components: {},
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            ...mapActions(['login']),
            async submit() {
                const user = new FormData();

                user.append('email', this.form.email)
                user.append('password', this.form.password)
                user.append('device_name', 'sample-device')

                axios.post('/login', user).then((response) => {
                    if (response.data.success) {
                        this.login(response.data)
                        this.$router.push('/')
                    } else {
                        this.error = response.data.message
                    }
                }).catch((err) => {
                    console.log('error');
                    console.log(err)
                    this.error = 'Invalid credentials.'
                })
            }
        }
    }
</script>