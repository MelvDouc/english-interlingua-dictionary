import BoundInput from "$components/BoundInput/BoundInput.jsx";
import Button from "$components/Button/Button.jsx";
import ExampleList from "$components/EntryForm/ExampleList.jsx";
import type { Translation } from "$client/types.js";

export default function TranslationListItem({ translation: trl, moveTranslationUp, removeTranslation, addExample, removeExample }: {
  translation: Translation;
  moveTranslationUp: (() => void) | null;
  removeTranslation: () => void;
  addExample: () => void;
  removeExample: (exIndex: number) => void;
}) {
  return (
    <li className="list-group-item">
      <TranslationTextInput
        trl={trl}
        moveTranslationUp={moveTranslationUp}
        removeTranslation={removeTranslation}
      />
      <p className="d-flex gap-1">
        <BoundInput src={trl} key="detail" placeholder="Detail" />
      </p>
      <h4>Examples <Button color="success" click={addExample}>Add</Button></h4>
      {trl.examples && (<ExampleList examples={trl.examples} removeExample={removeExample} />)}
    </li>
  );
}

function TranslationTextInput({ trl, moveTranslationUp, removeTranslation }: {
  trl: Translation;
  moveTranslationUp: (() => void) | null;
  removeTranslation: () => void;
}) {
  return (
    <p className="d-flex gap-1">
      {moveTranslationUp && (<Button click={moveTranslationUp}>↑</Button>)}
      <BoundInput src={trl} key="translation" placeholder="Translation" required />
      <Button color="danger" click={removeTranslation}>Remove</Button>
    </p>
  );
}