import BoundInput from "$components/BoundInput/BoundInput.jsx";
import Button from "$components/Button/Button.jsx";
import type { Example } from "$client/types.js";

export default function ExampleList({ examples, removeExample }: {
  examples: Example[];
  removeExample: (exIndex: number) => void;
}) {
  return (
    <ul>
      {examples.map((ex, i) => (
        <li>
          <div className="d-flex gap-2">
            <BoundInput src={ex} key="example" placeholder="Example" required />
            <BoundInput src={ex} key="translation" placeholder="Translation" required />
            <Button color="danger" click={() => removeExample(i)}>X</Button>
          </div>
        </li>
      ))}
    </ul>
  );
}