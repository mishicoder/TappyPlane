
function gameOver(){

	scene('gameOver', () => {

		const msg = 'GAME OVER';
		let titleY = -90;

		onUpdate(() => {
			if(titleY <= 20) titleY += 4;
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
