// https://nuxt.com/docs/api/configuration/nuxt-config

const proxyUrl = process.env.API_URL || "http://localhost:3001";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  components: [
    { path: "~/components/workout/create", prefix: "CreateWorkout" },
    "~/components",
  ],
  runtimeConfig: {
    proxyUrl: proxyUrl,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/icon"],
});
