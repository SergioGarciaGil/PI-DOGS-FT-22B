import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //con use selector remplazamos mapDispatchTop..

  useEffect(() => {
    dispatch(getDogs()); //con useEfect despachamos las acciones
  }, [dispatch]); //como no depende de otros estados se deja vacio.

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs);
  }
  return (
    <div>
      <Link to="/dog">Crear Dog</Link>
      <h1>Aguante Breaking Bad</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los personajes
      </button>
      <div>
        <select>
          {/* <p>Orden alfabético</p> */}
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          {/* <p>Orden por peso</p> */}
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          {/* <p>My Dogs</p> */}
          <option value="all">Todos</option>
          <option values="create">Creados</option>
          <option value="api">Existentes</option>
        </select>
        {allDogs.map((e) => {
          return (
            <>
              <div key={e.id}>
                <Link to={"/home/" + e.id}>
                  <DogCard name={e.name} image={e.image} key={e.id} />;
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
