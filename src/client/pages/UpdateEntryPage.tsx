import EntryForm from "$components/EntryForm/EntryForm.jsx";
import api from "$client/utils/api.js";
import type { Entry, SerializableEntry } from "$client/types.js";

export default async function UpdateEntryPage({ id }: {
  id: string;
}) {
  const entry = await getEntry(id);

  return (
    <>
      {entry && <EntryForm entry={entry} handleSubmit={createHandleSubmitFn(id)} />}
    </>
  );
}

async function getEntry(id: string) {
  const lsKey = `entry_${id}`;
  const item = localStorage.getItem(lsKey);
  localStorage.removeItem(lsKey);

  if (item)
    return JSON.parse(item) as SerializableEntry;

  const [entry] = await api<SerializableEntry>(`/entry/${id}`);
  return entry;
}

function createHandleSubmitFn(id: string) {
  return async (entry: Entry) => {
    const updateResult = await api<boolean>(`/entry/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
    if (!updateResult) {
      alert("Couldn't update entry.");
      return;
    }
    location.assign(`/entries/${entry.word}`);
  };
}