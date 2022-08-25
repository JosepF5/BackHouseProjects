

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]
let precioT=0
let minProd=0
let maxProduct=0
productos.forEach(p => {
    precioT+=p.precio
});

productos.forEach(p => {
    if(p<=minProd){
        minProd=p
    }
});

productos.forEach(p => {
    if(p>=maxProduct){
        maxProduct=p
    }
});

console.log("Precio total: ",precioT)

console.log("Precio promedio: ",precioT/productos.length)

