import { removeAuthToken } from "$client/utils/local-storage.js";
import Button from "$components/Button/Button.jsx";
import "css.gg/icons/css/arrow-right.css";

export default function LogOutButton() {
  return (
    <Button color="danger" classNames={["p-1"]} title="Log out" click={logOut}>
      <i className="gg-arrow-right"></i>
    </Button>
  );
}

function logOut() {
  if (confirm("Are you sure you want to log out?")) {
    removeAuthToken();
    location.assign("/");
  }
}