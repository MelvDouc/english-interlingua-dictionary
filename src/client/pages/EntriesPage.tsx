import EntryCard from "$components/EntryCard/EntryCard.jsx";
import NextEntryLink from "$components/NextEntryLink/NextEntryLink.jsx";
import { getEntries } from "$client/utils/api.js";
import auth from "$client/utils/auth.js";

export default async function EntriesPage({ word }: {
  word: string;
}) {
  const [entries] = await getEntries(word);

  if (!entries || entries.length === 0)
    return (
      <p>No entries found for <strong>{word}</strong>.</p>
    );

  return (
    <>
      <h1>{word}</h1>
      {entries.map((entry) => (
        <div className="mb-2">
          <EntryCard entry={entry} />
        </div>
      ))}
      {auth.isModOrMore() && (
        <p>Next: {await NextEntryLink({ word })}</p>
      )}
    </>
  );
}
