const dbFirebase = require("../../config/dbFirebase.js");

const { getFirestore, doc, getDoc } = require("firebase-admin/firestore");

const database = getFirestore();

class carritoDAO {
  async createCart() {
    return await database.collection("carritos").add({
      products: [],
      timestamp: Date.now(),
    });
  }

  async deleteCartById(id) {
    try {
      return await carritoSchema.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveProductToCart(id, obj) {
    try {
      const cart = await carritoSchema.findById(id);
      cart.products.push(obj.productId);
      cart.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const cart = await carritoSchema.findById(id);
      cart.products.remove(productId);
      cart.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getAllCarts() {
    try {
      const snapshot = await database.collection("carritos").get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllProductsFromCart(id) {
    try {
      const snapshot = await database.getAll;
      return await carritoSchema
        .findById(id)
        .populate("products")
        .select({ products: 1, _id: 0 });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = carritoDAO;
