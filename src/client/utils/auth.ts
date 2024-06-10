import api from "$client/utils/api.js";
import { getAuthToken } from "$client/utils/local-storage.js";
import type { PublicUser } from "$client/types.js";

const user = await fetchUser();

async function fetchUser() {
  const token = getAuthToken();

  if (!token)
    return null;

  const [user] = await api<PublicUser | null>("/auth/get-credentials");
  return user;
}

export default {
  isLoggedIn: () => !!user,
  isModOrMore: () => {
    const role = user?.role;
    return role === "MODERATOR" || role === "ADMIN";
  },
  isAdmin: () => user?.role === "ADMIN"
};