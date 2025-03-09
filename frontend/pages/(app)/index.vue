<script setup lang="ts">
definePageMeta({
  layout: "normal",
});
</script>

<template>
  <div class="p-6">
    <h1 class="title-font text-5xl">Welcome back👋</h1>
    <p class="text-white/80">Ready to get started?</p>
    <NuxtLink
      href="/workout/create"
      class="aspect-[5/2] w-full flex justify-center items-center flex-col rounded-lg border-2 border-border border-dashed mt-5 text-border">
      <Icon size="50" name="tabler:plus" />
    </NuxtLink>
  </div>
</template>
