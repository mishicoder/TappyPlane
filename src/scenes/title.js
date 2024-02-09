
function titleScene(){
    scene('title', ( x ) => {

        const titleChars = 'TAPPY PLANE';
        
        // 61 x 64 -> letter size
        onDraw(() => {

            drawSprite({
                sprite: 'background',
                pos: vec2(0.0, 0.0),
                width: 800,
                height: 480
            });

            let x = width()/2 - 187.5;
            for(let i = 0; i < titleChars.length; i++){
                if(titleChars[i] !== ' '){
                    drawSprite({
                        sprite: `l${titleChars[i]}`,
                        width: 30.5,
                        height: 32,
                        pos: vec2(x, 20)
                    });
                    x += 30.5 + 5;
                }else{
                    x += 30;
                }
            }
        });

        const titlePlane = add([
            sprite('redPlane', {
                anim: 'fly'
            }),
            fixed(),
            pos(),
        ]);

        titlePlane.pos = vec2(
            -94,
            80
        );

        const playButton = add([
            sprite('buttonLarge'),
            fixed(),
            pos(),
            anchor('top'),
            area(),
        ]);
        playButton.pos.x = (width()/2) - (playButton.quad.w/2);
        playButton.pos.y = 180;
        const playStr = 'PLAY';
        onDraw(() => {
            let px = 330;
            for(let i = 0; i < playStr.length; i++){
                drawSprite({
                    sprite: `l${playStr[i]}`,
                    width: 30.5,
                    height: 32,
                    pos: vec2(px, 195)
                });
                px += 30 + 5;
            }
        });

        const exitButton = add([
            sprite('buttonLarge'),
            fixed(),
            pos(),
            anchor('top'),
            area(),
        ]);
        exitButton.pos.x = (width()/2) - (exitButton.quad.w/2);
        exitButton.pos.y = 280;
        const exitStr = 'EXIT';
        onDraw(() => {
            let ex = 340;
            for(let i = 0; i < exitStr.length; i++){
                if(exitStr[i] === 'I'){
                    drawSprite({
                        sprite: `l${exitStr[i]}`,
                        width: 15.25,
                        height: 32,
                        pos: vec2(ex, 295)
                    });
                    ex += 15.25 + 5
                }else{
                    drawSprite({
                        sprite: `l${exitStr[i]}`,
                        width: 30.5,
                        height: 32,
                        pos: vec2(ex, 295)
                    });
                    ex += 30 + 5;
                }
                
            }
        });

        const cursors = add([
            sprite('cursors', {
                anim: 'idle'
            }),
            pos(),
            fixed(),
        ]);

        onUpdate(() => {
            titlePlane.move(240, 0);

            if(titlePlane.pos.x > width()){
                titlePlane.pos.x = -94;
            }

            cursors.pos = mousePos();
        });

        

    });

    
}

export default titleScene;