import { obs } from "reactfree-jsx";
import api from "$client/utils/api.js";
import router from "$client/utils/router.js";
import type { PublicUser } from "$client/types.js";

const authObs = obs<PublicUser | null>();

router.onNavigationStarted(async () => {
  const [authData, error] = await api<PublicUser | null>("/auth/check-log-in");
  console.log({ authData });
  if (error) console.log(error);
  authObs.value = authData;
});

export default {
  isLoggedIn: () => authObs.value !== null,
  isModOrMore: () => {
    const role = authObs.value?.role;
    return role === "MODERATOR" || role === "ADMIN";
  },
  isAdmin: () => authObs.value?.role === "ADMIN",
  map: authObs.map.bind(authObs),
  subscribe: authObs.subscribe.bind(authObs),
};