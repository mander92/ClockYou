import { useState } from "react";

import "./Login.css";
const { VITE_API_URL } = import.meta.env;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchLoginService = async (email, password) => {
    const res = await fetch(`${VITE_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await res.json();

    if (body.status === "error") {
      throw new Error(body.message);
    }

    return body.token;
  };

  const handleFormClick = async (e) => {
    try {
      e.preventDefault();

      if (email === "" || password === "") {
        throw new Error("Debes completar todos los campos");
      } else {
        const message = await fetchLoginService(email, password);

        alert(message);

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main>
      <h2>Iniciar Sesión</h2>

      <form id="registerForm" onSubmit={handleFormClick}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </main>
  );
};

export default Login;
