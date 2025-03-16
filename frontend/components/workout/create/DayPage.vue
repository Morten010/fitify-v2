<script setup lang="ts">
const { workout } = defineProps({
  workout: {
    type: Object,
    required: true,
  },
});

const handleAddExercise = () => {
  workout.exercises.push({
    name: "",
    reps: "",
    sets: "",
    videoUrl: "",
  });
};

const handleDeleteExercise = (index: number) => {
  workout.exercises.splice(index, 1);
};
</script>

<template>
  <div>
    <div class="mb-2">
      <h2 class="title-font text-5xl">Day information</h2>
      <p class="text-white/70">Add some exercises to this day</p>
    </div>
    <div class="flex flex-col gap-3">
      <Label class="flex flex-col gap-2">
        Day name
        <div class="flex gap-2">
          <Input v-model="workout.name" placeholder="Arm day" />
          <Button variant="destructive" @click="$emit('delete')">
            Delete Day <Icon size="20" name="fluent:delete-48-regular" />
          </Button>
        </div>
      </Label>
      <Card v-for="(exercise, index) in workout.exercises">
        <CardHeader>
          <CardTitle class="flex justify-between items-center">
            {{ exercise.name || "Exercise" }}

            <Button
              variant="outline"
              size="icon"
              @click="handleDeleteExercise(index)">
              <Icon size="20" name="fluent:delete-48-regular" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <Label class="flex flex-col gap-2">
            Exercise name
            <Input v-model="exercise.name" placeholder="Arm day" />
          </Label>
          <div class="grid grid-cols-2 gap-2">
            <Label class="flex flex-col gap-2">
              Sets
              <Input v-model="exercise.sets" placeholder="3" type="number" />
            </Label>
            <Label class="flex flex-col gap-2">
              Reps
              <Input v-model="exercise.reps" placeholder="12" type="number" />
            </Label>
          </div>
          <Label class="flex flex-col gap-2">
            Video url
            <Input v-model="exercise.videoUrl" placeholder="Arm day" />
          </Label>
        </CardContent>
      </Card>
      <Button class="w-full" variant="secondary" @click="handleAddExercise">
        Add exercise
      </Button>
    </div>
  </div>
</template>
