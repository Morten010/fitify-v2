<script setup lang="ts">
const route = useRoute();

const links = [
  {
    title: "Workouts",
    href: "/",
    icon: "heroicons:squares-2x2-solid",
  },
  {
    title: "Something",
    href: "/something",
    icon: "heroicons-solid:plus-circle",
  },
  {
    title: "Food tracking",
    href: "/food",
    icon: "ep:food",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "octicon:gear-16",
  },
];

const isActivePath = (path: string) => route.path === path;
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 py-5 px-10 bg-background/50 backdrop-blur-md border-t border-border w-full flex justify-between text-[#a1a0a3]">
    <NuxtLink
      class="relative flex"
      v-for="link in links"
      :href="link.href"
      :aria-label="link.title">
      <Icon
        class="hover:text-white hover:scale-105 transition-all duration-300 z-20"
        :class="[
          { 'text-primary hover:!text-primary': isActivePath(link.href) },
        ]"
        :name="link.icon"
        size="35" />
      <div
        v-if="isActivePath(link.href)"
        class="absolute top-0 left-0 w-full h-full bg-primary/10 rounded-full blur-sm" />
    </NuxtLink>
  </nav>
</template>
