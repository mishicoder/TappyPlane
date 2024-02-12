
//? Carga todos los sprites a utilizar en el juego
function loadSprites(){
    loadSprite('background', 'background.png');

    // ground
    loadSprite('gd', 'groundDirt.png');
    loadSprite('gg', 'groundGrass.png');
    loadSprite('gi', 'groundIce.png');
    loadSprite('gs', 'groundSnow.png');

    // picos
    loadSprite('rn', 'rock.png'); // normal
    loadSprite('rnDown', 'rockDown.png'); // normal hacia abajo
    loadSprite('rg', 'rockGrass.png'); // grass
    loadSprite('rgDown', 'rockGrassDown.png'); 
    loadSprite('ri', 'rockIce.png'); // ice
    loadSprite('riDown', 'rockIceDown.png');
    loadSprite('rs', 'rockSnow.png'); // snow
    loadSprite('rsDown', 'rockSnowDown.png');

    // numeros
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for(let i = 0; i < numbers.length; i++){
        loadSprite(`num${numbers[i]}`, `numbers/number${numbers[i]}.png`);
    }

    // carga de planos
    const colors = ['blue', 'green', 'red', 'yellow'];
    for(let i = 0; i < colors.length; i++){
        loadSprite(`${colors[i]}Plane`, `planes/${colors[i]}Plane.png`, {
            x: 0,
            y: 0,
            sliceX: 3,
            anims: {
                idle: {
                    from: 0,
                    to: 0,
                },
                fly: {
                    from: 0,
                    to: 2,
                    loop: true
                }
            }
        });
    }

    // puff
    loadSprite('puff', 'puff.png', {
        x: 0,
        y: 0,
        sliceX: 2,
        anims: {
            fly: {
                from: 0,
                to: 1,
                loop: true
            }
        }
    });

    // cargar letras
    const ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(let i = 0; i < ltrs.length; i++){
        loadSprite(`l${ltrs[i]}`, `letters/letter${ltrs[i]}.png`);
    }

    // UI
    //* Cursores
    loadSprite('cursors', 'UI/cursors.png', {
        x: 0,
        y: 0,
        sliceX: 2,
        anims: {
            idle: {
                from: 0,
                to: 0
            },
            tap: {
                from: 1,
                to: 1
            }
        }
    });
    //* Buttons
    loadSprite('buttonLarge', 'UI/buttonLarge.png');
    loadSprite('buttonSmall', 'UI/buttonSmall.png');

    //* taps
    loadSprite('tapLeft', 'UI/tapLeft.png');
    loadSprite('tapRight', 'UI/tapRight.png');

    // Game Over
    loadSprite('gameOver', 'UI/textGameOver.png');
    // Get Ready Animation
    loadSprite('getReadyShow', 'UI/getReadyShow.png', {
        x: 0,
        y: 0,
        sliceX: 5,
        sliceY: 3,
        anims: {
            show: {
                from: 0, 
                to: 10,
                speed: 32
            },
        }
    });
    loadSprite('getReadyHidden', 'UI/getReadyHidden.png', {
        x: 0,
        y: 0,
        sliceX: 5,
        sliceY: 2,
        anims: {
            show: {
                from: 0, 
                to: 9,
                speed: 32
            },
        }
    });

    // ground
    loadSprite('groundDirt', 'groundDirt.png');
}

function loadResources(){
    loadSprites();
}

export default loadResources;