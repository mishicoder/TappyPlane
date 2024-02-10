import createRock from "../objects/rock.js";

function gameplay(){

	scene('gameplay', (options = {
		cursor
	}) => {

		const rockSpeed = 200;
		let pause = false;

		setGravity(200);

		const stateController = add([
			state('play', ['play', 'pause']),
		]);

		onKeyPress('escape', () => {
			pause = !pause;

			if(pause) setGravity(0);
			else setGravity(200);

			if(pause) stateController.enterState('pause');
			else stateController.enterState('play');
		});
		
		//todo segunda forma de crear un fondo que se mueve
		/**
		 ** para ello se necesita dibujar dos veces el fondo
		 ** tenemos una variable para control de posicion en el eje x para cada fondo
		 *todo A diferencia del uso de tiled en el sprite, este efecto de parallax consume menos recursos
		 *todo debido a que no esta dibujando pixeles innecesarios fuera de pantalla.
		*/

		let bgx1 = 0; 
		let bgx2 = 800;

		onUpdate(() => {
			if(!pause) bgx1 -= 2;
			if(!pause)bgx2 -= 2;

			if(bgx1 <= -800){
				bgx1 = 800;
			}
			if(bgx2 <= -800){
				bgx2 = 800;
			}
		});

		onDraw(() => {

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
		
		//setCursor('pointer');

		const rockTimer = add([
			timer(),
		]);

		// rockTimer.loop('1.8', () => {
		// 	add(createRock({
		// 		rtype: 0,
		// 		x: (width() + 108)
		// 	}))
		// });

		const player = add([
			sprite('yellowPlane'),
			pos(100, 0),
			area({
				shape: new Polygon([
					vec2(0, 13),
					vec2(7, 10),
					vec2(18, 10),
					vec2(23, 0),
					vec2(72, 0),
					vec2(74, 16),
					vec2(86, 18),
					vec2(86, 60),
					vec2(64, 72),
					vec2(52, 72),
					vec2(16, 63),
					vec2(16, 41),
					vec2(0, 30)
				]),
			}),
			body(), 
			'player'
		]);

		onUpdate('rock', (rock) => {
			if(!pause){
				rock.move(-rockSpeed, 0);
				if(rock.pos.x < -180) destroy(rock);
			}
		});

		onDraw(() => {
			// drawPolygon({
			// 	pts: [
			// 		vec2(0, 0),
			// 		vec2(108, 0),
			// 		vec2(66, 238)
			// 	],
			// 	pos: vec2(r.pos.x, r.pos.y),
			// 	color: rgb(0, 0, 255)
			// });

			/*drawPolygon({
				pts: [
					vec2(0, 13),
					vec2(7, 10),
					vec2(18, 10),
					vec2(23, 0),
					vec2(72, 0),
					vec2(74, 16),
					vec2(86, 18),
					vec2(86, 60),
					vec2(64, 72),
					vec2(52, 72),
					vec2(16, 63),
					vec2(16, 41),
					vec2(0, 30)
				],
				pos: vec2(player.pos.x, player.pos.y),
				color: rgb(55, 20, 155)
			});*/
		});

		onMousePress('left', () => {
			player.jump(120);
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

		//* ---------------------------------------------------------------------------------------------
		//todo CONTROL DEL MENU DE PAUSE
		//* ---------------------------------------------------------------------------------------------

		const pauseBg = make([
			rect(800, 480),
			color(0, 0, 0),
			opacity(0.3),
		]);

		const continueBtn = make([
			sprite('buttonLarge'),
			pos(10, 10),
			'pausebtn',
		]);

		stateController.onStateEnter('pause', () => {
			add(pauseBg);
			add(continueBtn);
			readd(c);
		});

		stateController.onStateEnd('pause', () => {
			destroy(continueBtn);
			destroy(pauseBg);
		});

	});

}

export default gameplay;