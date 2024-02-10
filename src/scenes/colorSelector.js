
function colorSelector(){

    scene('colorSelector', (options = {
        cursor,
    }) => {

        //* ---------------------------------------------------------------------------------------------
		//todo VARIABLES Y CONSTANTES DE CONTROL
		//* ---------------------------------------------------------------------------------------------
        const title = 'CHOOSE A COLOR';

        //* ---------------------------------------------------------------------------------------------
		//todo DIBUJADO DEL FONDO
		//* ---------------------------------------------------------------------------------------------
        let bgx1 = 0;
        let bgx2 = 800;

        onUpdate(() => {

            bgx1 -= 2;
            bgx2 -= 2;

            if(bgx1 <= -800) bgx1 = 800;
            if(bgx2 <= -800) bgx2 = 800;

        });

        onDraw(() => {
            drawSprite({
                sprite: 'background',
                width: 800,
                height: 480,
                pos: vec2(bgx1, 0),
            });
            drawSprite({
                sprite: 'background',
                width: 800,
                height: 480,
                pos: vec2(bgx2, 0),
            });
        });

        //* ---------------------------------------------------------------------------------------------
		//todo DIBUJADO DEL TITULO
		//* ---------------------------------------------------------------------------------------------
        onDraw(() => {

            // 61 x 64
            // (width() / 2) - (((12 * 30.5) + (9 * 3.5) + 40) / 2)
            let x = (width() / 2) - (((12 * 30.5) + (9 * 3.5) + 40) / 2);
            for(let i = 0; i < title.length; i++){
                if(title[i] !== ' '){
                    drawSprite({
                        sprite: `l${title[i]}`,
                        pos: vec2(x, 20),
                        width: 30.5,
                        height: 32,
                    });
                    x += 34;
                }else x += 20;
            }

        });

        //* ---------------------------------------------------------------------------------------------
		//todo CURSOR
		//* ---------------------------------------------------------------------------------------------
        const c = add(options.cursor);
        onUpdate(() => {
			c.pos = mousePos();
		});
        onMousePress('left', () => {
			c.play('tap');
		});

		c.onAnimEnd((anim) => {
			if(anim === 'tap'){
				c.play('idle');
			}
		});

    });

}

export default colorSelector;