/*

// funciones flechas

let double = n => n*2;
console.log('el doble de 5 es', double(5));

let triple = n => n*3;

let sumar = (a,b) => a+b;
console.log('la suma de 5 y 7 es', sumar(5,7))

let saludo = () => 'hola';
console.log(saludo());

let calcularEdad = (anioNacimiento) => {
    let anioActual = 2026;
    return anioActual - anioNacimiento;
}
console.log('usted tiene:',calcularEdad(2000), 'años');

//callbacks

let aplicacionCallback = (n, operacion) => operacion(n);
console.log('aplicar el triple de 6 es:', aplicacionCallback(6,triple));

let calculadora = (x,y,operacion) => operacion(x,y);

let resta = (a,b) => a-b;
let multiplicacion = (a,b) => a*b;
let division = (a,b) => a/b;

console.log('2-2 es:', calculadora(2,2,resta));



let agregarHTTPS = (url) => 'https://' + url;
let urls = ['www.google.com', 
            'www.unisangil.edu.co', 
            'www.youtube.com'];
let procesar = (unArray, callback) => {
    let resultado = [];
    for (let i = 0; i < unArray.length; i++) {
        resultado.push(callback(unArray[i]));

    }
    return resultado;
}
let urlCompletas = procesar(urls, agregarHTTPS);
console.log(urlCompletas);




let estudiantes = [
    {nombre : 'javier', promedio: 4.5, aprobado: true},
    {nombre : 'paula', promedio: 3.5, aprobado: true},
    {nombre : 'jhon', promedio: 2.5, aprobado: false},
    {nombre : 'juan', promedio: 3.5, aprobado: true},
    {nombre : 'alejandra', promedio: 1.5, aprobado: false}
    
];
let aprobados = estudiantes.filter(estudiantes => estudiantes.aprobado);
let desaprobados = estudiantes.filter(estudiantes => !estudiantes.aprobado);
let buenos = estudiantes.filter(estudiantes => estudiantes.promedio > 3.5);
let excelentes = estudiantes.filter(estudiantes => estudiantes.promedio > 4.3);

console.log('aprobados');
aprobados.forEach(x => console.log(x.nombre+' - '+x.promedio));
console.log('desaprobados');
desaprobados.forEach(x => console.log(x.nombre+' - '+x.promedio));
console.log('buenos');
buenos.forEach(x => console.log(x.nombre+' - '+x.promedio));
console.log('excelentes');
excelentes.forEach(x => console.log(x.nombre+' - '+x.promedio));



let numerosPares=[1,2,3,4,5,6,7,8,9,10,11,12].filter(n=> n%2==0);
console.log(numerosPares);

let numerosImpares=[1,2,3,4,5,6,7,8,9,10,11,12].filter(n=> n%2==1);
console.log(numerosImpares);

let alumnos=[
    {
        nombre: 'ana',
        apellido: 'garcia',
        edad: 20,
        nota: 4.5,
        cursosCompletos: 5,
        fechaRegistro: new Date(2025,8,15)

    },
    {
        nombre: 'javier',
        apellido: 'viviescas',
        edad: 25,
        nota: 4.4,
        cursosCompletos: 8,
        fechaRegistro: new Date(2021,2,2)

    },
    {
        nombre: 'julian',
        apellido: 'gomez',
        edad: 23,
        nota: 3.5,
        cursosCompletos: 15,
        fechaRegistro: new Date(2022,4,2)

    }
    
]

let nombre_completo = (alumnos) => alumnos.nombre+' '+alumnos.apellido;
let esta_aprobado = (alumnos) => alumnos.nota > 3.5;

forEach(x => console.log(x.nombre+' - '+x.apellido));
console.log(esta_aprobado)



let booleano = 1 === 1 ;
console.log(booleano)

let notas = [3,5,10,9,7,8,5];
notas.pop();
console.log(notas);
notas.push(99);
console.log(notas);
notas.shift();
console.log(notas);
notas.unshift(99);
console.log(notas);


let frutaUno = ["banana", "pera", "manzana"];
let frutaDos = ["durazno", "ciruela", "naranja"];

let TodasLasFrutas = [...frutaUno, ...frutaDos];

console.log(TodasLasFrutas);


let auto = {marca: 'Lamborghini', modelo: 'Aventador_svj', kms:0, anio:2026 };

let corredorUno = {
    nombre: 'javier', edad: 28, ...auto
};

let corredorDos = {
    nombre: 'gustavo', edad: 32, ...auto
}

console.log(corredorUno);
console.log(corredorDos);



let notas =  [3,4,6,45,23,12,78,99,45,30,38];
console.log(Math.min(...notas));


let peliculasAccion = ["End Game", "Iron Man", "Capitan America"];
let peliculasComedia = ["Mi Pobre Angelito", "Son Como Niños", "El paseo ...."]

let = peliculas = [peliculasAccion, peliculasComedia];
console.log(peliculas);
let = peliculas2 = [...peliculasAccion, ...peliculasComedia];
console.log(peliculas2);

const fs = require('fs');

try {
  const contenido = fs.readFileSync('hola.txt', 'utf8');
  console.log(contenido);
} catch (err) {
  console.error('Error al leer el archivo:', err);
}

const data = require('./prueba') ;

console.log("hola, mi nombre es "+ data.nombre+ " tengo " + data.edad+ " años y soy "+data.profesion);


const colors = require('colors');

console.log('Este texto se ve en verde'.green);
console.log('Y este texto en rojo'.red);

*/

let funciones = require('./funciondetareas');

const accion = process.argv[2];
const parametro = process.argv[3];
const segundoParametro = process.argv[4];

switch (accion) {
    case 'listar':
        console.log(funciones.leer());
        break;

    case 'crear':
        if (!parametro) {
            console.log('Error por falta de nombre de tarea');
            break;
        }
        console.log(funciones.crear({
            titulo: parametro, 
            estado: 'pendiente'
        }));
        break;

    case 'iniciar':
        if (!parametro) {
            console.log('Debes indicar el título de la tarea a iniciar');
            break;
        }
        console.log(funciones.cambiarEstado(parametro, 'en proceso'));
        break;

    case 'filtrar':
        if (!parametro) {
            console.log('Debes indicar el estado a filtrar');
            break;
        }
        console.log(funciones.filtrarPorEstado(parametro));
        break;

    case 'cambiarEstado':
        if (!parametro || !segundoParametro) {
            console.log('Debes indicar el título de la tarea y el nuevo estado');
            break;
        }
        console.log(funciones.cambiarEstado(parametro, segundoParametro));
        break;

    case 'eliminarPorEstado':
        if (!parametro) {
            console.log('Debes indicar el estado de las tareas a eliminar');
            break;
        }
        console.log(funciones.eliminarPorEstado(parametro));
        break;

    default:
        console.log('Acción no válida. Opciones: listar, crear, iniciar, filtrar, cambiarEstado, eliminarPorEstado');
        break;
}

//npm install express ejs   and npm install -D nodemon     

// falta filtrar estado de la tarea
// eliminar una tarea por el estado
// editar por el estado
// iniciar una tarea, cambiar estado o funcion para cambiar estado 
// mirar que es nodemon 

