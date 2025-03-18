export default defineNuxtRouteMiddleware(async (to, from) => {
  const authCookie = useCookie("session");
  const isLoggedIn = !!authCookie.value;
  const loggedOutPaths = ["/signin", "/signup"];

  if (!isLoggedIn && !loggedOutPaths.includes(to.path)) {
    return navigateTo("/signin", { replace: true });
  }

  // Check if session have been revoked
  if (isLoggedIn) {
    try {
      await $fetch("/api/authcheck", {
        credentials: "include",
        headers: useRequestHeaders(),
      });
    } catch (_err) {
      authCookie.value = null;
      return navigateTo("/signin", { replace: true });
    }
  }

  if (isLoggedIn && loggedOutPaths.includes(to.path)) {
    return navigateTo("/", { replace: true });
  }
});
