import React, { useState } from "react";

import uno from '../assets/images/1.jpg'
import dos from '../assets/images/2.jpg'
import tres from '../assets/images/3.jpg'

import { app } from '../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app)

export const Login = () => {

  const [registro, setRegistro] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const correo = e.target.email.value,
          contraseña = e.target.contraseña.value;

    if (registro) {
      await createUserWithEmailAndPassword(auth, correo, contraseña)
    } else {
      await signInWithEmailAndPassword(auth, correo, contraseña)
    }
  }

  return (
    <div className="row container p-4">
      <div className="col-md-8">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={uno} className="tamaño-imagen" alt="1" />
            </div>
            <div className="carousel-item">
              <img src={dos} className="tamaño-imagen" alt="2" />
            </div>
            <div className="carousel-item">
              <img src={tres} className="tamaño-imagen" alt="3" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="col-md-4">
        <div className="mt-5 ms-5">
          <h1>
            { registro ? 'Registrate' : 'Inicia sesion'}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className='form-label'>Direccion de Email: </label>
              <input type="email" name="" id="email" className="form-control" placeholder="Ingresar email" required autoComplete="true"/>
            </div>
            <div className="mb-3">
              <label className='form-label'>Contraseña: </label>
              <input type="password" name="" id="contraseña" className="form-control" placeholder="Ingresar contraseña" required autoComplete="true"/>
            </div>

            <button className='btn btn-primary' type="submit">
              { registro ? 'Registrate' : 'Inicia sesion'}
            </button>
          </form>

          <div className="form-group">
            <button className="btn btn-secondary mt-4 form-control" onClick={() => setRegistro(!registro)}>
              { registro ? 'Ya tienes cuenta? Inicia sesion' : 'No tienes cuenta? Registrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
