import React from "react";
import "./Paginado.css";

const Paginado = ({ dogsPerPage, dogs, paginado, currentPage}) => {
  console.log(currentPage);
  const pageNumbers = [];
  // divido todos los perros por la cantidad de perros por pagina
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="container-pag">
      <ul className="ul-pag">
        {pageNumbers?.map((number) => {
          return (
            <li className="li-pag" key={number}>
              <a onClick={() => paginado(number)} className={currentPage === number ? "current" : "notCurrent"}>{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Paginado;
