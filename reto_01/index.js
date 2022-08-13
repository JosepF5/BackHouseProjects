class User{
    constructor(nombre,apellido,libros,mascotas){
        this.name = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.name} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre,autor){
        this.libros.push({nombre:nombre,autor:autor});
    }
    getBookNames(){
        return this.libros.map((libro)=>libro.nombre);
    }

}

const user = new User("Juan","Perez",[{nombre:"El principito",autor:"Antoine de Saint-Exupéry"}],["Perro","Gato"]);
console.log(user.getFullName());
user.addMascota("Pez");
console.log(user.countMascotas());
user.addBook("El señor de los anillos","J.R.R. Tolkien");
console.log(user.getBookNames());
