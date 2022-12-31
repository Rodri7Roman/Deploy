const { default: axios } = require("axios");
const { Dog, Temperament } = require("../db");

// llamado a la api externa y obtencion de los datos necesarios para la ruta principal
const getDogs = async () => {
  const apiData = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiDogs = apiData.data.map((elemento) => {
    return {
      id: elemento.id,
      image: elemento.image.url,
      name: elemento.name,
      temperament: elemento.temperament,
      // convierto en lista los datos "minimo" y "maximo" del ancho
      weight: elemento.weight.metric.split(" - "),
    };
  });
  // pido en la BBD los perros, excluyendo height y id. incluyendo del modelo Temperament solo la propiedad name.
  const dogs = await Dog.findAll({
    attributes: { exclude: ["height"] },
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  // creo un array con el resultado de todo lo que tiene apiDogs y todo lo que tiene dogs
  const result = [...apiDogs, ...dogs];
  return result;
};

// cuando recibo el nombre por params hago un filter del array de perros creado en la funcion getDogs, filtrando los perros que tengan el name recibido, excluyendo height
const getDogsFilter = async (name, array) => {
  const filterDogs = array.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );
  // busco dog donde el nombre sea igual al nombre recibido por parametro. excluyo la propiedad height
  const dogs = await Dog.findAll({
    where: {
      name,
    },
    attributes: { exclude: ["height"] },
  });
  // retorno un array con todo lo que tiene filterDogs (API externa) y dogs (BDD)
  const result = [...filterDogs, ...dogs];

  return result;
};

const getDogsId = async (id) => {
  if (id.length !== 36) {
    const apiData = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = apiData.data.map((elemento) => {
      return {
        id: elemento.id,
        image: elemento.image.url,
        name: elemento.name,
        temperament: elemento.temperament,
        height: elemento.height.metric.split(" - "),
        weight: elemento.weight.metric.split(" - "),
        life_span: elemento.life_span,
      };
    });
    const dogApi = apiDogs.find((dog) => dog.id == id);
    if (!dogApi) throw new Error("No existe ningun perro con ese id"); // Si no existe en la BDD arrojo un error.
    return dogApi;
  } else if (id.length === 36) {
    // COMPRUEBO SI RECIBDO UN DATO DE TIPO UUID
    // Si el perro no existe en la API, lo busco en mi BDD
    const dog = await Dog.findByPk(id, {
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (!dog) throw new Error("No existe ningun perro con ese id"); // Si no existe en la BDD arrojo un error.
    return dog;
  }
};

const createDog = async (post) => {
  const { temperament } = post;
  const newDog = await Dog.create(post);
  if (temperament) {
    temperament.map(async (temp) => {
      const find = await Temperament.findAll({
        where: { name: temp },
      });

      await newDog.addTemperaments(find);
    });
  }

  return newDog;
};

module.exports = {
  getDogs,
  getDogsFilter,
  getDogsId,
  createDog,
};
