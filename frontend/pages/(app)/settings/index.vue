<script setup lang="ts">
definePageMeta({
  layout: "normal",
});

const handleSignout = async () => {
  await $fetch("/api/signout", {
    method: "post",
  });
  navigateTo("/signin");
};
</script>

<template>
  <div class="p-6 pb-2">
    <h1 class="title-font text-5xl">Settings</h1>
    <p class="text-white/80">Change settings here</p>
  </div>
  <ul>
    <li
      class="p-5 mt-2 border-t border-border flex text-xl items-center gap-5 font-medium hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
      @click="handleSignout">
      <Icon size="35" name="icon-park-outline:logout" />
      Profile settings
    </li>
    <li
      class="p-5 border-y border-border flex text-red-600 text-xl items-center gap-5 font-medium hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer"
      @click="handleSignout">
      <Icon size="35" name="icon-park-outline:logout" />
      Logout
    </li>
  </ul>
</template>
