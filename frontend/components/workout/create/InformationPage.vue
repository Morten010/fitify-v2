<script setup lang="ts">
const { workout } = defineProps({
  workout: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex-col flex gap-2">
    <div class="mb-2">
      <h2 class="title-font text-5xl">Workout Information</h2>
      <p class="text-white/70">Basic information about this workout</p>
    </div>
    <Label class="flex flex-col gap-2">
      Workout name
      <Input v-model="workout.name" placeholder="Full-body workout" />
    </Label>
    <Label class="flex flex-col gap-2">
      Description
      <Textarea
        v-model="workout.description"
        placeholder="This workout is..." />
    </Label>
  </div>
</template>
