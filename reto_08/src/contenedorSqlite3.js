const fs = require("fs");
const optionsSqlite3 = require("./options/sqlite3.config");
const knex = require("knex");
const databaseSqlite3 = knex(optionsSqlite3);

class Contenedor {
  async save(objeto, model) {
    if (model) {
      try {
        const productID = await databaseSqlite3("chats").insert(objeto);
        return productID;
      } catch (error) {
        console.log(error);
      }
    }
    return model;
  }
  async getById(id) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const prod = arreglo.find((el) => el.id === Number(id));
    return prod ? prod : false;
  }
  async updateById(id, pro) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const index = arreglo.findIndex((el) => el.id === Number(id));
    if (typeof index) {
      arreglo[index] = { ...arreglo[index], ...pro };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return true;
    }
    return false;
  }
  async getAll() {
    try {
      return await databaseSqlite3("chats").select('*')
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const index = arreglo.findIndex((data) => data.id === id);
    if (index === id - 1) {
      arreglo.splice(index, 1);
      for (const x of Array(arreglo.length).keys()) {
        arreglo[x].id = x + 1;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return true;
    }
    return false;
  }
  async deleteAll() {
    await fs.promises.writeFile(this.path, "[]");
    return "Productos eliminados.";
  }
}

module.exports = Contenedor;
