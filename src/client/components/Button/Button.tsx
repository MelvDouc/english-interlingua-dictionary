export default function Button({ type, title, classNames, color, click, children }: Props) {
  const init = (element: HTMLButtonElement) => {
    element.type = type ?? "button";
    title && (element.title = title);
    element.classList.add("btn");
    element.classList.add(`btn-${color ?? "primary"}`);
    element.classList.add(...(classNames ?? []));
  };

  return (
    <button onclick={click} $init={init}>{children}</button>
  );
}

type Props = {
  type?: HTMLButtonElement["type"];
  title?: string;
  classNames?: string[];
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  click?: HTMLButtonElement["onclick"];
  children?: Node;
};