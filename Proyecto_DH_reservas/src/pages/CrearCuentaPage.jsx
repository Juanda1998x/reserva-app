import { use, useState } from "react";
import "../styles/CrearCuentaPage.css";
import { useFetch } from "../Hoocks/UseFetch";
import {  useNavigate } from "react-router-dom";
export const CrearCuentaPage = () => {

  const navigate = useNavigate();

  const [errores, setErrores] = useState({})

  const validar = () => {


    const erroresTemp = {};
    // validacion nombre
    if (!form.name.trim()) {
      erroresTemp.name = 'El nombre es obligatorio';
    }

    // validacion apellido
    if (!form.lastName.trim()) {
      erroresTemp.lastName = 'El apellido es obligatorio';
    }
    // validacion email
    if (!form.email.trim()) {
      erroresTemp.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      erroresTemp.email = 'El email debe ser válido';
    }
    // validacion contrasenia
    if (!form.password.trim()) {
      erroresTemp.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 5) {
      erroresTemp.password = 'La contraseña debe tener al menos 5 caracteres';
    }

    return erroresTemp;

  }

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    conditions: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const URL = 'http://localhost:8080/auth/register';

  const { fetchData: fetchRegister } = useFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidos = validar();
    if (Object.keys(erroresValidos).length > 0) {
      setErrores(erroresValidos);

    } else {
      setErrores({});
      fetchRegister(URL, 'POST', JSON.stringify(form));
      console.log("Datos del formulario:", form);
      setForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        conditions: false
      });

      navigate('/auth/login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      alert('Formulario enviado correctamente');
    }
  };

  return (
    <div className="registration-form">

      <h2>Formulario de Registro</h2>

      <form className="form" onSubmit={handleSubmit}>

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
        />

        {errores.name && <div className="error" id="errorNombre">{errores.name}</div>}

        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          autoComplete="off"
          value={form.lastName}
          onChange={handleChange}
        />
        {errores.lastName && <div className="error" id="errorApellido">{errores.lastName}</div>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errores.email && <div className="error" id="errorEmail">{errores.email}</div>}

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
        />
        {errores.password && <div className="error" id="errorContrasenia">{errores.password}</div>}

        <label htmlFor="edad">Edad:</label>
        <input
          type="number"
          id="age"
          name="age"

          value={form.age}
          onChange={handleChange}
        />
        <div className="error" id="errorEdad"></div>

        <label className="inline">
          <input
            type="checkbox"
            name="conditions"
            id="conditions"

            checked={form.conditions}
            onChange={handleChange}
          />
          Acepto términos y condiciones
        </label>
        <div className="error" id="errorTerminos"></div>

        <input
          type="submit"
          value="Registrar"
        />
      </form>

    </div>

  )
}
