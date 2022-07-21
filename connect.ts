// @/connection.ts
import { Sequelize } from "sequelize-typescript";

import { history } from "./models/allhisotry";

import { plushistory  } from "./models/plushistory";

import { subhistory } from "./models/subtracthistory";

import { multiplyhistory } from "./models/mulhistory";

import { divisionhistory } from "./models/divisionhis";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "sequelize",
  logging: false,
  models: [history]
});

const phconnection = new Sequelize ({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "sequelize",
  logging: false,
  models: [plushistory]
})

const subconnection = new Sequelize ({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "sequelize",
  logging: false,
  models: [subhistory]
})

const multiplyconnection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "sequelize",
  logging: false,
  models: [multiplyhistory]
})

const divisionconnection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "sequelize",
  logging: false,
  models: [divisionhistory]
})

connection.sync();
phconnection.sync();
subconnection.sync();
multiplyconnection.sync()
divisionconnection.sync()