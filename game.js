//! Importamos el objeto k para poder hacer uso de las funciones de Kaboom
//? Solo es necesario importarlo en este archivo
import k from './src/k.js';

//* Importamos nuestras funciones para el juego
import loadResources from './src/resources.js'; //? funcion de carga de recursos
import titleScene from './src/scenes/title.js'; //? funcion de carga de la escena 'title'
import gameOver from './src/scenes/gameOver.js'; //? funcion de carga de la escena 'gameOver'
import gameplay from './src/scenes/gameplay.js'; //? funcion de carga de la escena 'gamplay'
import colorSelector from './src/scenes/colorSelector.js'; //? funcion de carga de la escena 'colorSelector'

//! Se ejecutan las funciones para poder agregar todo lo programado, al entorno de Kaboom
loadResources();
titleScene();
gameplay();
gameOver();
colorSelector();

export default function loadGame(){
    //* Carga la escena 'title'
    go('title');
}

