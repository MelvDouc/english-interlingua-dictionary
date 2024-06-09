import type { PathName } from "client-side-router";
import router from "$client/utils/router.js";

export default function RouterLink({ href, className, title, children }: {
  href: PathName;
  className?: string;
  children?: Node;
  title?: string;
}) {
  const handleClick = async (e: MouseEvent) => {
    if (e.ctrlKey)
      return;
    e.preventDefault();
    await router.navigate(href);
  };

  return (
    <a href={href} title={title ?? ""} className={className ?? ""} onclick={handleClick}>{children}</a>
  );
}