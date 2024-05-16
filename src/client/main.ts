import "bootstrap/dist/js/bootstrap.min.js";
import "reactfree-jsx";
import "./main.scss";
import App from "$client/App.jsx";
import AddEntryPage from "$client/pages/AddEntryPage.jsx";
import EntriesPage from "$client/pages/EntriesPage.jsx";
import HomePage from "$client/pages/HomePage.jsx";
import LogInPage from "$client/pages/LogInPage.jsx";
import SignUpPage from "$client/pages/SignUpPage.jsx";
import UpdateEntryPage from "$client/pages/UpdateEntryPage.jsx";
import WordsPage from "$client/pages/WordsPage.jsx";
import auth from "$client/utils/auth.js";
import router from "$client/utils/router.js";

router
  .setRoute("/", async (_, res) => {
    res
      .setDocumentTitle("Home")
      .setComponent(HomePage());
  })
  .setRoute("/sign-up", (_req, res) => {
    if (auth.isLoggedIn()) {
      location.assign("/");
      return;
    }
    res
      .setDocumentTitle("Sign up")
      .setComponent(SignUpPage());
  })
  .setRoute("/log-in", (_req, res) => {
    if (auth.isLoggedIn()) {
      location.assign("/");
      return;
    }
    res
      .setDocumentTitle("Log in")
      .setComponent(LogInPage());
  })
  .setRoute("/all-entries", async (_req, res) => {
    res
      .setDocumentTitle("All Entries")
      .setComponent(await WordsPage());
  })
  .setRoute("/entries/:word", async (req, res) => {
    const params = {
      word: decodeURIComponent(req.params.word)
    };
    res
      .setDocumentTitle(params.word)
      .setComponent(await EntriesPage(params));
  })
  .setRoute("/entry/add", async (_, res) => {
    if (!auth.isModOrMore()) {
      location.assign("/");
      return;
    }
    res
      .setDocumentTitle("Add an entry")
      .setComponent(AddEntryPage());
  })
  .setRoute("/entry/update/:id", async ({ params }, res) => {
    res
      .setDocumentTitle("Update an entry")
      .setComponent(await UpdateEntryPage(params));
  });

document.body.appendChild(App({ router }));
router.start();