import DeleteEntryButton from "$components/EntryCard/DeleteEntryButton.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import auth from "$client/utils/auth.js";
import type { Example, SerializableEntry } from "$client/types.js";

export default function EntryCard({ entry }: {
  entry: SerializableEntry;
}) {
  const lsKey = `entry_${entry.id}`;
  localStorage.setItem(lsKey, JSON.stringify(entry));
  let card: HTMLElement;

  return card = (
    <div className="entry-card">
      <ul className="list-group mb-1">
        {Object.entries(entry.classes).map(([cls, translations]) => (
          <li className="list-group-item">
            <h3>{cls}</h3>
            <ol>
              {translations.map(({ translation, pronunciation, detail, examples }) => (
                <li>
                  <p>{detail && (<em>({detail})&nbsp;</em>)}{translation}</p>
                  {pronunciation && (<p>{pronunciation}</p>)}
                  {examples && (<ExampleList examples={examples} />)}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      {auth.isAdmin() && (
        <div className="d-flex gap-2">
          <RouterLink href={`/entry/update/${entry.id}`} className="btn btn-primary">Update</RouterLink>
          <DeleteEntryButton id={entry.id} onDeleteSuccessful={() => card.remove()} />
        </div>
      )}
    </div>
  );
}

function ExampleList({ examples }: {
  examples: Example[];
}) {
  return (
    <dl>
      {examples.map(({ example, translation }) => (
        <>
          <dt>{example}</dt>
          <dd>{translation}</dd>
        </>
      ))}
    </dl>
  );
}