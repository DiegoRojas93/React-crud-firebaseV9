import React, { useEffect, useState } from "react";

import { app } from "../firebase/firebaseConfig";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app)

const valueInitial = {
  nombre: "",
  edad: "",
  profession: ""
}

export const Home = ({ emailUser }) => {

  const [user, setUser] = useState(valueInitial)

  const [lista, setLista] = useState([])

  const [subId, setSubId] = useState('')

  useEffect(() => {

    const getList = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"))

        const docs = []

        querySnapshot.forEach( doc => docs.push({...doc.data(), id:doc.id}))

        setLista(docs);

      } catch (error) {
        console.log(error)
      }
    }

    getList()
    // console.log(lista);
  }, [lista])

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(subId === '') {
      try {
        await addDoc(collection(db, "Users"), {...user})
      } catch (error) {
        console.log(error);
      }
    } else {
      await setDoc(doc(db, "Users", subId), { ... user })
      setSubId('')
    }
    setUser(valueInitial);
  }

  const deleteUser = async(id) => {
    await deleteDoc(doc(db, "Users", id))
  }

  const getOne = async(id) => {
    try {
      const docRef = doc(db, "Users", id),
            docSnap = await getDoc(docRef);
      setUser(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      if (subId !== '') {
        getOne(subId)
      }
  }, [subId])


  return (
    <div className="container">
      <p>
        Bienvenido, <strong>{emailUser}</strong> Haz iniciado sesion
      </p>
      <button className="btn btn-primary" onClick={() => signOut(auth)}>
        Cerrar Sesion
      </button>

      <hr />

      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center mb-3">Ingresar usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="card card-body">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  className="form-control mb-3"
                  placeholder="ingresar el nombre del usuario"
                  value={user.nombre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="edad"
                  className="form-control mb-3"
                  placeholder="ingresar edad"
                  value={user.edad}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="profession"
                  className="form-control mb-3"
                  placeholder="ingresar la profesion"
                  value={user.profession}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary">
                { subId === '' ? 'Guardar' : 'Actualizar' }
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <h3 className="text-center mb-5">lista de usuarios</h3>

          <div className="container card">
            <div className="card-body">
              {
                lista.map( ({ id, nombre, edad, profession }) => (
                  <div key={id}>
                    <p>Nombre: {nombre}</p>
                    <p>Edad: {edad}</p>
                    <p>Edad: {profession}</p>

                    <button className="btn btn-danger" onClick={() => deleteUser(id)}>Eliminar</button>
                    <button className="btn btn-success m-1" onClick={() => setSubId(id)}>
                      Actualizar
                    </button>

                    <hr />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
