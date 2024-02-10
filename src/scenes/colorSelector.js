
function colorSelector(){

    scene('colorSelector', (options = {
        cursor,
    }) => {

        //* ---------------------------------------------------------------------------------------------
		//todo VARIABLES Y CONSTANTES DE CONTROL
		//* ---------------------------------------------------------------------------------------------
        const title = 'CHOOSE A COLOR';
        const colors = ['red', 'green', 'yellow', 'blue'];
        const planeX = ((width()/2) - 44);
        const planeSpeed = 10;
        const buttonSpace = 95;
        let currentColor = 0;

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
		//todo AGREGAR OBJETOS
		//* ---------------------------------------------------------------------------------------------
        // 88 x 73
        const redPlane = add([
            sprite('redPlane', {
                anim: 'fly'
            }),
            pos(-88, (height()/2) - 36.5),
            {
                show: true
            },
            'plane',
            'red',
        ]);

        const greenPlane = add([
            sprite('greenPlane', {
                anim: 'fly'
            }),
            pos(-88, (height()/2) - 36.5),
            {
                show: false
            },
            'plane',
            'green',
        ]);

        const yellowPlane = add([
            sprite('yellowPlane', {
                anim: 'fly'
            }),
            pos(-88, (height()/2) - 36.5),
            {
                show: false
            },
            'plane',
            'yellow',
        ]);

        const bluePlane = add([
            sprite('bluePlane', {
                anim: 'fly'
            }),
            pos(-88, (height()/2) - 36.5),
            {
                show: false
            },
            'plane',
            'blue',
        ]);

        //* ---------------------------------------------------------------------------------------------
		//todo FUNCIONES DE CONTROL
		//* ---------------------------------------------------------------------------------------------
        const allPlanes = get('plane');

        onUpdate(() => {

            for(let i = 0; i < allPlanes.length; i++){
                if(allPlanes[i].show){
                    if(allPlanes[i].pos.x < planeX){
                        allPlanes[i].pos.x += planeSpeed;
                    }
                    if(allPlanes[i] > planeX) allPlanes[i].pos.x = planeX;
                }else{
                    if(allPlanes[i].pos.x >= planeX && allPlanes[i].pos.x <= width() + 88) allPlanes[i].pos.x += planeSpeed;
                    else allPlanes[i].pos.x = -88;
                }
            }

        });

        //* ---------------------------------------------------------------------------------------------
		//todo Botones
		//* ---------------------------------------------------------------------------------------------
        // 85 x 42
        const leftBtn = add([
            sprite('tapLeft'),
            pos(buttonSpace, (height()/2) - 21),
            area(),
        ]);
        leftBtn.onClick(() => {
            for(let i = 0; i < allPlanes.length; i++){
                allPlanes[i].show = false;
            }
            currentColor--;
            if(currentColor < 0) currentColor = (colors.length - 1);

            switch (currentColor) {
                case 0: //? Red
                    redPlane.show = true;
                    break;
                case 1: //? Green
                    greenPlane.show = true;
                    break;
                case 2: //? Yellow
                    yellowPlane.show = true;
                    break;
                case 3: //? Blue
                    bluePlane.show = true;
                    break;
                default:
                    break;
            }
        });

        const rightBtn = add([
            sprite('tapRight'),
            pos(width() - (85 + buttonSpace), (height()/2) - 21),
            area(),
        ]);
        rightBtn.onClick(() => {
            for(let i = 0; i < allPlanes.length; i++){
                allPlanes[i].show = false;
            }
            currentColor++;
            if(currentColor >= colors.length) currentColor = 0;

            switch (currentColor) {
                case 0: //? Red
                    redPlane.show = true;
                    break;
                case 1: //? Green
                    greenPlane.show = true;
                    break;
                case 2: //? Yellow
                    yellowPlane.show = true;
                    break;
                case 3: //? Blue
                    bluePlane.show = true;
                    break;
                default:
                    break;
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
			if(anim === 'tap') c.play('idle');

		});

    });

}

export default colorSelector;