<script setup lang="ts">
definePageMeta({
  layout: "normal",
});

const { data, error } = useFetch("/api/workout");
</script>

<template>
  <div class="p-6">
    <h1 class="title-font text-5xl">Welcome back👋</h1>
    <p class="text-white/80">Ready to get started?</p>
    <NuxtLink
      href="/workout/create"
      class="aspect-[12/4] max-h-60 w-full flex justify-center items-center flex-col rounded-lg border-2 border-primary border-dashed mt-5 text-primary">
      <Icon size="40" name="tabler:plus" />
    </NuxtLink>
    <div v-if="data" v-for="workout in data">
      {{ workout.name }}
    </div>
    <div v-if="error">
      <p>Failed to fetch workouts</p>
    </div>
  </div>
</template>
