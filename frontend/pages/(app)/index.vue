<script setup lang="ts">
definePageMeta({
  layout: "normal",
});

const { data, error } = useFetch("/api/workout");
</script>

<template>
  <div class="p-6 pb-24">
    <h1 class="title-font text-5xl">Welcome back👋</h1>
    <p class="text-white/80">Ready to get started?</p>
    <NuxtLink
      href="/workout/create"
      class="min-h-[120px] max-h-60 w-full flex justify-center items-center flex-col rounded-lg border-2 border-primary/80 border-dashed mt-5 text-primary/80">
      <Icon size="40" name="tabler:plus" />
    </NuxtLink>
    <div class="flex flex-col gap-2 mt-2" v-if="data">
      <NuxtLink :to="`/workout/${workout.id}`" v-for="workout in data">
        <Card>
          <CardHeader>
            {{ workout.name }}
          </CardHeader>
          <CardContent>
            {{ workout.description || "none" }}
          </CardContent>
        </Card>
      </NuxtLink>
    </div>
    <div v-if="error">
      <p>Failed to fetch workouts</p>
    </div>
  </div>
</template>
