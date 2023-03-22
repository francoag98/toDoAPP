import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    email: yup
      .string()
      .email("debe ser un mail valido")
      .required("completa este campo"),
    // .email("Debe ser un mail valido"),
    password: yup.string().required("completa este campo"),
  })
  .required("Usuario o contraseña incorrectos");

export const Login = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit(async (value) => {
    let back_url = process.env.REACT_APP_BACKEND_URL;
    await axios
      .post(`${back_url}/login`, value)
      .then(({ data }) => {
        localStorage.setItem("userSession", JSON.stringify(data));
        sessionStorage.setItem("userSession", JSON.stringify(data));
        navigate("/");
      })
      .catch((e) => {
        if (e.response.data.message) {
          setResult(e.response.data.message);
        }
      });
  });

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <div>
          <input
            type="text"
            placeholder="Ingrese su Email..."
            {...register("email")}
          />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password")}
          />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        {result.length ? <p>{result}</p> : null}
      </div>
      <div>
        <input type="submit" value="Ingresar" />
        <button>
          <Link to="/Register">Registrarse</Link>
        </button>
      </div>
    </form>
  );
};
