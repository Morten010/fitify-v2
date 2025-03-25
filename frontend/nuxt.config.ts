// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  components: [
    { path: "~/components/workout/create", prefix: "CreateWorkout" },
    "~/components",
  ],
  runtimeConfig: {
    proxyUrl: process.env.API_URL,
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
  security: {
    corsHandler: {
      origin: "*", // Allows all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      credentials: true,
      maxAge: "86400", // 24 hours
      preflight: {
        statusCode: 204,
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "nuxt-security",
  ],
});
