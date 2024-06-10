import EntryCard from "$components/EntryCard/EntryCard.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import { getEntries } from "$client/utils/api.js";

export default async function EntriesPage({ word }: {
  word: string;
}) {
  const [search] = await getEntries(word);

  if (!search || search.entries.length === 0)
    return (
      <p>No entries found for <strong>{word}</strong>.</p>
    );

  const { entries, prev, next } = search;

  return (
    <>
      <h1>{word}</h1>
      {entries.map((entry) => (
        <div className="mb-2">
          <EntryCard entry={entry} />
        </div>
      ))}
      {prev && (
        <p>Previous: <RouterLink href={`/entries/${prev}`}>{prev}</RouterLink></p>
      )}
      {next && (
        <p>Next: <RouterLink href={`/entries/${next}`}>{next}</RouterLink></p>
      )}
    </>
  );
}