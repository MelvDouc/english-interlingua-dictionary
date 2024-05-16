import api from "$client/utils/api.js";
import Button from "$components/Button/Button.jsx";

export default function LogOutButton() {
  return (
    <Button color="danger" click={logOut}>Log out</Button>
  );
}

async function logOut() {
  if (confirm("Are you sure you want to log out?")) {
    await api("/auth/log-out", { method: "DELETE" });
    location.assign("/");
  }
}