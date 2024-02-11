
function createRock(options = {
    rtype,
    x
}){

    
    if(options.rtype === 0){
        return [
            sprite('rock'),
            area({
                shape: new Polygon([
                    vec2(0, 239),
					vec2(108, 239),
					vec2(65, 0)
                ]),
            }),
            fixed(),
            pos(options.x, heihgt() - 235),
            'rock'
        ];
    }else if(options.rtype === 1){
        return[
            sprite('rockDown'),
            area({
                shape: new Polygon([
                    vec2(0, 0),
					vec2(108, 0),
					vec2(66, 237)
                ]),
            }),
            fixed(),
            pos(options.x, -2),
            'rock'
        ];
    }

}

export default createRock;