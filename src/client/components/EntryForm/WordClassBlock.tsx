import { obs } from "reactfree-jsx";
import Button from "$components/Button/Button.jsx";
import TranslationList from "$components/EntryForm/TranslationList.jsx";
import type { Translation, WordClass } from "$client/types.js";
import WORD_CLASSES from "$src/word-classes.js";

export default function WordClassBlock({ wordClass, changeWordClass, removeClass, translations }: {
  wordClass: WordClass;
  changeWordClass: (newWordClass: WordClass) => void;
  removeClass: () => void;
  translations: Translation[];
}) {
  const translationsObs = obs(translations);

  const addTranslation = () => {
    translationsObs.value.push({ translation: "" });
    translationsObs.notify();
  };

  return (
    <div>
      <h3 className="d-flex gap-2 justify-content-between">
        <span>
          <WordClassSelect wordClass={wordClass} changeWordClass={changeWordClass} />
        </span>
        <Button color="danger" click={removeClass}>X</Button>
      </h3>
      <p className="mb-2">
        <Button color="success" click={addTranslation}>Add translation</Button>
      </p>
      <TranslationList translationsObs={translationsObs} />
    </div>
  );
}

function WordClassSelect({ wordClass, changeWordClass }: {
  wordClass: WordClass;
  changeWordClass: (newWordClass: WordClass) => void;
}) {
  const handleChange = ({ target }: Event) => {
    const newWordClass = (target as HTMLSelectElement).value as WordClass;
    changeWordClass(newWordClass);
  };

  return (
    <select className="form-select" onchange={handleChange}>
      {WORD_CLASSES.map((item) => (
        <option value={item} selected={item === wordClass}>{item}</option>
      ))}
    </select>
  );
}