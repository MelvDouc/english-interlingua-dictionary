import { obs } from "reactfree-jsx";
import BoundInput from "$components/BoundInput/BoundInput.jsx";
import Button from "$components/Button/Button.jsx";
import WordClassBlock from "$components/EntryForm/WordClassBlock.jsx";
import WordClassSelect from "$components/EntryForm/WordClassSelect.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import type { Entry, WordClass } from "$client/types.js";

export default function EntryForm({ entry, handleSubmit: submit }: {
  entry: Entry;
  handleSubmit: (entry: Entry) => Promise<void>;
}) {
  const WORD = entry.word;
  const classesObs = obs(entry.classes);
  const cancelPath: `/${string}` = WORD ? `/entries/${WORD}` : "/";

  const createChangeWordClassFn = (wordClass: WordClass) => {
    return (newWordClass: WordClass) => {
      classesObs.value[newWordClass] = classesObs.value[wordClass];
      delete classesObs.value[wordClass];
      classesObs.notify();
    };
  };

  const createClassRemover = (wordClass: WordClass) => {
    return () => {
      delete classesObs.value[wordClass];
      classesObs.notify();
    };
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const submitButton = form.querySelector("button[type='submit']") as HTMLButtonElement;
    submitButton.disabled = true;
    await submit(entry);
  };

  return (
    <form className="d-flex flex-column p-4 gap-5 rounded bg-primary text-light" onsubmit={handleSubmit}>
      <section className="row">
        <article className="col-12">
          <h2>Word</h2>
          <BoundInput src={entry} key="word" placeholder="Word" required />
        </article>
      </section>
      <section className="row">
        <article className="col-12 d-flex flex-column gap-3">
          <h2 className="d-flex justify-content-between gap-1">
            <span>Classes</span>
            <div style={{ maxWidth: "250px" }}>
              <WordClassSelect classesObs={classesObs} />
            </div>
          </h2>
          {classesObs.map((classes) => (
            Object.entries(classes).map(([wordClass, translations]) => {
              return (
                <WordClassBlock
                  translations={translations}
                  wordClass={wordClass as WordClass}
                  changeWordClass={createChangeWordClassFn(wordClass as WordClass)}
                  removeClass={createClassRemover(wordClass as WordClass)}
                />
              );
            })
          ))}
        </article>
      </section>
      <section className="row">
        <div className="col-12 d-flex justify-content-center align-items-center gap-2">
          <Button type="submit" color="success">Submit</Button>
          <RouterLink href={cancelPath} className="text-danger">Cancel</RouterLink>
        </div>
      </section>
    </form>
  );
}