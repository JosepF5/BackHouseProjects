const fs = require("fs");
const optionsMysql = require("./options/mysql.config");
const knex = require("knex");
const databaseMysql = knex(optionsMysql);

class Contenedor {
  async save(objeto, model) {
    if (model) {
      try {
        const productID = await databaseMysql("products").insert(objeto);
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
      return await databaseMysql("products").select('*')
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
