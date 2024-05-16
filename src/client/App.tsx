import Nav from "$components/Nav/Nav.jsx";
import Overlay from "$components/Overlay/Overlay.jsx";
import { obs } from "reactfree-jsx";
import cssClasses from "./App.module.scss";

export default function App({ router }: {
  router: import("client-side-router").Router;
}) {
  const overlayVisibilityObs = obs(false);

  const init = (element: HTMLElement) => {
    let doneOnce = false;
    router.onNavigationStarted(() => {
      overlayVisibilityObs.value = doneOnce;
      doneOnce = true;
    });
    router.onNavigationComplete(({ documentTitle, component }) => {
      component && element.replaceChildren(component);
      overlayVisibilityObs.value = false;
      document.title = `${documentTitle} | English-Interlingua Dictionary`;
    });
  };

  return (
    <div className={cssClasses.App}>
      <Nav />
      <main className="h-100 p-4 overflow-y-auto">
        <div className="container" $init={init}></div>
      </main>
      <Overlay visibilityObs={overlayVisibilityObs} />
    </div>
  );
}