
function titleScene(){

    //! Se crea la escena con nombre 'title'
    scene('title', () => {

        //* Cadena de texto del titulo de la escena
        const titleChars = 'TAPPY PLANE';

        //? Dibujado del fondo con efecto paralax (revisar el archivo 'gameplay.js' para mas informacion)
        //? Variables para le movimiento
        let bgx1 = 0;
        let bgx2 = 800;

        //? Usamos la funcion de dibujado de Kaboom para dibujar nuestro fondo
        onDraw(() => {

            //* Dibujamos el primer cuadro
            drawSprite({
                sprite: 'background',
                width: 800,
                height: 480,
                pos: vec2(bgx1, 0),
            });

            //* Dibujamos el segundo cuadro
            drawSprite({
                sprite: 'background',
                width: 800,
                height: 480,
                pos: vec2(bgx2, 0)
            });

        });

        //? Usamos la funcion 'onUpdate' para actualizar la posicion de los fondos
        onUpdate(() => {
            bgx1 -= 2;
            bgx2 -= 2;

            if(bgx1 <= -800) bgx1 = 800;
            if(bgx2 <= -800) bgx2 = 800;
        });
        
        // 61 x 64 -> letter size
        //? Funcion de kaboom que nos permite dibujar elementos
        onDraw(() => {

            let x = width()/2 - 187.5;
            for(let i = 0; i < titleChars.length; i++){
                if(titleChars[i] !== ' '){
                    drawSprite({
                        sprite: `l${titleChars[i]}`,
                        width: 30.5,
                        height: 32,
                        pos: vec2(x, 20)
                    });
                    x += 30.5 + 5;
                }else{
                    x += 30;
                }
            }
        });

        const titlePlane = add([
            sprite('redPlane', {
                anim: 'fly'
            }),
            fixed(),
            pos(),
        ]);

        titlePlane.pos = vec2(
            -94,
            80
        );

        const playButton = add([
            sprite('buttonLarge'),
            fixed(),
            pos(),
            anchor('top'),
            area(),
        ]);
        playButton.pos.x = (width()/2) - (playButton.quad.w/2);
        playButton.pos.y = 180;
        playButton.onClick(() => {
            go('gameplay', {
                cursor: cursors
            });
        });
        const playStr = 'PLAY';
        onDraw(() => {
            let px = 330;
            for(let i = 0; i < playStr.length; i++){
                drawSprite({
                    sprite: `l${playStr[i]}`,
                    width: 30.5,
                    height: 32,
                    pos: vec2(px, 195)
                });
                px += 30 + 5;
            }
        });

        const exitButton = add([
            sprite('buttonLarge'),
            fixed(),
            pos(),
            anchor('top'),
            area(),
        ]);
        exitButton.pos.x = (width()/2) - (exitButton.quad.w/2);
        exitButton.pos.y = 280;
        exitButton.onClick(() => {
            quit();
            window.close();
        });
        const exitStr = 'EXIT';
        onDraw(() => {
            let ex = 340;
            for(let i = 0; i < exitStr.length; i++){
                if(exitStr[i] === 'I'){
                    drawSprite({
                        sprite: `l${exitStr[i]}`,
                        width: 15.25,
                        height: 32,
                        pos: vec2(ex, 295)
                    });
                    ex += 15.25 + 5
                }else{
                    drawSprite({
                        sprite: `l${exitStr[i]}`,
                        width: 30.5,
                        height: 32,
                        pos: vec2(ex, 295)
                    });
                    ex += 30 + 5;
                }
                
            }
        });

        const cursors = add([
            sprite('cursors', {
                anim: 'idle'
            }),
            pos(),
            fixed(),
            anchor('center'),
            'cursor'
        ]);

        onMousePress('left', () => {
            cursors.play('tap');
        });

        cursors.onAnimEnd((anim) => {
            if(anim === 'tap') cursors.play('idle');
        });

        onUpdate(() => {
            titlePlane.move(240, 0);

            if(titlePlane.pos.x > width()){
                titlePlane.pos.x = -94;
            }

            cursors.pos = mousePos();
        });

        

    });

    
}

export default titleScene;
