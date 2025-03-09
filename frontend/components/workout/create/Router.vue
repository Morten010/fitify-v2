<script setup lang="ts">
const { page, workout } = defineProps({
  page: {
    type: Object,
    required: true,
  },
  workout: {
    type: Object,
    required: true,
  },
});

const workoutPage = computed(() => {
  return workout.workoutDays[page.index];
});
</script>

<template>
  <div class="p-5">
    <CreateWorkoutInformationPage
      :page="page"
      :workout="workout"
      v-if="page.type === 'information'" />
    <CreateWorkoutDayPage
      v-if="page.type === 'day'"
      :workout="workout.workoutDays[page.index]" />
  </div>
</template>
