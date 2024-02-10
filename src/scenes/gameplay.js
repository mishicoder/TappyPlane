import createRock from "../objects/rock.js";

function gameplay(){

	scene('gameplay', (options = {
		cursor, //? pedimos el objeto de cursor por parametro
		playerSprite,
	}) => {

		//* ---------------------------------------------------------------------------------------------
		//todo VARIABLES Y CONSTANTES DE CONTROL | FUNCIONES INICIALES
		//* ---------------------------------------------------------------------------------------------
		const rockSpeed = 200; //? Velocidad a la que se moveran las rocas
		let pause = false; //? Determina si el juego esta en pausa

		setGravity(200); //? Establecemos el valor de la gravedad

		//* ---------------------------------------------------------------------------------------------
		//todo DIBUJADO DEL FONDO CON EFECTO PARALLAX
		//* ---------------------------------------------------------------------------------------------
		//? Fondo parallax
		/**
		 ** Esta formna de dibujar el fondo parallax es el mas comun, ya que podemos hacer un fondo con efecto de movimiento horizontal
		 ** Solo hace falta dibujar la imagen de fondo dos veces y hacer que una corra detras de la otra
		*/

		let bgx1 = 0; //? Posicion en x del primer sprite de fondo
		let bgx2 = 800; //? Posicion en x del segundo sprite de fondo

		onUpdate(() => {
			//* Actualizamos la posicion del fondo siemnpre y cuando el juego no este pausado
			if(!pause) bgx1 -= 2;
			if(!pause)bgx2 -= 2;

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

		// rockTimer.loop('1.8', () => {
		// 	add(createRock({
		// 		rtype: 0,
		// 		x: (width() + 108)
		// 	}))
		// });
		//* ---------------------------------------------------------------------------------------------
		//todo TEMPORIZADORES
		//* ---------------------------------------------------------------------------------------------
		const rockTimer = add([
			timer(),
		]);

		const rockDownTimer = add([
			timer(),
		]);

		//* ---------------------------------------------------------------------------------------------
		//todo OBJETOS INICIALES DEL JUEGO
		//* ---------------------------------------------------------------------------------------------

		const player = add([
			sprite(options.playerSprite),
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

		//* ---------------------------------------------------------------------------------------------
		//todo FUNCIONES DE CONTROL DE JUEGO
		//* ---------------------------------------------------------------------------------------------

		

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