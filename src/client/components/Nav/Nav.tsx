import RandomEntryLink from "$components/Nav/RandomEntryLink.jsx";
import SearchForm from "$components/Nav/SearchForm.jsx";
import LogOutButton from "$components/LogOutButton/LogOutButton.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import auth from "$client/utils/auth.js";
import cssClasses from "./Nav.module.scss";
import "css.gg/icons/css/math-plus.css";

export default function Nav() {
  return (
    <nav className={`${cssClasses.Nav} navbar navbar-expand-lg p-2 bg-primary bg-gradient`}>
      <div className="container-fluid">
        <RouterLink className="navbar-brand" href="/">EN-IA Dictionary</RouterLink>
        <SearchForm />
        <Links />
      </div>
    </nav>
  );
}

function Links() {
  return (
    <>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav justify-content-end align-items-center w-100">
          <li className="nav-item">
            <RouterLink className="nav-link" href="/all-entries" title="All entries">All</RouterLink>
          </li>
          <li className="nav-item">
            <RandomEntryLink />
          </li>
          {auth.map(() => (
            auth.isModOrMore() && (
              <li className="nav-item">
                <RouterLink className="nav-link" href="/entry/add" title="Add entry">
                  <i className="gg-math-plus"></i>
                </RouterLink>
              </li>
            )
          ))}
          <li className="nav-item">
            {auth.map((user) => (
              user
                ? (<LogOutButton />)
                : (
                  <div className="d-flex align-items-center gap-1 text-light">
                    <RouterLink className="nav-link" href="/log-in">Log in</RouterLink>
                    /
                    <RouterLink className="nav-link" href="/sign-up">Sign up</RouterLink>
                  </div>
                )
            ))}
          </li>
        </ul>
      </div>
    </>
  );
}