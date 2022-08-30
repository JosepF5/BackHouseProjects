const fs=require('fs');


class Contenedor{
    
    async save(objeto){
        let txt=await fs.promises.readFile('./productos.txt')
        let arreglo=JSON.parse(txt)
        arreglo.push(Object.assign(objeto,{id:arreglo.length+1}))
        await fs.promises.writeFile('./productos.txt',JSON.stringify(arreglo,null,'\t')) 
        return `Producto ${objeto.nombre} agregado`
    } 
    async getById(id){
        let txt=await fs.promises.readFile('./productos.txt')
        let arreglo=JSON.parse(txt)
        let prod=arreglo.find(el => el.id===id)
        return prod?prod:"Producto no encontrado."
    }
    async getAll(){
        let txt=await fs.promises.readFile('./productos.txt')
        let arreglo=JSON.parse(txt)
        return arreglo.length!==0?arreglo.map(el => el):"No hay productos."
    }
    async deleteById(id){
        let txt=await fs.promises.readFile('./productos.txt')
        let arreglo=JSON.parse(txt)
        let index = arreglo.findIndex(data => data.id === id)
        if(index===id-1){
            arreglo.splice(index, 1)
            await fs.promises.writeFile('./productos.txt',JSON.stringify(arreglo,null,'\t'))
            return "Producto eliminado"
        }
        return "No se encontro el producto."
    }
    async deleteAll(){
        await fs.promises.writeFile('./productos.txt',"[]")
        return "Productos eliminados."
    } 
}
//Creacion de objeto Contenedor
nuevo= new Contenedor()
//Metodo Save()
//->nuevo.save({nombre:"Book",price:234,thumbnail:"https://cdn2.iconfinder.com/data/icons/school-supplies-7/64/164_school-open-study-education-book-library-512.png"}).then(res=>console.log(res))
//Metodo getById(number)
//->nuevo.getById(3).then(res=>console.log(res))
//Metodo getAll()
//->nuevo.getAll().then(res=>console.log(res))
//Metodo deleteById()
//->nuevo.deleteById(3).then(res=>console.log(res))
//Metodo deleteAll()
//->nuevo.deleteAll().then(res=>console.log(res))