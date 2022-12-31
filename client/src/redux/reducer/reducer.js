import {
  GET_DOGS,
  GET_DOG,
  ERROR,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_CREATION,
  ORDER_BY_LETTERS,
  ORDER_BY_WEIGHT,
  SEARCH_DOGS,
  CREATE_DOG,
  CLEAN_DOG,
} from "../actions/types";

const initialState = {
  dogs: [],
  // creo un allDogs para que siempre tenga todos los dogs cuando vaya filtrando
  allDogs: [],
  dog: {},
  temperaments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        // todo lo que tiene el estado
        ...state,
        // todo lo que mande la action GET_DOGS
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMPERAMENTS:
      let result = [];
      const allDogs = state.allDogs;

      // si el value es All me devuelve todos los dogs sino filtra dependiendo el temperament recibido
      result =
        action.payload === "All"
          ? allDogs
          : state.allDogs.filter((e) =>
              e.temperament?.includes(action.payload)
            );
      return {
        ...state,
        dogs: result,
      };

    case FILTER_BY_CREATION:
      const allDogs2 = state.allDogs;
      // si el value es created hago un filter de los que tenga la prop createInDb
      // si el value es Existing hago un filter de los que no lo tengan
      const createdFilter =
        action.payload === "Created"
          ? allDogs2.filter((dog) => dog.createInDb)
          : allDogs2.filter((dog) => !dog.createInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? state.allDogs : createdFilter,
      };

    case ORDER_BY_LETTERS:
      const sortedArr =
        action.payload === "asc"
          ? // hacer sort
            state.dogs.sort((a, b) => {
              // comparar y ponerlo despues o antes en el array
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              // lo deja como esta si son iguales
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        dogs: sortedArr,
      };
    case ORDER_BY_WEIGHT:
      const sortedWeight =
        action.payload === "light"
          ? state.dogs.sort((a, b) => {
              if (parseInt(a.weight.at(0)) > parseInt(b.weight.at(0))) return 1;
              if (parseInt(b.weight.at(0)) > parseInt(a.weight.at(0)))
                return -1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.weight.at(0)) > parseInt(b.weight.at(0)))
                return -1;
              if (parseInt(b.weight.at(0)) > parseInt(a.weight.at(0))) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };
    case SEARCH_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case CREATE_DOG:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };
    case CLEAN_DOG:
      return {
        ...state,
        dog: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
