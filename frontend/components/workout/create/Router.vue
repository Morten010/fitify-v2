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

const deleteWorkout = () => {
  page["type"] = "information";
  page["index"] = 0;
  workout.workoutDays.splice(page.index, 1);
};
</script>

<template>
  <div class="p-5">
    <CreateWorkoutInformationPage
      :page="page"
      :workout="workout"
      v-if="page.type === 'information'" />
    <CreateWorkoutDayPage
      v-if="page.type === 'day'"
      :workout="workout.workoutDays[page.index]"
      @delete="deleteWorkout" />
  </div>
</template>
