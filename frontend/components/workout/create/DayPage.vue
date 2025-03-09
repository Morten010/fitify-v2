<script setup lang="ts">
const { workout } = defineProps({
  workout: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="mb-2">
      <h2 class="title-font text-5xl">Day information</h2>
      <p class="text-white/70">Add some exercises to this day</p>
    </div>
    <Label class="flex flex-col gap-2">
      Day name
      <Input v-model="workout.name" placeholder="Arm day" />
    </Label>
  </div>
</template>
