import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  /*
//    * Ahora si tengo 'pageNumber', mapeamos todos los números que contenga el arreglo.
//    */
  return (
    <div>
      <nav>
        <ul>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
