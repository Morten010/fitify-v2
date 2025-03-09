export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("session");
  const isLoggedIn = !!authCookie.value;
  const loggedOutPaths = ["/signin", "/signup"];

  if (!isLoggedIn && !loggedOutPaths.includes(to.path)) {
    return navigateTo("/signin", { replace: true });
  }

  // TODO check backend endpoint to authenticate token if is present

  if (isLoggedIn && loggedOutPaths.includes(to.path)) {
    return navigateTo("/", { replace: true });
  }
});
