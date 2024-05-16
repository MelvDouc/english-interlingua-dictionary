import router from "$client/utils/router.js";
import api from "$client/utils/api.js";

export default function RandomEntryLink() {
  return (
    <a
      href="#"
      className="nav-link"
      title="Go to random entry"
      onclick={handleClick}
    >Random Entry</a>
  );
}

async function handleClick(e: Event) {
  e.preventDefault();
  const [word] = await api<string>("/random-entry-word");
  if (word)
    await router.navigate(`/entries/${word}`);
}