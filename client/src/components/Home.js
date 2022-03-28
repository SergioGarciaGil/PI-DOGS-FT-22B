import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";
import Paginado from "./Paginado";

export default function Home() {
  // const dispatch = useDispatch();
  // const allDogs = useSelector((state) => state.dogs); //con use selector remplazamos mapDispatchTop..
  // const [currentPage, setCurrentPage] = useState(1); //guardamos en un estado actual la pagian local y creamos una constante que setee la pagina actual y empezamos en 1 por que siempre voy arrancar en la primer pagina
  // const [dogsPerPage, setDogsPerPage] = useState(9); //en esta const guardamos cuantos Dogs quiero por pagina

  // const indexOfLastDog = currentPage * dogsPerPage; // indice del ultimo personaje es igual pagina actual x Dogs  por pagina = 8
  // const indexOfFirstDog = indexOfLastDog - dogsPerPage; //indice del ultimo personaje menos personajes por paginas = 0

  // const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [dogsPerPage, setDogsPage] = useState(9);
  //
  /**
   * El índice del último perro es: la página actual (Default: 1), por la cantidad de perros por página (Default: 9).
   */
  const indexOfLastDog = currentPage * dogsPerPage; // 9
  //|||||||||||||||||||||||||||||||||||||||||||||||
  /**
   * El índice del primer perro es: el índice del último perro (Default: 9), menos la cantidad de perros por página (Default: 9).
   */
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  //||||||||||||||||||||||||||||||||||||||||||||||||
  /**
   * La constante agarra solo las porciones que estan marcadas en los parámetros, que serían el índice del primer perro (0), hasta el índice del último perro (9), por lo tanto quedarían solo 9 perros por página. Renderizando desde el perro numero 0 hasta el perro numero 8, siendo 9 perros en total. Magic.
   * PÁGINA 1 -> Primer perro 0 <---> Último perro 9.
   * PÁGINA 2 -> Primer perro 10 <---> Último perro 19.
   */
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  // const paginado = (pageNumbers) => {
  //   //paginado setea la pagina en el numero que vaya haciendo click
  //   setCurrentPage(pageNumbers);
  // };
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getDogs()); //con useEfect despachamos las acciones
  }, [dispatch]); //como no depende de otros estados se deja vacio.

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
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
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        {/* <div>
          {currentDogs &&
            currentDogs?.map((e) => {
              return (
                <>
                  <div key={e.id}>
                    <Link to={"/home/" + e.id}>
                      <DogCard
                        id={e.id}
                        name={e.name}
                        image={e.img}
                        key={e.id}
                      />
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div> */}
        <div>
          {currentDogs &&
            currentDogs.map((e) => {
              return (
                <Link to={"/dogs/" + e.id}>
                  <DogCard
                    name={e.name}
                    image={e.img ? e.img : e.image}
                    temperament={e.temperament}
                    temperaments={e.temperaments}
                    id={e.id}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
