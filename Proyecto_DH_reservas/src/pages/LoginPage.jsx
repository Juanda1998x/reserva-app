import { useContext, useEffect, useState } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


export const LoginPage = () => {

  const { login } = useContext(UserContext);

  const naigate = useNavigate();

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

  const URL = 'http://localhost:8080/auth/login'; // URL del endpoint de inicio de sesión

  const { data, error, fetchData: fetchLogin } = useFetch();

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (error) {
      setFormError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      login(data)// Guardar los datos del usuario en localStorage
      naigate('/'); // Redirigir al usuario a la página principal después del inicio de sesión exitoso
    }
  }, [data, naigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // Limpiar errores previos
    await fetchLogin(URL, 'POST', JSON.stringify(form));

  };

  return (
    <div className="login-container">
      <h1>Inicia sesión</h1>
      <form className="form-login" onSubmit={handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Ingresar"
        />

      </form>
      {formError && <p className="error">{formError}</p>}

    </div>
  )
}
