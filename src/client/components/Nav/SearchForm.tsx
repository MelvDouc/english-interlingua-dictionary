import router from "$client/utils/router.js";
import "css.gg/icons/css/search.css";

export default function SearchForm() {
  return (
    <form className="d-flex" onsubmit={handleSubmit}>
      <input
        className="form-control me-2 w-100"
        type="search"
        name="word"
        placeholder="Search..."
        aria-label="Search"
        required
      />
      <button className="btn btn-light btn-outline-success" type="submit">
        <i className="gg-search"></i>
      </button>
    </form>
  );
}

async function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const word = formData.get("word");
  if (typeof word !== "string") return;
  await router.navigate(`/entries/${word}`);
  form.reset();
}