const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const {
  getDogs,
  getDogsFilter,
  getDogsId,
  createDog,
} = require("../controllers/dogs");
const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const apiDogs = await getDogs();
    if (!name) {
      // si no recibo el nombre por query, retorno todos los perros existentes
      const result = await getDogs();
      return res.status(200).send(result);
    } else {
      // si recibo query, llamo al controller getDogsFilter que retorna una array de perros con ese nombre
      const result = await getDogsFilter(name, apiDogs);
      if (!result.length) throw new Error("Ningun perro con ese nombre"); // si el array esta vacio arrojo un error porque no hay perros con ese nombre
      return res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

dogsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await getDogsId(id);
    res.status(200).send(dog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    let {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span,
      image,
      temperament,
      createInDb,
    } = req.body;
    if (!name || !min_height || !max_height || !min_weight || !max_weight)
      return res.status(404).send("Faltan datos obligatorios");
    if (!life_span) life_span = "undefined";
    const dogCreate = await createDog({
      name,
      height: [min_height, max_height],
      weight: [min_weight, max_weight],
      life_span,
      image,
      temperament,
      createInDb,
    });

    return res.status(201).send(dogCreate);
  } catch (error) {
     return res.status(404).send(error.message);
  }
});

module.exports = dogsRouter;
