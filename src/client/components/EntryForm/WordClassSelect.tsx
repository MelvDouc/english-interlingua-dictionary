import WORD_CLASSES from "$src/word-classes";
import type { Entry, Obs } from "$client/types.js";

export default function WordClassSelect({ classesObs }: {
  classesObs: Obs<Entry["classes"]>;
}) {
  const init = (element: HTMLSelectElement) => {
    element.addEventListener("change", () => {
      const index = +element.value;
      classesObs.value[WORD_CLASSES[index]] ??= [
        { translation: "" }
      ];
      classesObs.notify();
      element.value = "";
    });
  };

  return (
    <select className="form-select" $init={init}>
      <option value="" selected disabled>--</option>
      {classesObs.map(getOptions)}
    </select>
  );
}

function getOptions(classes: Entry["classes"]) {
  return WORD_CLASSES.reduce((acc, wordClass, i) => {
    if (!(wordClass in classes))
      acc.push(
        <option value={i.toString()}>{wordClass}</option>
      );
    return acc;
  }, [] as HTMLOptionElement[]);
}