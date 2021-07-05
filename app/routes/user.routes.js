module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Insere novo user
  router.post("/", user.create);

  // Retorna todos user
  router.get("/", user.findAll);

  // // Remove todos os user baratos
  router.get("/baratos", user.deleteCheap);

  // // Retorna o user dado seu ID
  router.get("/:id", user.findOne);

  // // Atualiza o user dado seu ID
  router.put("/:id", user.update);

  // // Remove um user dado seu id
  router.delete("/:id", user.delete);

  app.use('/api/users', router);
};