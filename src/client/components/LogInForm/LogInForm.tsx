import api from "$client/utils/api.js";
import router from "$client/utils/router.js";
import BoundInput from "$components/BoundInput/BoundInput.jsx";
import Button from "$components/Button/Button.jsx";

export default function SignUpForm() {
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

    const [response, error] = await api<{ error: unknown; }>("/auth/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response) {
      alert(JSON.stringify(error));
      return;
    }

    if (response.error !== null) {
      alert(JSON.stringify(response.error));
      return;
    }

    router.navigate("/");
  };

  return { data, handleSubmit };
}