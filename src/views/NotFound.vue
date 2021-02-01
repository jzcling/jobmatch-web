<template>
    <v-container class="notfound">
        <h2 class="text-center red lighten-4 mb-10 rounded">Page Not Found</h2>

        <v-img
            class="mx-auto"
            transition="scale-transition"
            src="@/assets/bg-404.svg"
            contain
            max-height="400"
            max-width="550"
        ></v-img>

        <div class="mt-4 d-flex justify-center">
            <v-btn
                color="teal"
                dark
                @click="redirectToHome"
            >Back To Home</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'NotFound',
    data() {
        return {
        }
    },
    created() {
        this.$emit('cancel-loading');
    },
    methods: {
        redirectToHome() {
            this.$router.push('/');
        }
    }
}
</script>