const { Tag, Module, User } = require("../db");
const { Op } = require("sequelize");
const fs = require("fs");

async function preLoad() {
  try {
    const allTags = [
      "JavaScript",
      "CSS",
      "AJAX",
      "DOM",
      "Webpack",
      "React",
      "Redux",
      "NodeJS",
      "Express",
      "Testing",
      "SQL",
      "Sequelize",
      "Estructura de Datos",
      "Algoritmo",
      "Closures",
      "Contexto de Ejecucion",
      "Recursividad",
      "Linked List",
      "Arboles",
      "Big O Notation",
      "Sort",
      "Document",
      "Event Listeners",
      "Preprocesadores CSS",
      "ECMAScript6",
      "Bundlers",
      "HTML",
      "Componentes",
      "Estados",
      "Life Cycles",
      "Estilos React",
      "Routing-React",
      "Forms",
      "Hooks",
      "Reducer",
      "Actions Creators",
      "Store",
      "V8",
      "CommonJS",
      "npm",
      "Promesas",
      "Web Server",
      "JSON",
      "API",
      "Routes-Express",
      "Middleware",
      "HTTP",
      "Postman",
      "CORS",
      "Generator Functions",
      "Async/Await",
      "DBMS",
      "Base de Datos",
      "ORM",
      "Modelos",
      "CRUD",
      "Autenticacion",
    ];
    const promisesTags = allTags.map((elem) => Tag.create({ name: elem }));
    await Promise.all(promisesTags);

    const allModules = ["M1", "M2", "M3", "M4"];
    const promisesModules = allModules.map((elem) =>
      Module.create({ name: elem })
    );
    await Promise.all(promisesModules);

    relationsModulesTags();
  } catch (error) {
    console.log("La base de datos ya esta cargada!!");
  }
}

async function relationsModulesTags() {
  const moduleOne = await Module.findAll({ where: { name: "M1" } });
  const moduleTwo = await Module.findAll({ where: { name: "M2" } });
  const moduleThree = await Module.findAll({ where: { name: "M3" } });
  const moduleFour = await Module.findAll({ where: { name: "M4" } });

  const tagsM1 = await Tag.findAll({
    where: {
      [Op.or]: [
        { name: "JavaScript" },
        { name: "Estructura de Datos" },
        { name: "Algoritmo" },
        { name: "Closures" },
        { name: "Contexto de Ejecucion" },
        { name: "Recursividad" },
        { name: "Linked List" },
        { name: "Arboles" },
        { name: "Big O Notation" },
        { name: "Sort" },
      ],
    },
  });
  const tagsM2 = await Tag.findAll({
    where: {
      [Op.or]: [
        { name: "AJAX" },
        { name: "Webpack" },
        { name: "CSS" },
        { name: "DOM" },
        { name: "React" },
        { name: "Redux" },
        { name: "Document" },
        { name: "Event Listeners" },
        { name: "Preprocesadores CSS" },
        { name: "ECMAScript6" },
        { name: "Bundlers" },
        { name: "HTML" },
        { name: "Componentes" },
        { name: "Estados" },
        { name: "Life Cycles" },
        { name: "Estilos React" },
        { name: "Routing-React" },
        { name: "Forms" },
        { name: "Hooks" },
        { name: "Reducer" },
        { name: "Actions Creators" },
        { name: "Store" },
      ],
    },
  });
  const tagsM3 = await Tag.findAll({
    where: {
      [Op.or]: [
        { name: "NodeJS" },
        { name: "Express" },
        { name: "Testing" },
        { name: "V8" },
        { name: "CommonJS" },
        { name: "npm" },
        { name: "Promesas" },
        { name: "Web Server" },
        { name: "JSON" },
        { name: "API" },
        { name: "Routes-Express" },
        { name: "Middleware" },
        { name: "HTTP" },
        { name: "Postman" },
        { name: "CORS" },
        { name: "Generator Functions" },
        { name: "Async/Await" },
      ],
    },
  });
  const tagsM4 = await Tag.findAll({
    where: {
      [Op.or]: [
        { name: "SQL" },
        { name: "Sequelize" },
        { name: "PostgreSQL" },
        { name: "DBMS" },
        { name: "Base de Datos" },
        { name: "Modelos" },
        { name: "CRUD" },
        { name: "Autenticacion" },
        { name: "ORM" },
      ],
    },
  });

  moduleOne[0].addTag(tagsM1);
  moduleTwo[0].addTag(tagsM2);
  moduleThree[0].addTag(tagsM3);
  moduleFour[0].addTag(tagsM4);
}

const bulkCreateUsers = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/users.json", "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
      let arrayName = data[i].name.split(" ");
      const firstName = arrayName.shift();
      const lastName = arrayName.join(" ");

      const [admins, boolean] = await User.findOrCreate({
        where: { email: data[i].email },
        defaults: {
          nick: data[i].nickname,
          first_name: firstName,
          last_name: lastName,
          email: data[i].email,
          image: data[i].picture,
          isAdmin: true,
        },
      });
    }
  } catch (error) {
    console.log({ errorMsg: error.message });
  }
};

module.exports = {
  preLoad,
  bulkCreateUsers,
};
