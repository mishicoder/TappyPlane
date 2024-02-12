import button from "../objects/button.js";

function gameOver(){

	scene('gameOver', (options = {
		cursor,
		score,
		playerSprite,
		p,
	}) => {

		const bronzePoints = 0;
		const silverPoints = 500;
		const goldPoints = 1000;
		let titleY = -90;

		setGravity(0);

		const c = add(options.cursor);
		onUpdate(() => {
			if(titleY <= 20) titleY += 4;

			c.pos = mousePos();
		});

		onDraw(() => {

			drawSprite({
				sprite: 'gameOver',
				pos: vec2((width()/2) - (412/2), titleY),
			});

		});
		//* ---------------------------------------------------------------------------------------------
		//todo PUNTAJE
		//* ---------------------------------------------------------------------------------------------
		const p = add(options.p);
		p.pos.x = 100;
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
			pos(85, 240),
		]);
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
		btn.pos.x = width() - (btn.width + 100);
		btn.pos.y = 130;

		const btnMenu = button({
			btnText: 'Menu',
			onClickEvent: () => {
				go('title');
			}
		});
		btnMenu.pos.x = width() - (btnMenu.width + 100);
		btnMenu.pos.y = 230;

		const btnExit = button({
			btnText: 'Exit',
			onClickEvent: () => {
				quit();
				window.close();
			}
		});
		btnExit.pos.x = width() - (btnExit.width + 100);
		btnExit.pos.y = 330;

	});

}

export default gameOver;
