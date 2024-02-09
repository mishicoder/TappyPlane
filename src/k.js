import kaboom from 'https://unpkg.com/kaboom@3000.1.17/dist/kaboom.mjs';

const k = kaboom({
    width: 800,
    height: 480,
    canvas: document.querySelector('#game'),
    background: [218, 239, 247]
});

loadRoot('resources/');
setCursor('none');

export default k;