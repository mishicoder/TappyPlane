import k from './src/k.js';
import loadResources from './src/resources.js';
import titleScene from './src/scenes/title.js';
import gameOver from './src/scenes/gameOver.js';

loadResources();
titleScene();
gameOver();
go('title');