const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?${API_KEY}`
  );

  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      weight_min: e.weight.metric.split("-")[0],
      width_max: e.weight.metric.split("-")[1],
      height_min: e.height.metric.split("-")[0],
      height_max: e.height.metric.split("-")[1],
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament, //indica que modelo de atributo incluyo en esta llamada
      attributes: ["name"], //me trae todo el id de la base de datos
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo(); //toca llamar esta constate para que se pueda ejecutar
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};
router.get("/dogs", async (req, res) => {
  const name = req.query.name; // preguntamos si hay una constante con la propiedad name
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); //si el nombre llega en mayuscaula lo cambiamos a minuscula como est en base de datos
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No se encuentra el Dog");
  } else {
    res.status(200).send(dogsTotal);
  }

  // let temperamentDB = await Temperament.findAll({
  //     where: {name: temperaments } //le pido que busque las que coincidan con el temperament que llega por body
  // });
  //   dogCreate.addTemperament(temperamentDb);
  //   res.status(200).send("Dog creado con Exito");
  // });

  router.get("/temperaments", async (req, res) => {
    const temperamentApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?${API_KEY}`
    );
    let temperaments = temperamentApi.data.map((e) => e.temperament).toString(); //mapiamos temperament de la api
    temperaments = await temperaments.split(","); //separo los string por una coma
    const temperamentSpace = await temperaments.map((e) => e.trim()); // elimino los espacios del comienzo y final
    const temperamentNoRepeat = [...new Set(temperamentSpace)]; //con el constructor set creo un objeto donde guardo los valores

    temperamentNoRepeat.forEach(async (e) => {
      //recorre cada elemento y hace un findOrCreate
      if (e) {
        await Temperament.findOrCreate({
          //es un elemento de sequelize para chequear si un elemento existe en db y sino lo crea
          where: {
            name: e,
          },
        });
      }
    });

    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
  });
});
// router.post("/", async (req, res) => {
//   try {
//     const {
//       name,
//       height_min,
//       height_max,
//       weight_max,
//       weight_min,
//       lifeSpan,
//       createdInDb,
//       temperament,
//     } = req.body;
//     if (!name) return res.status(404).send("The name,is required");
//     const createdDog = await Dog.create({
//       name,
//       height_min,
//       height_max,
//       weight_min,
//       weight_max,

//       lifeSpan,
//       createdInDb,
//       /* temperament, */
//       /* createdInDb, */
//     });

//     await createdDog.setTemperaments(temperament);
//     return res.status(200).send("The dog has been successfully created");
//   } catch (err) {
//     console.log(err);
//     res.status(404).json(err);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { name, height, weight, lifeSpan, createdInDb, temperament } =
      req.body;
    if (!name || !height || !weight)
      return res.status(404).send("The name, height and weight are required");
    const createdDog = await Dog.create({
      name,
      height,
      weight,
      lifeSpan,
      /* temperament, */
      /* createdInDb, */
    });
    await createdDog.setTemperaments(temperament);
    return res.status(200).send("The dog has been successfully created");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
