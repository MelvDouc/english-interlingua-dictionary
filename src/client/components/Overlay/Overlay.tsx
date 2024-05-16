import type { Obs } from "$client/types.js";
import cssClasses from "./Overlay.module.scss";

export default function Overlay({ visibilityObs }: {
  visibilityObs: Obs<boolean>;
}) {
  return (
    <div className={{
      [cssClasses.Overlay]: true,
      [cssClasses.visible]: visibilityObs
    }}>
      <div className={cssClasses.Spinner}>
        <div className={cssClasses.SpinnerMask}></div>
      </div>
    </div>
  );
}