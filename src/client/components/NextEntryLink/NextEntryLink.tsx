import type { Entry } from "$client/types.js";
import api from "$client/utils/api.js";
import RouterLink from "$components/RouterLink/RouterLink.jsx";

export default async function NextEntryLink({ word }: {
  word: string;
}) {
  const [nextEntry] = await api<Entry | null>(`/next-entry/${encodeURIComponent(word)}`);

  if (!nextEntry)
    return null;

  return (
    <RouterLink href={`/entries/${nextEntry.word}`}>{nextEntry.word}</RouterLink>
  );
}