
function gameOver(){

	scene('gameOver', () => {

		const msg = 'GAME OVER';

		onDraw(() => {

			let x = (width()/2) - (((8 * 61) + (6 * 8) + 30) / 2);
			let y = (height()/2) - 32;
			for(let i = 0; i < msg.length; i++){
				if(msg[i] !== ' '){
					drawSprite({
	                    sprite: `l${msg[i]}`,
	                    width: 61,
	                    height: 64,
	                    pos: vec2(x, y)
	                });
	                x += 69;
				}else{
					x += 30;	
				}
			}

		});

	});

}

export default gameOver;
