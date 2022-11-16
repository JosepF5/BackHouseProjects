const dbFirebase = require("../../config/dbFirebase.js");

const { getFirestore, doc, getDoc } = require("firebase-admin/firestore");

const database = getFirestore();

class productoDAO {

    ID_FIELD = "_id";
    
    static async exists(id) {
        try {
            return await database.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return database.collection('productos').get();
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
     getProductById(id) {
        try {
			const data = database.doc(`/api/productos/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
    }
    
    async createProduct(object) {
        try {
            return await database.create(object)
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async updateProductById(id, object) {
        try {
            await database.findByIdAndUpdate(
                {
                    [this.ID_FIELD] : id
                },
                object, 
                {
                    runValidators: true
                })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async deleteProductById(id) {
        try {
            return await database.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}

module.exports = productoDAO;
