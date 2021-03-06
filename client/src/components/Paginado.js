import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }
  /*
//    * Ahora si tengo 'pageNumber', mapeamos todos los números que contenga el arreglo.
//    */
  return (
    <div>
      <nav>
        <ul className={style.ul}>
          {pageNumber &&
            pageNumber.map((number) => (
              <li key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
