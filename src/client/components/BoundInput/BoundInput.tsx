export default function BoundInput<T extends string>({ src, key, id, type, placeholder, required }: {
  src: { [K in T]?: string };
  key: T;
  placeholder?: string;
  id?: string;
  type?: string;
  required?: boolean;
}) {
  const init = (element: HTMLInputElement) => {
    const value = src[key];
    value && (element.value = value);
    id && (element.id = id);
    type && (element.type = type);
    placeholder && (element.placeholder = placeholder);
    element.required = !!required;
    element.addEventListener("input", () => {
      src[key] = element.value;
    });
  };

  return (
    <input type="text" className="form-control" $init={init} />
  );
}