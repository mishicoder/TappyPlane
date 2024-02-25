
const ROCK_GAP = 135;

function createRocks(parent, rockSprite){

    const offset = rand(-50, 50);

    //* Bottom 
    const rock = parent.add([
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
    //* Star
    let bronze = chance(1.0);
    let silver = chance(0.25);
    let gold = chance(0.1);

    if(bronze && !silver && !gold){
        rock.add([
            sprite('starBronze'),
            pos(
                (rock.width/2 - 39/2) + 8,
                -((135/2) + (38/2))
            ),
            area(),
            'bronze'
        ]);
    }else if(silver && !gold){
        rock.add([
            sprite('starSilver'),
            pos(
                (rock.width/2 - 39/2) + 8,
                -((135/2) + (38/2))
            ),
            area(),
            'silver'
        ]);
    }else if(gold){
        rock.add([
            sprite('starGold'),
            pos(
                (rock.width/2 - 39/2) + 8,
                -((135/2) + (38/2))
            ),
            area(),
            'gold'
        ]);
    }

}

export default createRocks;