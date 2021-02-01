<template>
  <v-container class="home">
    <v-row class="my-4" max-width="700px">
      <v-col cols="12">
        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="text-center">{{ title }}</h1>
        <h2 v-else class="text-center">{{ title }}</h2>
        <div class="mt-2">
          JobMatch helps to check that your CV contains key skills that are required 
          by the Job you would like to apply to. These skills are extracted
          using AI and while the model may not be perfect for now, it will continue
          to improve with your feedback. This service is <strong>free</strong> to use.
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <JobParser></JobParser>
    </v-row>
  </v-container>
</template>

<script>
import JobParser from '@/components/JobParser';

export default {
  name: 'Home',
  components: {
    JobParser
  },
  data() {
    return {
      loading: false,
      error: null,

      title: 'Tailor your CV to your dream Job Application'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>