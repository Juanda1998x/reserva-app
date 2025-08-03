import { useContext, useEffect, useState } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../styles/LoginPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message || null;
  const redirectTo = location.state?.redirectTo || "/";

  const { login } = useContext(UserContext);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const URL = 'http://localhost:8080/auth/login';
  const { data, error, fetchData: fetchLogin } = useFetch();
  const [formError, setFormError] = useState('');
  const [hasLoggedIn, setHasLoggedIn] = useState(false); // ✅ NUEVA bandera para evitar bucles infinitos

  useEffect(() => {
    if (error) {
      setFormError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data && !hasLoggedIn) {
      login(data); // Guarda el usuario en contexto/localStorage
      setHasLoggedIn(true); // ✅ Marcamos que ya se hizo login
      navigate(redirectTo); // Redirige a donde venía
    }
  }, [data, navigate, redirectTo, login, hasLoggedIn]); // ✅ añadimos hasLoggedIn a dependencias

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    await fetchLogin(URL, 'POST', JSON.stringify(form));
  };

  return (
    <div className="login-container">
      <h1>Inicia sesión</h1>

      {/* Mostrar mensaje si viene desde reserva */}
      {message && (
        <p className="login-warning">
          {message} <br />
          ¿No tienes cuenta? <a href="/auth/register">Regístrate aquí</a>.
        </p>
      )}

      <form className="form-login" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="submit"
          value="Ingresar"
        />
      </form>

      {formError && <p className="error">{formError}</p>}
    </div>
  );
};
