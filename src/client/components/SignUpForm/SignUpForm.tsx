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
            <BoundInput src={data} key="email" id="email" type="email" required />
          </div>
        </article>
      </section>
      <section className="row">
        <article className="col-12">
          <div>
            <label className="form-label" htmlFor="password1">Password</label>
            <BoundInput src={data} key="password1" type="password" id="password1" required />
          </div>
        </article>
      </section>
      <section className="row">
        <article className="col-12">
          <div>
            <label className="form-label" htmlFor="password2">Confirm password</label>
            <BoundInput src={data} key="password2" type="password" id="password2" required />
          </div>
        </article>
      </section>
      <section className="row">
        <article className="col-12">
          <div>
            <Button color="success" type="submit">Sign up</Button>
          </div>
        </article>
      </section>
    </form>
  );
}

function getHandler() {
  const data = {
    email: "",
    password1: "",
    password2: ""
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (data.password1 !== data.password2) {
      alert("Passwords don't match.");
      return;
    }

    const [response, error] = await api<{ error: unknown; }>("/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email, password: data.password1 })
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