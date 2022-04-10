import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getTemperaments,
  filterByTemperaments,
  filterByRaza,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import style from "./Home.module.css";
import LinkTitle from "./Card.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //trae todo lo que este en la constante de dogs
  const allTemperaments = useSelector((state) => state.temperaments);
  const allRazas = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1); //seteado el estado local, la pag actual y el estado que setee la pag
  const [dogsPerPage /*setDogsPerPage*/] = useState(8); //los perros por paginas
  const indexOfLastDog = currentPage * dogsPerPage; //Mi paginas por los dogs por pag
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //divide el array de perros para cada pag, dejando 8porpag

  // const [temperament, setTemperament] = useState("All");
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //para poder renderizar el paginado

  //me traigo los dogs cuando el componente se monta
  useEffect(() => {
    dispatch(getAll()); //es lo mimso que el mapdistpachtoprops
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    // resetea todo, carga todo de nuevo
    e.preventDefault(); //se coloca de forma preventiva
    dispatch(getAll());
    setCurrentPage(1);
  }
  function handleFilterTemperament(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByTemperaments(e.target.value)); //accedo al valor que se hace click en la web
  }

  //
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    // setBreeds(e.target.value);
    setCurrentPage(1);
  }

  const [, setOrder] = useState(""); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //seteamos en la primer pagina
    setOrder(`Ordenado ${e.target.value}`);
  }

  const [, setOrderWeight] = useState("");
  function handleByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrderWeight(`Ordernado ${e.target.value}`);
  }

  function handleFilterByRaza(e) {
    e.preventDefault();
    dispatch(filterByRaza(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={style.container}>
      <div className={style.contentSelect}>
        <ul className={style.navbar}>
          <div className="">
            <li>
              <button onClick={(e) => handleClick(e)} className={style.allDog}>
                ALL DOGS
              </button>
            </li>
          </div>
          <li className={style.contentSelect}>
            <select onChange={(e) => handleSort(e)}>
              <option value="" hidden>
                Sort Breed by Name
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </li>

          <li className={style.contentSelect}>
            <select onChange={(e) => handleByWeight(e)}>
              <option value="" hidden>
                Sort by weight
              </option>
              <option value="asc">Lighter to heavier</option>
              <option value="desc">Heavier to lighter</option>
            </select>
          </li>
          <li className={style.contentSelect}>
            <select onChange={(e) => handleFilterTemperament(e)}>
              <option key={0} value="All">
                All temperaments
              </option>

              {allTemperaments
                ?.sort(function (a, b) {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
                })
                .map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </li>
          <button onClick={(e) => handleClick(e)} className={style.btnAllRazas}>
            AllRazas
          </button>
          <li className={style.contentSelect}>
            <select onChange={(e) => handleFilterByRaza(e)}>
              <option key={0} value="all" hidden>
                All Razas
              </option>

              {allRazas
                ?.sort(function (a, b) {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 5;
                })
                .map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </li>

          <li className={style.contentSelect}>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="api">Existent</option>
              <option value="created">Created</option>
            </select>
          </li>
          <div>
            <Link to="/dog">
              <button className={style.allDog}>CREATE A NEW DOG</button>
            </Link>
          </div>
        </ul>
        <SearchBar />
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>

      <div className={style.mainCard}>
        {currentDogs?.map((e) => {
          return (
            <div key={e.id}>
              <Link to={"/dogs/" + e.id} className={LinkTitle.linkTitle}>
                <Card
                  key={e.id}
                  name={e.name}
                  image={e.img ? e.img : e.image}
                  weightMin={e.weightMin}
                  weightMax={e.weightMax}
                  heightMin={e.heightMin}
                  heightMax={e.heightMax}
                  temperaments={e.temperament}
                  life_span={e.life_span}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <Link to="/">
        <div className={style.welcome}>
          <button>
            <span>Welcome Page</span>
          </button>
        </div>
      </Link>
    </div>
  );
}
