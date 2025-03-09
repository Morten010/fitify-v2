<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Input from "~/components/ui/input/Input.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { FetchError } from "ofetch";

const user = ref({
  username: "",
  email: "",
  password: "",
});
const { toast } = useToast();

const handleSubmit = async () => {
  try {
    const res = await $fetch("/api/signup", {
      method: "POST",
      body: user.value,
      credentials: "include",
      server: true,
    });
    console.log(res);

    toast({
      title: "Successfully logged in",
    });
    setTimeout(() => {
      navigateTo({ path: "/" });
    }, 500);
  } catch (error: any) {
    toast({
      title: error.data,
    });
  }
};
</script>

<template>
  <div class="p-5 flex justify-center items-center min-h-screen flex-col">
    <h1 class="text-5xl text-center font-semibold title-font">Sign up</h1>
    <p class="text-sm text-white/70">Create an account to get started.</p>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col mt-5 gap-4 min-w-[300px]">
      <Input placeholder="Email" name="email" v-model="user.email" />
      <Input placeholder="Username" name="username" v-model="user.username" />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        v-model="user.password" />
      <Button type="submit"> Sign up </Button>
      <Button variant="link" as="a" href="/signin">
        Already have an account?
      </Button>
    </form>
  </div>
</template>
