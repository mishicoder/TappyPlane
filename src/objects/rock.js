
const ROCK_GAP = 160;

function createRocks(parent){

    const offset = rand(-50, 50);

    //* Top
    parent.add([
        sprite('rock'),
        pos(width(), height()/2 + offset + ROCK_GAP / 2),
        offscreen({ destroy: true }),
        area({
            shape: new Polygon([
                vec2(0, 239),
				vec2(108, 239),
				vec2(65, 0)
            ])
        }),
        "rock",
    ]);
    //* Bottom
    parent.add([
        sprite('rockDown'),
        pos(width(), height() / 2 + offset - ROCK_GAP /2),
        offscreen({ destroy: true }),
        anchor('botleft'),
        area({
            shape: new Polygon([
                vec2(0, 0),
				vec2(108, 0),
				vec2(66, 237)
            ])
        }),
        'rock',
    ]);

}

export default createRocks;