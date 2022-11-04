const productoSchema = require("../modules/productos.modules.js");

class productoDAO {

    ID_FIELD = "_id";
    
    static async exists(id) {
        try {
            return await productoSchema.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await productoSchema.find();
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async getProductById(id) {
        try {
            const product = await productoSchema.findOne({
                [this.ID_FIELD] : id
            })
            console.log(product);
            return product;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async createProduct(object) {
        try {
            return await productoSchema.create(object)
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async updateProductById(id, object) {
        try {
            await productoSchema.findByIdAndUpdate(
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
            return await productoSchema.findByIdAndDelete({[this.ID_FIELD]: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}

module.exports = productoDAO;
