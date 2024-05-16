import EntryForm from "$components/EntryForm/EntryForm.jsx";
import api from "$client/utils/api.js";
import type { Entry } from "$client/types.js";

export default function AddEntryPage() {
  const entry = {
    word: "",
    classes: {}
  };

  return (
    <EntryForm entry={entry} handleSubmit={handleSubmit} />
  );
}

async function handleSubmit(entry: Entry) {
  const [insertedId] = await api<string>(`/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  });

  if (!insertedId) {
    alert("Couldn't add entry.");
    return;
  }

  location.assign(`/entries/${entry.word}`);
}