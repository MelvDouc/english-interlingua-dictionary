import api from "$client/utils/api.js";
import { setAuthToken } from "$client/utils/local-storage.js";
import BoundInput from "$components/BoundInput/BoundInput.jsx";
import Button from "$components/Button/Button.jsx";

export default function LogInForm() {
  const { data, handleSubmit } = getHandler();

  return (
    <form className="d-flex flex-column p-4 gap-5 rounded bg-primary text-light" onsubmit={handleSubmit}>
      <section className="row">
        <article className="col-12">
          <div>
            <label className="form-label" htmlFor="email">Email</label>
            <BoundInput src={data} key="email" type="email" id="email" required />
          </div>
        </article>
      </section>
      <section className="row">
        <article className="col-12">
          <div>
            <label className="form-label" htmlFor="password">Password</label>
            <BoundInput src={data} key="password" type="password" id="password" required />
          </div>
        </article>
      </section>
      <section className="row">
        <article className="col-12">
          <div>
            <Button color="success" type="submit">Log in</Button>
          </div>
        </article>
      </section>
    </form>
  );
}

function getHandler() {
  const data = {
    email: "",
    password: ""
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const [authToken, error] = await api<string | null>("/auth/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (error) {
      console.log(error);
      return;
    }

    if (!authToken) {
      console.log("Invalid credentials.");
      return;
    }

    setAuthToken(authToken);
    location.assign("/");
  };

  return { data, handleSubmit };
}