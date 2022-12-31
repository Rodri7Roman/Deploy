import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getDogs,
  filterTemperaments,
  getTemperaments,
  filterCreated,
  orderByName,
  orderByWeight,
  searchDogs,
} from "../../redux/actions";
import Dog from "../Dog/Dog";
import Paginado from "../Paginado/Paginado";
import Loader from "../Loader/Loader";

const Home = (props) => {
  let [dogInput, setDogInput] = useState("");
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  // de mi state quiero state.dogs
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  //pag actual que arranca en 1
  const [currentPage, setCurrentPage] = useState(1);
  // dog por paginas que son 8
  const [dogsPerPage, setDogsPerPage] = useState(8);
  // indice del ultimo dog
  const indexOfLastDog = currentPage * dogsPerPage; // 8
  // indice del ultimo dog
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  // dogs que van a estar en la pagina actual
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginado = (number) => {
    setCurrentPage(number);
  };
  // cuando se monta el componente, despacho la accion getDogs, que hace el pedido al server
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, [dispatch]); // el array de dependencia debe estar vacio, osea cuando se carga el componente

  const handleChange = (event) => {
    setDogInput([(dogInput = event.target.value)]);
  };

  const handleFilterTemp = (e) => {
    dispatch(filterTemperaments(e.target.value));
  };
  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const orderByLetters = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    // seteo para que empiece desde la pagina 1
    setCurrentPage(1);
    //modifico el estado local y se renderiza
    setOrder(`Ordenado ${e.target.value}`);
  };

  const HandleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const searchName = (e) => {
    e.preventDefault();
    dispatch(searchDogs(dogInput));
    setDogInput("");
  };

  const loadAgain = () => {
    dispatch(getDogs());
  };

  return (
    <div className="container-home">
      <div className="container-filter">
        <div>
          <h2 className="text-filter">Order Alfabetic</h2>
          <select onChange={orderByLetters}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div>
          <h2 className="text-filter">Order Weight</h2>
          <select onChange={HandleOrderByWeight}>
            <option value="none">-</option>
            <option value="light">Light</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div>
          <h2 className="text-filter">Filter temperaments</h2>
          <select onChange={handleFilterTemp}>
            <option value="All">All</option>
            {temperaments?.map((temperament) => {
              return (
                <option value={temperament.name} key={temperament.id}>
                  {temperament.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <h2 className="text-filter">Filter created</h2>
          <select onChange={handleFilterCreated}>
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Existing">Existing</option>
          </select>
        </div>
      </div>

      <div className="container-dogs">
        <section className="section-input">
          <form className="container-input" onSubmit={searchName}>
            <input
              type="text"
              value={dogInput}
              onChange={handleChange}
              placeholder="Enter a breed"
            />
            <button type="submit" className="search-icon"></button>
          </form>
          <button onClick={loadAgain} className="loader-dogs">Load dogs Again</button>
        </section>

        <section>
          {currentDogs.length ? (
            <div className="container-cards" id="cards">
              {currentDogs?.map((dog) => {
                return (
                  <div className="card-container" key={dog.id}>
                    <NavLink to={"/home/" + dog.id} className="linkCard">
                      <Dog
                        name={dog.name}
                        image={
                          dog.image
                            ? dog.image
                            : "https://e7.pngegg.com/pngimages/552/1/png-clipart-dogs-dogs-thumbnail.png"
                        }
                        temperament={
                          dog.temperament
                            ? dog.temperament
                            : dog.temperaments?.map((e, i) => {
                                if (i !== dog.temperaments.length - 1)
                                  return e.name + ", ";
                                else return e.name;
                              })
                        }
                        weight={dog.weight}
                        key={dog.id}
                      />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <Loader />
          )}
        </section>
        <section>
          <Paginado
            dogsPerPage={dogsPerPage}
            dogs={dogs.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
