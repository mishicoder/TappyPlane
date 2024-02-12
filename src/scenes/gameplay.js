import createRocks from "../objects/rock.js";

function gameplay(){

	scene('gameplay', (options = {
		cursor, //? pedimos el objeto de cursor por parametro
		playerSprite,
		rockSprite,
		groundSprite,
	}) => {

		//* ---------------------------------------------------------------------------------------------
		//todo VARIABLES Y CONSTANTES DE CONTROL | FUNCIONES INICIALES
		//* ---------------------------------------------------------------------------------------------
		const rockSpeed = 160; //? Velocidad a la que se moveran las rocas
		let pause = true; //? Determina si el juego esta en pausa
		let ready = false; //? Controla que la animación de inicio se ejecute correctamente
		let playerAngle = 35; //? Angulo de inclinación de la avioneta

		setGravity(0); //? Establecemos el valor de la gravedad

		let points = 0; //? Puntos obetenidos (serán pasados por parámetro)

		const c = add(options.cursor);

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
			if(!pause) bgx2 -= 2;

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

		//* ---------------------------------------------------------------------------------------------
		//todo OBJETOS INICIALES DEL JUEGO
		//* ---------------------------------------------------------------------------------------------

		const rocks = add([
			pos(0, 0)
		]);

		const player = add([
			pos(100, 80),
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
			rotate(),
			'player'
		]);

		const puff = player.add([
			sprite('puff', { anim: 'fly' }),
			pos(-39, 8),
		]);

		const plane = player.add([
			sprite(`${options.playerSprite}Plane`),
		]);

		player.rotateTo(playerAngle);
		
		player.onFall(() => {
			player.rotateTo(playerAngle);
		});

		player.onCollide('rock', (rock) => {
			go('gameOver', {
				cursor: c,
				score: points,
				playerSprite: options.playerSprite,
			});
		});

		//* ---------------------------------------------------------------------------------------------
		//todo INICIO
		//* ---------------------------------------------------------------------------------------------

		const t = add([
			timer(),
		]);

		const getReadyShow = make([
			sprite('getReadyShow'),
			pos(200, 100),
			scale(1.0),
			rotate(),
		]);
		
		const getReadyHidden = make([
			sprite('getReadyHidden'),
			pos(200, 100),
			scale(1.0),
			rotate(),
		]);

		getReadyShow.onAnimEnd((anim) => {
			wait(1, () => {
				add(getReadyHidden);
				destroy(getReadyShow);
				getReadyHidden.play('show');
			});
		});

		getReadyHidden.onAnimEnd((anim) => {
			if(anim === 'show'){
				ready = true;
				pause = false;
				setGravity(200);
				plane.play('fly');
				destroy(getReadyHidden);
			}
		})

		let timeToStart = 3;
		let de;
		const initialTime = loop(1, () => {
			let tts = timeToStart.toString();
			try{de.cancel()}catch{}
			// 53 x 78
			de = onDraw(() => {
				drawSprite({
					sprite: `num${tts}`,
					pos: vec2(width()/2 - 53/2, height()/2 - 78 / 2),
				});
			});
			
			timeToStart--;
		});

		t.wait(3, () => {
			
			destroy(t);
			initialTime.cancel();
			de.cancel();
			add(getReadyShow);
			getReadyShow.play('show');
		});

		//* ---------------------------------------------------------------------------------------------
		//todo FUNCIONES DE FLUJO DE JUEGO
		//* ---------------------------------------------------------------------------------------------

		loop(1.5, () => {
			if(!pause)createRocks(rocks, options.rockSprite);
		});

		loop(0.7, () => {
			if(!pause)points += 2;
		});

		onUpdate(() => {
			if(player.pos.y > height()){
				go('gameOver', {
					cursor: c,
					score: points,
					playerSprite: options.playerSprite,
				});
			}
		});

		onUpdate('rock', (rock) => {
			if(!pause){
				rock.move(-rockSpeed, 0);
			}
		});

		//* ---------------------------------------------------------------------------------------------
		//todo CONTROL DE ENTRADA DE USUARIO
		//* ---------------------------------------------------------------------------------------------

		onUpdate(() => {
			if(isTouchscreen()){ console.log('se puede tocar'); }
		});

		onMousePress('left', () => {
			if(!pause){
				player.jump(120);
				player.rotateTo(0);
			}
		});

		onKeyPress('escape', () => {
			if(ready){pause = !pause;

			if(pause) setGravity(0);
			else setGravity(200);

			if(pause) { stateController.enterState('pause'); plane.play('idle'); }
			else { stateController.enterState('play'); plane.play('fly') }}
		});


		//* ---------------------------------------------------------------------------------------------
		//todo DIBUJADO DE LA PARTE FRONTAL
		//* ---------------------------------------------------------------------------------------------
		let fgx1 = 0;
		let fgx2 = 808;

		onUpdate(() => {
			if(!pause) fgx1 -= 2;
			if(!pause) fgx2 -= 2;

			if(fgx1 < -808) fgx1 = 806;
			if(fgx2 < -808) fgx2 = 806;
		});

		onDraw(() => {
			drawSprite({
				sprite: `g${options.groundSprite}`,
				pos: vec2(fgx1, height() - 71),
			});
			drawSprite({
				sprite: `g${options.groundSprite}`,
				pos: vec2(fgx2, height() - 71),
			});
		});

		//* ---------------------------------------------------------------------------------------------
		//todo UI (PARA TOUCH Y KEYBOARD)
		//* ---------------------------------------------------------------------------------------------

		onDraw(() => {
			// 53 x 78
			let pointStr = points.toString();
			let pointx = 10;
			for(let i = 0; i < pointStr.length; i++){
				drawSprite({
					sprite: `num${pointStr[i]}`,
					width: 53/2,
					height: 78/2,
					pos: vec2(pointx, 10),
				});
				pointx += (53/2);
			}
		});
		
		//* ---------------------------------------------------------------------------------------------
		//todo CURSOR
		//* ---------------------------------------------------------------------------------------------
		//readd(c);
		if(isTouchscreen()){ c.hidden = true; }
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
		
		//! Fondo
		const pauseBg = make([
			rect(800, 480),
			color(0, 0, 0),
			opacity(0.3),
		]);

		//! Botones
		//* Boton de continuar
		// 196 x 70
		const continueBtn = make([
			sprite('buttonLarge'),
			pos(
				(width()/2) - (196/2),
				120
			),
			area(),
		]);
		
		//* Boton para volver al menu
		const titleBtn = make([
			sprite('buttonLarge'),
			pos(
				(width()/2) - (196/2),
				220
			),
			area(),
		]);
		//* Boton de salir
		const exitBtn = make([
			sprite('buttonLarge'),
			pos(
				(width()/2) - (196/2),
				320
			),
			area(),
		]);

		//? Texto de los botones
		const continueStr = 'CONTINUE';
		const titleStr = 'MENU';
		const exitStr = 'EXIT';

		stateController.onStateEnter('pause', () => {
			//! Eventos para botones
			//* Boton de continuar
			continueBtn.onClick(() => {
				pause = !pause;
	
				if(pause) setGravity(0);
				else setGravity(200);
	
				if(pause) { stateController.enterState('pause'); plane.play('idle'); }
			else { stateController.enterState('play'); plane.play('fly') }
			});
			//* Boton para volver al menu
			titleBtn.onClick(() => {
				go('title');
			});
			//* Boton para salir
			exitBtn.onClick(() => {
				quit();
				window.close();
			});

			add(pauseBg);
			add(continueBtn);
			add(titleBtn);
			add(exitBtn);

			//! Dibujado de texto de los botones
			onDraw(() => {
				
				if(pause){
					//* Boton de continuar
					let cx = ((width()/2) - (( (7*22.8) + 11.4 + 28 ) / 2));
					for(let i = 0; i < continueStr.length; i++){
						if(continueStr[i] === 'I'){
							drawSprite({
								sprite: `l${continueStr[i]}`,
								width: 11.4,
								height: 24,
								pos: vec2(cx, 135),
							});
							cx += 15.4;
						}
						else{
							drawSprite({
								sprite: `l${continueStr[i]}`,
								width: 22.8,
								height: 24,
								pos: vec2(cx, 135),
							});
							cx += 26.8;
						}
					}

					//* Boton de menu
					let mx = ((width()/2) - (( (4*22.8) + (12) ) / 2));
					for(let i = 0; i < titleStr.length; i++){
						drawSprite({
							sprite: `l${titleStr[i]}`,
							width: 22.8,
							height: 24,
							pos: vec2(mx, 238),
						});
						mx += 26.8;
					}

					//* Boton de salir
					let ex = ((width()/2) - (( (4*22.8) + 12 ) / 2));
					for(let i = 0; i < exitStr.length; i++){
						if(exitStr[i] === 'I'){
							drawSprite({
								sprite: `l${exitStr[i]}`,
								width: 11.4,
								height: 24,
								pos: vec2(ex, 338),
							});
							ex += 15.4;
						}
						else{
							drawSprite({
								sprite: `l${exitStr[i]}`,
								width: 22.8,
								height: 24,
								pos: vec2(ex, 338),
							});
							ex += 26.8;
						}
					}
				}
			});
		});

		stateController.onStateEnd('pause', () => {
			destroy(continueBtn);
			destroy(pauseBg);
			destroy(titleBtn);
			destroy(exitBtn);
		});

	});

}

export default gameplay;