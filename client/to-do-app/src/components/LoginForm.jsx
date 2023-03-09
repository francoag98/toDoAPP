import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().required("Este campo es obligatorio"),
    // .email("Debe ser un mail valido"),
    password: yup.string().required("Este campo es obligatorio"),
  })
  .required();

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((value) => {});
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
