<template>
    <v-app-bar
        app
        color="grey lighten-5"
        dark
    >
        <!-- <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            @click.stop="$emit('toggle-nav-drawer')"
        ></v-app-bar-nav-icon> -->

        <div class="d-flex align-center">
            <h2><span class="color-primary">Job</span><span class="color-secondary">Match</span></h2>
        </div>

        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar',

    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/sass/variables.scss';

.color-primary {
    color: $primary !important
}

.color-secondary {
    color: $secondary !important
}
</style>