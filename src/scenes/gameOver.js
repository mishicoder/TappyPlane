

function gameOver(){

	scene('gameOver', (options = {
		cursor,
		score,
		playerSprite,
	}) => {

		const bronzePoints = 0;
		const silverPoints = 500;
		const goldPoints = 1000;

		const msg = 'GAME OVER';
		let titleY = -90;

		const c = add(options.cursor);

		const t = add([
			timer(),
		]);

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

	});

}

export default gameOver;
