// const router = require("express");
// const { Dog, Temperament } = require("../db");

// const getApi = async () => {
//   const info = await axios.get("https://api.thedogapi.com/v1/breeds");
//   const infoApi = await info.data.map((e) => {
//     return {
//       id: e.id,
//       name: e.name,
//       weight_min: e.weight.metric.split("-")[0],
//       width_max: e.weight.metric.split("-")[1],
//       heightMin: e.height.metric.split("-")[0],
//       heightMax: e.height.metric.split("-")[1],
//       life_span: e.life_span,
//       temperament: e.temperament,
//       image: e.image.url,
//     };
//   });
//   return infoApi;
// };
// const getDb = async () => {
//   const infoDb = await Dog.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   return infoDb;
// };

// const getAll = async () => {
//   const apiDogs = await getApi();
//   const dbDogs = await getDb();
//   const allDogs = apiDogs.concat(dbDogs);
//   return allDogs;
// };

// router.get("/", async (req, res) => {
//   const allDog = await getAll();
//   const { name } = req.query.name;
//   if (name) {
//     let dogName = await allDog.filter((e) =>
//       e.name.toLowerCase().includes(name.toLocaleLowerCase())
//     );
//     dogName
//       ? res.status(200).send(dogName)
//       : res.status(404).send("Name not Found");
//   } else {
//     res.status(200).send(allDog);
//   }
// });
