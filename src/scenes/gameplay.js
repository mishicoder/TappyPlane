import button from "../objects/button.js";
import createRocks from "../objects/rock.js";

// nota aleatorioa xdddd => https://www.warp.dev/

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
		let isOver = false;
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
			sprite('puff'),
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
			if(!isOver){
				pause = true;
				isOver = true;
				const loseSound = play('lose', { volume: 0.5 });
				loseSound.onEnd(() => {
					go('gameOver', {
						cursor: c,
						score: points,
						playerSprite: options.playerSprite,
						p: player,
					});
				});
			}
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
				puff.play('fly');
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
			if(player.pos.y > height() && !isOver){
				
				pause = true;
				isOver = true;
				const loseSound = play('lose', { volume: 0.5 });
				loseSound.onEnd(() => {
					go('gameOver', {
						cursor: c,
						score: points,
						playerSprite: options.playerSprite,
						p: player,
					});
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

			if(pause) { stateController.enterState('pause'); plane.play('idle'); puff.play('idle');}
			else { stateController.enterState('play'); plane.play('fly'); puff.play('fly'); }}
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
		let continueBtn = 0;
		let menuBtn = 0;
		let exitBtn = 0;

		stateController.onStateEnter('pause', () => {
			//! Eventos para botones

			continueBtn = button({
				btnText: 'Continue',
				btnTextSize: 28,
				onClickEvent: () => {
					pause = !pause;
	
					if(pause) setGravity(0);
					else setGravity(200);
		
					if(pause) { stateController.enterState('pause'); plane.play('idle'); puff.play('idle'); }
					else { stateController.enterState('play'); plane.play('fly'); puff.play('fly'); }
				}
			});
			continueBtn.pos.x = (width()/2) - (196/2);
			continueBtn.pos.y = 120;

			menuBtn = button({
				btnText: 'Menu',
				onClickEvent: () => {
					go('title');
				}
			});
			menuBtn.pos.x = (width()/2) - (196/2);
			menuBtn.pos.y = 220;

			exitBtn = button({
				btnText: 'Exit',
				onClickEvent: () => {
					quit();
					window.close();
				}
			});
			exitBtn.pos.x = (width()/2) - (196/2);
			exitBtn.pos.y = 320;
		});

		stateController.onStateEnd('pause', () => {
			destroy(pauseBg);
			destroy(continueBtn);
			destroy(menuBtn);
			destroy(exitBtn);
		});

	});

}

export default gameplay;