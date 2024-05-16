import TranslationListItem from "$components/EntryForm/TranslationListItem.jsx";
import type { Translation, Obs } from "$client/types.js";

export default function TranslationList({ translationsObs }: {
  translationsObs: Obs<Translation[]>;
}) {
  const {
    moveTranslationUp,
    removeTranslation,
    createAddExampleFn,
    createRemoveExampleFn
  } = createActions(translationsObs);

  return (
    <ul className="list-group">
      {translationsObs.map((translations) => (
        translations.map((trl, i) => (
          <TranslationListItem
            translation={trl}
            moveTranslationUp={i === 0 ? null : () => moveTranslationUp(i)}
            removeTranslation={() => removeTranslation(i)}
            addExample={createAddExampleFn(trl)}
            removeExample={createRemoveExampleFn(trl)}
          />
        ))
      ))}
    </ul>
  );
}

function createActions(translationsObs: Obs<Translation[]>) {
  const moveTranslationUp = (tIndex: number) => {
    const translations = translationsObs.value;
    [translations[tIndex], translations[tIndex - 1]] = [translations[tIndex - 1], translations[tIndex]];
    translationsObs.notify();
  };

  const removeTranslation = (tIndex: number) => {
    translationsObs.value.splice(tIndex, 1);
    translationsObs.notify();
  };

  const createAddExampleFn = (trl: Translation) => {
    return () => {
      trl.examples ??= [];
      trl.examples.push({ example: "", translation: "" });
      translationsObs.notify();
    };
  };

  const createRemoveExampleFn = (trl: Translation) => {
    return (exIndex: number) => {
      trl.examples && trl.examples.splice(exIndex, 1);
      trl.examples?.length || (delete trl.examples);
      translationsObs.notify();
    };
  };

  return {
    moveTranslationUp,
    removeTranslation,
    createAddExampleFn,
    createRemoveExampleFn
  };
}