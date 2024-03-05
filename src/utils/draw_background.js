
const dBackground = () => {

    //* Background
    let bgx1 = 0;
    let bgx2 = 800;

    onDraw(() => {

        //? part 1
        drawSprite({
            sprite: 'background',
            pos: vec2(bgx1, 0),
        });

        //? part 2
        drawSprite({
            sprite: 'background',
            pos: vec2(bgx2, 0),
        });

    });

    onUpdate(() => {
        bgx1 -= 2;
        bgx2 -= 2;

        if (bgx1 <= -800) bgx1 = 800;
        if (bgx2 <= -800) bgx2 = 800;
    });

};

export default dBackground;