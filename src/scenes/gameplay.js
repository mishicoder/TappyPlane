
function gameplay(){

	scene('gameplay', () => {

		setGravity(200);
		setCursor('pointer');

		const player = add([
			sprite('yellowPlane'),
			pos(100, 0),
			area(),
			body(),
			'player'
		]);

		const r = add([
			sprite('rock'),
			pos(18, 0),
			fixed(),
			area({
				shape: new Polygon([
					vec2(0, 239),
					vec2(108, 239),
					vec2(65, 0)
				])
			}),
			"rock"
		]);
		r.pos.y = height() - 239;
		onDraw(() => {
			drawPolygon({
			pts: [
				vec2(0, 239),
				vec2(108, 239),
				vec2(65, 0)
			],
			pos: vec2(r.pos.x, r.pos.y),
			color: rgb(0, 0, 255)
		});
		});

		player.onCollide('rock', () => {
			go('gameOver');
		});

		onMousePress('left', () => {
			player.jump(100);
		});

	});

}

export default gameplay;