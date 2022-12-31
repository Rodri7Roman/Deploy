const { Router } = require("express");
const { Temperament } = require("../db");
const temperamentsRouter = Router();


temperamentsRouter.get("/", async (req, res) => {
  try {
    const temperaments = await Temperament.findAll()
    res.status(200).send(temperaments)
  } catch (error) {
    res.status(400).send(error.message)
  }
});

module.exports = temperamentsRouter;
