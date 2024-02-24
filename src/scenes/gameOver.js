import button from "../objects/button.js";

// Super Tank Nes -> game (online)
// duck hunt -> game

function gameOver(){

	scene('gameOver', (options = {
		cursor,
		score,
		playerSprite,
		p,
	}) => {

		let titleY = -90;

		setGravity(0);

		const c = add(options.cursor);
		onUpdate(() => {
			if(titleY <= 20) titleY += 4;
			c.pos = mousePos();
		});

		//* ---------------------------------------------------------------------------------------------
		//todo FONDO
		//* ---------------------------------------------------------------------------------------------
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

			drawSprite({
				sprite: 'gameOver',
				pos: vec2(
					width()/2 - (412/2), 
					titleY),
			});
		});

		//* ---------------------------------------------------------------------------------------------
		//todo PUNTAJE
		//* ---------------------------------------------------------------------------------------------
		const p = add(options.p);
		p.pos.x = -88;
		p.pos.y = 140;
		p.rotateTo(0);
		
		let ptxt = options.score.toString();
		if(options.score < 100) ptxt = '00' + options.score.toString();
		else if(options.score >= 100 && options.score < 1000) ptxt = '0' + options.score.toString();
		const points = add([
			text(ptxt, {
				font: 'kfuture',
				size: 48,
			}),
			color(0, 0, 0),
			pos(85, height() + 20),
		]);

		let medalSprite;
		if(options.score <= 250) medalSprite = 'Bronze';
		if(options.score > 250 && options.score <= 500) medalSprite = 'Silver';
		if(options.score > 1000) medalSprite = 'Gold';

		const medal = add([
			sprite(`medal${medalSprite}`),
			pos(-114, 320),
		]);

		//* ---------------------------------------------------------------------------------------------
		//todo FUNCIONES
		//* ---------------------------------------------------------------------------------------------
		onUpdate(() => {
			if(p.pos.x < 100 )p.move(360, 0);
			if(p.pos.x > 100) p.pos.x = 100;

			if(points.pos.y > 240) points.move(0, -500);
			if(points.pos.y < 240) points.pos.y = 240;

			if(medal.pos.x < 85) medal.move(280, 0);
			if(medal.pos.x > 85) medal.pos.x = 85;
		});


		//* ---------------------------------------------------------------------------------------------
		//todo BOTONES
		//* ---------------------------------------------------------------------------------------------

		const btn = button({
			btnText: 'Retry', 
			onClickEvent: () => {
				const rockTypes = [
					'n', // normal
					'g', // grass
					'i', // ice
					's'  // snow
				];
	
				const groundTypes = [
					'd', // normal
					'g', // grass
					'i', // ice
					's'  // snow
				];
	
				const rock = randi(0, 4);
	
				go('gameplay', {
					cursor: c,
					playerSprite: options.playerSprite,
					rockSprite: rockTypes[rock],
					groundSprite: groundTypes[rock],
				});
			}
		});
		const btnMaxX = width() - (btn.width + 100);
		btn.pos.x = 800;
		btn.pos.y = 130;

		const btnMenu = button({
			btnText: 'Menu',
			onClickEvent: () => {
				go('title');
			}
		});
		const btnMenuMaxX = width() - (btnMenu.width + 100);
		btnMenu.pos.x = 800;
		btnMenu.pos.y = 230;

		const btnExit = button({
			btnText: 'Exit',
			onClickEvent: () => {
				quit();
				window.close();
			}
		});
		const btnExitMaxX = width() - (btnExit.width + 100);
		btnExit.pos.x = 800;
		btnExit.pos.y = 330;

		const buttonSpeed = 8;

		onUpdate(() => {
			

			if(btn.pos.x > btnMaxX) btn.pos.x -= buttonSpeed;
			if(btn.pos.x < btnMaxX) btn.pos.x = btnMaxX;

			if(btnMenu.pos.x > btnMenuMaxX) btnMenu.pos.x -= buttonSpeed;
			if(btnMenu.pos.x < btnMenuMaxX) btnMenu.pos.x = btnMenuMaxX;

			if(btnExit.pos.x > btnExitMaxX) btnExit.pos.x -= buttonSpeed;
			if(btnExit.pos.x < btnExitMaxX) btnExit.pos.x = btnExitMaxX;
		});

	});

}

export default gameOver;
