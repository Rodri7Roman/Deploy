import axios from "axios";
import {
  GET_DOGS,
  GET_DOG,
  GET_TEMPERAMENTS,
  SEARCH_DOGS,
  FILTER_BY_CREATION,
  ORDER_BY_LETTERS,
  FILTER_BY_TEMPERAMENTS,
  ORDER_BY_WEIGHT,
  CLEAN_DOG,
  CREATE_DOG,
} from "./types";

// me va a devolver una funcion
export const getDogs = () => {
  // recibe como parametro el dispatch
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      const dogs = response.data;
      dispatch({
        type: GET_DOGS,
        payload: dogs,
      });
    } catch (error) {
      alert(error.message)
      // dispatch({
      //   type: ERROR,
      //   payload: error.message,
      // });
    }
  };
};

export const getDog = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${payload}`);
      const dog = response.data;
      return dispatch({
        type: GET_DOG,
        payload: dog,
      });
    } catch (error) {
      alert(error.response.data)
      // dispatch({
      //   type: ERROR,
      //   payload: error.message,
      // });
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      return axios
        .get("http://localhost:3001/temperaments")
        .then((response) => {
          dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
        });
    } catch (error) {
      alert(error.response.data)
    }
  };
};

export const filterTemperaments = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_LETTERS,
    payload,
  };
};

// FILTRANDO DESDE EL FRONT
// export const searchDogs = (options) => {
//   return async (dispatch) => {
//     return dispatch({ type: SEARCH_DOGS, payload: options });
//   };
// };

export const searchDogs = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${payload}`
      );
      const dogs = response.data;
      console.log(dogs);

      return dispatch({
        type: SEARCH_DOGS,
        payload: dogs,
      });
    } catch (error) {
      alert(error.response.data)
    }
  };
};
export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};


export const createDog = (payload) => {
  return async () => {
    try {
      const response = await axios.post("http://localhost:3001/dogs", payload);
      return response;
    } catch (error) {
      alert(error.response.data)
    }
  };
};

export function cleanDog() {
  return async function (dispatch) {
    return dispatch({ type: CLEAN_DOG, payload: {} });
  };
}


