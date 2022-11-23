const mongoose = require("mongoose");
const mongoLocal="mongodb://localhost:27017/ecommerce";
const mongoAtlas="mongodb+srv://JosepF5:123qwe123@maincluster.mb2hw.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoLocal, (res) => {
    res
    ? console.log("Sin conexión a MongoDB")
    : console.log("Conexión exitosa a MongoDB");
});

module.exports = mongoose;
