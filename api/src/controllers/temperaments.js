const axios = require("axios");
const { Temperament } = require("./../db");

// funcion para crear temperamentos. Por cada elemento del array crea un nuevo temperamento
const createTemperaments = async (array) => {
  array.forEach((temperament) => {
    Temperament.findOrCreate({
      where: { name: temperament },
    });
  });
};

const getTemperaments = async () => {
  //hago un llamado a la api, me devuelve el array de todos los perros
  const apiData = await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.message);
    });

  let temperament = [];

  apiData.map((elemento) => {
    // si tengo temperament hago un split por (", ")
    let aux = elemento.temperament?.split(", ");
    // le concateno el temperamento al array creado arriba
    temperament = temperament.concat(aux);
  });
  // creo un set para que no se repitan los temperamentos. comprobando que el elemento no sea undefined y los ordeno
  temperament = [...new Set(temperament)].filter((e) => e !== undefined).sort();

  // retorna el resultado de la funcion createTemperaments pasandole como parametro el array resultante
  return createTemperaments(temperament);
};

module.exports = getTemperaments;
