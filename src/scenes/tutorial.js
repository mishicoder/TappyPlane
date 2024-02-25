import button from "../objects/button.js";

function tutorial(){

    scene('tutorial', (options = {
        cursor,
    }) => {

        //* Dibujado del titulo de la ventana

        let isReady = false;

        const spriteID = isTouchscreen() ? 'mobile_tutorial' : 'pc_tutorial';
        const textToShow = isTouchscreen() ? 'Toque la pantalla para elevar la avioneta' : 'Click en la pantalla para elevar la avioneta';
        const rockTutoMessage = 'Evite chocar contra las rocas'
        const starTutoMessage = 'Recolecte la mayor cantidad de estrellas'

        let clickTutoOk = false;
        let rockTutoOk = false;
        let starsTutoOk = false;

        const c = add(options.cursor);
        onUpdate(() => {
            c.pos = mousePos();
        });

        let bgx1 = 0; //? Posicion en x del primer sprite de fondo
		let bgx2 = 800; //? Posicion en x del segundo sprite de fondo

		onUpdate(() => {
			//* Actualizamos la posicion del fondo siemnpre y cuando el juego no este pausado
			bgx1 -= 2;
			bgx2 -= 2;

			//* Reposicionamos los sprites de fondo cuando salen de la pantalla
			if(bgx1 <= -800){
				bgx1 = 800;
			}
			if(bgx2 <= -800){
				bgx2 = 800;
			}
		});

		onDraw(() => {
			//* Se dibujan los sprites de fondo, uno siempre sigue al otro para crear el efecto de parallax
			//! primer dibujado
			drawSprite({
				sprite: 'background',
				width: 800,
				height: 480,
				pos: vec2(bgx1, 0),
			});

			//! segundo dibujado
			drawSprite({
				sprite: 'background',
				width: 800,
				height: 480,
				pos: vec2(bgx2, 0),
			});
		});

        add([
            rect(width(), height()),
            pos(0, 0),
            color(45, 45, 45),
            opacity(0.38),   
        ]);

        const title = add([
            text('TUTORIAL', {
                font: 'kfuture',
                size: 42
            }),
            color(0,0,0),
            pos(),
        ]);
        title.pos.x = (width()/2) - (title.width/2);


        //todo GUIAS
        let currentGuide = 0;
        let moveGuide = false;
        //! 0 -> se muestra la forma de control de la avioneta
        //! 1 -> se indica que debe evitar chocar con las rocas
        //! 2 -> inidica que debe recolectar las estrellas para ganar puntos

        const guide = add([
            sprite(spriteID, {
                anim: 'idle'
            }),
            pos(-189),
        ]);
        const guideMaxX = (width()/2) - (189/2);
        guide.pos.y = isTouchscreen() ? (height()/2) - (137/2) : (height()/2) - (152/2);

        const rockGuide = add([
            sprite('rocksTuto', { anim: 'idle', }),
            pos(-117),
        ]);
        const rocksTutoMaxX = ((width()/2) - (117/2)) - 45;
        rockGuide.pos.y = ((height()/2) - (216/2)) - 55;

        const starsGuide = add([
            sprite('starsTuto', { anim: 'idle', }),
            pos(-165, 0),
        ]);
        const starsTutoMaxX = ((width()/2) - (165/2)) - 30;
        starsGuide.pos.y = ((height()/2) - (240/2) - 74);

        onUpdate(() => {
            //todo Mostrar
            if(currentGuide === 0){
                if(guide.pos.x < guideMaxX) guide.pos.x += 20;
                if(guide.pos.x > guideMaxX) { guide.pos.x = guideMaxX; clickTutoOk = true; }

                guideTextA.text = textToShow;
                guideTextA.pos.x = (width()/2) - (guideTextA.width/2);
            }
            if(currentGuide === 1){
                if(rockGuide.pos.x < rocksTutoMaxX) rockGuide.pos.x += 20;
                if(rockGuide.pos.x > rocksTutoMaxX) { rockGuide.pos.x = rocksTutoMaxX; rockTutoOk = true; }
                
                guideTextA.text = rockTutoMessage;
                guideTextA.pos.x = (width()/2) - (guideTextA.width/2);
            }
            if(currentGuide === 2){
                if(starsGuide.pos.x < starsTutoMaxX) starsGuide.pos.x += 20;
                if(starsGuide.pos.x > starsTutoMaxX) { starsGuide.pos.x = starsTutoMaxX; starsTutoOk = true; }

                guideTextA.text = starTutoMessage;
                guideTextA.pos.x = (width()/2) - (guideTextA.width/2);
            }

            //todo Ocultar
            if(currentGuide !== 0){
                clickTutoOk = false; 
                if(guide.pos.x >= guideMaxX && guide.pos.x < width()){
                    guide.pos.x += 20;
                }
                if(guide.pos.x >= width()) { guide.pos.x = -189; }
            }
            if(currentGuide !== 1){
                rockTutoOk = false;
                if(rockGuide.pos.x >= rocksTutoMaxX && rockGuide.pos.x < width()){
                    rockGuide.pos.x += 20;
                }
                if(rockGuide.pos.x >= width()) { rockGuide.pos.x = -117; }
            }
            if(currentGuide !== 2){
                starsTutoOk = false; 
                if(starsGuide.pos.x >= starsTutoMaxX && starsGuide.pos.x < width()){
                    starsGuide.pos.x += 20;
                }
                if(starsGuide.pos.x >= width()) { starsGuide.pos.x = -165; }
            }

            //todo Boton
            if(isReady){
                continueBtn.pos.y -= 10;
                if(continueBtn.pos.y <= btnMaxY){
                    continueBtn.pos.y = btnMaxY;
                }
            }
        });

        const guideTextA = add([
            text(textToShow, {
                font: 'kfuture',
                size: 22
            }),
            color(0, 0, 0),
            pos(0, 0),
        ]);
        guideTextA.pos.x = (width()/2) - (guideTextA.width/2);
        guideTextA.pos.y = height() - (guideTextA.height + 160);

        const continueBtn = button({
            btnText: 'continue',
            btnTextSize: 19,
            onClickEvent: () => {
                go('colorSelector', {
                    cursor: c,
                })
            }
        });
        continueBtn.pos.x = (width()/2) - (196/2);
        const btnMaxY = height() - 90;
        continueBtn.pos.y = height();

        const circleRed = add([
            sprite('circleRed', { anim: 'idle' }),
            pos(),
        ]);
        circleRed.pos.x = width() - 70;
        circleRed.pos.y = height() - 70;

        circleRed.onAnimEnd((anim) => {
            if(anim == 'idle'){
                currentGuide++;
                if(currentGuide >= 3) {
                    currentGuide = 0
                    if(!isReady) isReady = true;
                };
                circleRed.play('idle');
            }
        });

        onClick(() => {
            if(clickTutoOk || rockTutoOk || starsTutoOk){
                currentGuide++;
                if(currentGuide >= 3) {
                    currentGuide = 0
                    if(!isReady) isReady = true;
                };
                circleRed.play('idle');
            }
        });

    }); // fin de la escena
}

export default tutorial;
