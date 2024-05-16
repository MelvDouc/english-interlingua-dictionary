import RandomEntryLink from "$components/Nav/RandomEntryLink.jsx";
import SearchForm from "$components/Nav/SearchForm.jsx";
import LogOutButton from "$components/LogOutButton/LogOutButton.jsx";
import RouterLink from "$components/RouterLink/RouterLink.jsx";
import auth from "$client/utils/auth.js";
import cssClasses from "./Nav.module.scss";

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
        <ul className="navbar-nav">
          <li className="nav-item">
            <RouterLink className="nav-link" href="/all-entries">All Entries</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink className="nav-link" href="/entry/add">Add Entry</RouterLink>
          </li>
          <li className="nav-item">
            <RandomEntryLink />
          </li>
          <li className="nav-item">
            {auth.map((user) => (
              user
                ? (<LogOutButton />)
                : (<RouterLink className="nav-link" href="/entry/add">Add Entry</RouterLink>)
            ))}
          </li>
        </ul>
      </div>
    </>
  );
}