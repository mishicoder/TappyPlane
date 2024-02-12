
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
    // Get Ready
    loadSprite('getReady', 'UI/textGetReady.png');

    // ground
    loadSprite('groundDirt', 'groundDirt.png');
}

function loadResources(){
    loadSprites();
}

export default loadResources;