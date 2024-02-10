
function loadSprites(){
    loadSprite('background', 'background.png');
    loadSprite('groundDirt', 'groundDirt.png');
    loadSprite('groundGrass', 'groundGrass.png');
    loadSprite('groundIce', 'groundIce.png');

    // picos
    loadSprite('rock', 'rock.png');
    loadSprite('rockDown', 'rockDown.png');

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
            click: {
                from: 1,
                to: 1
            }
        }
    });
    //* Buttons
    loadSprite('buttonLarge', 'UI/buttonLarge.png');
    loadSprite('buttonSmall', 'UI/buttonSmall.png');
}

function loadResources(){
    loadSprites();
}

export default loadResources;