import RandomEntryLink from "$components/Nav/RandomEntryLink.jsx";
import SearchForm from "$components/Nav/SearchForm.jsx";
import LogOutButton from "$components/LogOutButton/LogOutButton.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import auth from "$client/utils/auth.js";
import cssClasses from "./Nav.module.scss";
import "css.gg/icons/css/math-plus.css";

export default function Nav() {
  return (
    <nav className={cssClasses.Nav}>
      <section className={cssClasses.NavTop}>
        <h1><RouterLink href="/" title="Home">EN-IA Dictionary</RouterLink></h1>
        <SearchForm />
      </section>
      <section className={cssClasses.NavBottom}>
        <article className={`${cssClasses.NavBottomLeft}`}>
          <ul>
            <li><RouterLink href="/all-entries" title="All entries">All</RouterLink></li>
            <li><RandomEntryLink /></li>
            <AddEntryLi />
          </ul>
        </article>
        <article className={`${cssClasses.NavBottomRight}`}>
          <AuthLinks />
        </article>
      </section>
    </nav>
  );
}

function AddEntryLi() {
  if (!auth.isModOrMore())
    return null;

  return (
    <li>
      <RouterLink href="/entry/add" title="Add entry">Add Entry</RouterLink>
    </li>
  );
}

function AuthLinks() {
  if (auth.isLoggedIn())
    return (
      <LogOutButton />
    );

  return (
    <div className="d-flex align-items-center gap-1 text-light">
      <RouterLink href="/log-in">Log in</RouterLink>
      /
      <RouterLink href="/sign-up">Sign up</RouterLink>
    </div>
  );
}