<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Input from "~/components/ui/input/Input.vue";
import { useToast } from "@/components/ui/toast/use-toast";

const user = ref({
  username: "",
  password: "",
});
const { toast } = useToast();

const handleSubmit = async () => {
  try {
    await $fetch("http://localhost:3001/signin", {
      method: "POST",
      body: user.value,
      credentials: "include",
    });
    toast({
      title: "Successfully logged in",
    });
    setTimeout(() => {
      navigateTo({ path: "/" });
    }, 500);
  } catch (error) {
    console.log("err");

    toast({
      title: "Wrong password or username",
    });
  }
};
</script>

<template>
  <div class="p-5 flex justify-center items-center min-h-screen flex-col">
    <h1 class="text-5xl text-center font-semibold title-font">Sign in</h1>
    <p class="text-sm text-white/70">Sign in to continue where you left off.</p>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col mt-5 gap-4 min-w-[300px]">
      <Input placeholder="Username" name="username" v-model="user.username" />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        v-model="user.password" />
      <Button type="submit"> Sign in </Button>
      <Button variant="link" as="a" href="/signup"> Create account </Button>
    </form>
  </div>
</template>
