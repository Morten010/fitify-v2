export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("session");
  const isLoggedIn = !!authCookie.value;
  const loggedOutPaths = ["/signin", "/signup"];

  if (!isLoggedIn && !loggedOutPaths.includes(to.path)) {
    console.log("ran 2");
    return navigateTo("/signin", { replace: true });
  }

  // TODO check backend endpoint to authenticate token if is present

  if (isLoggedIn && loggedOutPaths.includes(to.path)) {
    console.log("ran");

    return navigateTo("/", { replace: true });
  }
});
