<template>
    <div id="loginWrapper">
        <div class="bg-green-200">
            <form @submit.prevent="submit">
                <div>
                    <label for="email">Email:</label>
                    <input type="text" name="email" v-model="form.email" />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" name="password" v-model="form.password" />
                </div>
                <button type="submit">Submit</button>
            </form>
            <p v-if="error.length > 0" id="error" class="text-red-500">{{ error }}</p>
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
                })
            }
        }
    }
</script>