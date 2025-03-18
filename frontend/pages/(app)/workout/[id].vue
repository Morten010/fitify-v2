<script setup lang="ts">
definePageMeta({
  layout: "normal",
});

const { id } = useRoute().params;
const { data, error } = useFetch(`/api/workout/${id}`);
</script>

<template>
  <div v-if="data" class="p-6">
    <h1 class="title-font text-4xl">{{ data.name }}</h1>
    <p class="text-white/80">{{ data.description }}</p>
    <div class="flex flex-col gap-2 mt-5">
      <Card v-for="day in data.days">
        <CardHeader class="text-xl font-semibold">
          {{ day.dayName }}
        </CardHeader>
      </Card>
    </div>
  </div>
  <div v-if="error">error</div>
</template>
