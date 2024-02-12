import button from '../objects/button.js';

function titleScene(){

    //! Se crea la escena con nombre 'title'
    scene('title', () => {

        //* Cadena de texto del titulo de la escena
        const titleChars = 'TAPPY PLANE';

        //* ---------------------------------------------------------------------------------------------
		//todo FONDO CON EFECTO PARALLAX
		//* ---------------------------------------------------------------------------------------------
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
        
        //* ---------------------------------------------------------------------------------------------
		//todo TITULO DEL JUEGO
		//* ---------------------------------------------------------------------------------------------
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

        //* ---------------------------------------------------------------------------------------------
		//todo AVIONETA QUE VIAJA EN EL EJE X DE LA PANTALLA
		//* ---------------------------------------------------------------------------------------------

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

        //* ---------------------------------------------------------------------------------------------
		//todo BOTONES
		//* ---------------------------------------------------------------------------------------------
        const btn = button({
            btnText: 'Play',
            onClickEvent: () => {
                go('colorSelector', {
                    cursor: cursors,
                });
            }
        });
        btn.pos.x = (width()/2) - (196/2);
        btn.pos.y = 195;  

        const btnExtir = button({
            btnText: 'Exit',
            onClickEvent: () => {
                quit();
                window.close();
            }
        });
        btnExtir.pos.x = (width()/2) - (196/2);
        btnExtir.pos.y = 295;

         //* ---------------------------------------------------------------------------------------------
		//todo CURSOR
		//* ---------------------------------------------------------------------------------------------
        const cursors = add([
            sprite('cursors', {
                anim: 'idle'
            }),
            pos(),
            fixed(),
            anchor('center'),
            z(100),
        ]);
        if(isTouchscreen()){ cursors.hidden = true; }

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
