
const ROCK_GAP = 135;

function createRocks(parent, rockSprite){

    const offset = rand(-50, 50);

    //* Bottom 
    parent.add([
        sprite(`r${rockSprite}`),
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
    //* Top
    parent.add([
        sprite(`r${rockSprite}Down`),
        pos(width(), offset - ROCK_GAP / 2 ),
        offscreen({ destroy: true }),
        
        area({
            shape: new Polygon([
                vec2(0, 0),
				vec2(108, 0),
				vec2(66, 237),
            ])
        }),
        'rock',
    ]);

}

export default createRocks;