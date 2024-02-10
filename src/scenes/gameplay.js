
// 0 - arriba | 1 - abajo
function createRock(options = {
	rtype,
	x,
}){
	if(options.rtype === 0){
		return [
			sprite('rock'),
			area({
				shape: new Polygon([
					vec2(0, 239),
					vec2(108, 239),
					vec2(65, 0)
				])
			}),
			fixed(),
			pos(options.x, height() - 235),
			'rock',
		]
	}else if(options.rtype === 1){
		return [
			sprite('rockDown'),
			area({
				shape: new Polygon([
					vec2(0, 0),
					vec2(108, 0),
					vec2(66, 237)
				])
			}),
			fixed(),
			pos(options.x, -2),
			'rockDown',
		];
	}
}

function gameplay(){

	scene('gameplay', () => {

		//setGravity(200);
		const rockSpeed = 200;
		setCursor('pointer');

		const rockTimer = add([
			timer(),
		]);

		rockTimer.loop('1.4', () => {
			add(createRock({
				rtype: 0,
				x: (width() + 108)
			}))
		});

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
		//const h = r.height;
		//r.pos.y = (height() - h);
		//console.log(h); 

		onKeyPress('space', () => {
			add(createRock({
				rtype: 1,
				x: (width() + 108),
			}))
		});

		onUpdate('rockDown', (rock) => {
			rock.move(-rockSpeed, 0);
			if(rock.pos.x < -108){
				destroy(rock);
			}
		});
		onUpdate('rock', (rock) => {
			rock.move(-rockSpeed, 0);
			if(rock.pos.x < -180){
				destroy(rock);
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

			drawPolygon({
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
				color: rgb(255, 0, 255)
			});
		});

		player.onCollide('rock', () => {
			console.log('colisionaaaaaaaaaaaa');
		});

		onMousePress('left', () => {
			player.jump(100);
		});

	});

}

export default gameplay;