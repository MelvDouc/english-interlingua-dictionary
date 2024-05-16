import type { PathName } from "client-side-router";
import router from "$client/utils/router.js";

export default function RouterLink({ href, className, children }: {
  href: PathName;
  className?: string;
  children?: Node;
}) {
  const handleClick = async (e: MouseEvent) => {
    if (e.ctrlKey)
      return;
    e.preventDefault();
    await router.navigate(href);
  };

  return (
    <a href={href} className={className ?? ""} onclick={handleClick}>{children}</a>
  );
}