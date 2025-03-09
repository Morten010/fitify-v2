<script setup lang="ts">
import { type WorkoutPageProps, type WorkoutDayProps } from "@/types/workout";
const page = ref<WorkoutPageProps>({
  type: "information",
  index: 0,
});
const workout = ref({
  name: "",
  description: "",
  workoutDays: [] as WorkoutDayProps[],
});

const handleAddWorkoutDay = () => {
  workout.value.workoutDays.push({ name: "", exercises: [] });
};
</script>

<template>
  <!-- loading screen -->
  <div
    v-if="false"
    class="absolute top-0 left-0 w-full h-full bg-background/90 backdrop-blur-md z-30 flex justify-center items-center">
    <h3 class="text-lg">Creating workout...</h3>
  </div>
  <!-- loading screen -->

  <!-- top navigation -->
  <div
    class="sticky top-0 border-b border-border flex justify-between items-center bg-background/95 backdrop-blur-md z-20">
    <div class="flex items-center gap-3">
      <Button class="!h-14 !w-14" size="icon" @click="$router.back()">
        <Icon size="30" name="lets-icons:back" />
      </Button>
      <h1 class="title-font text-3xl mt-1">Create workout</h1>
    </div>
    <Button variant="secondary" class="h-14 px-6"> Finish workout </Button>
  </div>
  <!-- top navigation -->

  <!-- page -->
  <CreateWorkoutRouter :page="page" :workout="workout" />
  <!-- page -->

  <!-- workout navigation -->
  <div class="mb-12" />
  <div
    class="flex border-y border-border fixed bottom-0 left-0 w-full overflow-auto max-w-screen max-sm:hide-scrollbar bg-background/95 backdrop-blur-md">
    <button
      class="p-4 border-r border-border sticky left-0"
      :class="{
        'bg-primary font-semibold text-background': page.type === 'information',
      }"
      @click="
        page = {
          type: 'information',
          index: 0,
        }
      ">
      Information
    </button>
    <button
      v-for="(day, index) in workout.workoutDays"
      class="p-4 border-border"
      :class="{
        'border-r': workout.workoutDays.length !== index + 1,
        'bg-primary font-semibold text-background':
          page.type === 'day' && page.index === index,
      }"
      :key="`${index}-day-${day.name}`"
      @click="
        page = {
          type: 'day',
          index: index,
        }
      ">
      {{ day.name || "Unnamed" }}
    </button>

    <button
      class="p-4 border-r border-border flex gap-2 cursor-pointer sticky top-0 right-0 whitespace-nowrap flex-nowrap bg-background border-l"
      @click="handleAddWorkoutDay">
      <Icon size="24" name="ic:round-add" />
      Add day
    </button>
  </div>
  <!-- workout navigation -->
</template>

<style scoped>
.hide-scrollbar {
  overflow: auto; /* Enables scrolling */
  scrollbar-width: none; /* Hides scrollbar in Firefox */
  -ms-overflow-style: none; /* Hides scrollbar in IE & Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Hides scrollbar in Chrome, Safari, Edge */
}
</style>
