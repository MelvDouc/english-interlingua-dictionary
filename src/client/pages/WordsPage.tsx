import RouterLink from "$components/RouterLink/RouterLink.jsx";
import api from "$client/utils/api.js";

export default async function WordsPage() {
  const [words] = await api<string[]>("/words");

  if (!words)
    return (
      <p>Entries unavailable.</p>
    );

  return (
    <>
      <p className="mb-4"><strong>{words.length.toLocaleString("en")}</strong> entries.</p>
      <div style={{ columnCount: "4" }}>
        {words.map((word) => (
          <p>
            <RouterLink href={`/entries/${word}`}>{word}</RouterLink>
          </p>
        ))}
      </div>
    </>
  );
}