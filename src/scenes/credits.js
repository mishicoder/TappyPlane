import button from "../objects/button.js";

function credits()
{

    scene('credits', (cursor) => { //? Inicio de la escena

        //* Add and set update for cursor
        const c = add(cursor);
        onUpdate(() => {
            c.pos = mousePos();
        });

        //* Vars

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

        //* Title
        const title =add([
            text('CREDITS', {
                font: 'kfuture',
                size: 50
            }),
            color(0, 0, 0),
            pos(),
        ]);
        title.pos.x = (width()/2) - (title.width/2);
        title.pos.y = 5;

        //* Guide text

        const data = getAsset('credits');

        //todo *****************************************************************************************************************************
        //? PROGRAMMER
        //todo *****************************************************************************************************************************
        const programmer = add([
            text('Programmer:', { font: 'kfuture' }),
            anchor('center'),
            pos(center().x, 120),
            color(0,0,0)
        ]);
        const pname = programmer.add([
            text(data.data.programmer.name, { font: 'kfuture' }),
            anchor('center'),
            pos(0, 60),
            color(0,0,0)
        ]);

        let p_insta_btn = 0;
        let p_itchio_btn = 0;
        let p_web_btn = 0;

        //? Instagram
        if( data.data.programmer.instagram !== '' ){
            p_insta_btn = programmer.add([
                sprite('instagram-icon'),
                scale(0.08),
                anchor('center'),
                pos(0, 170),
                area(),
            ]);
            p_insta_btn.onClick(() => {
                window.open(data.data.programmer.instagram);
            });
        }
        //? Itchio
        if( data.data.programmer.itchio !== '' ){
            p_itchio_btn = programmer.add([
                sprite('itchio-icon'),
                scale(0.08),
                anchor('center'),
                pos(-140, 170),
                area()
            ]);
            p_itchio_btn.onClick(() => {
                window.open(data.data.programmer.itchio);
            });
        }
        //? Web
        if( data.data.programmer.web !== '' ){
            p_web_btn = programmer.add([
                sprite('web-icon'),
                scale(0.08),
                anchor('center'),
                pos(140, 170),
                area(),
            ]);
            p_web_btn.onClick(() => {
                window.open(data.data.programmer.web);
            });
        }

        //? Social media control
        if( (p_insta_btn !== 0 && p_itchio_btn !== 0 && p_web_btn === 0) ){
            p_insta_btn.pos.x = 80;
            p_itchio_btn.pos.x = -80;
        }else if( p_insta_btn !== 0 && p_web_btn !== 0 && p_itchio_btn === 0 ){
            p_insta_btn.pos.x = 80;
            p_web_btn.pos.x = -80;
        }else if( p_web_btn !== 0 && p_itchio_btn !== 0 && p_insta_btn === 0 ){
            p_web_btn.pos.x = 80;
            p_itchio_btn.pos.x = -80;
        }

        //todo *****************************************************************************************************************************
        //? ANIMATION
        //todo *****************************************************************************************************************************
        
        const animation = add([
            text('Animation:', { font: 'kfuture' }),
            anchor('center'),
            pos(center().x, 120),
            color(0,0,0)
        ]);
        const aname = animation.add([
            text(data.data.animation.name, { font: 'kfuture' }),
            anchor('center'),
            pos(0, 60),
            color(0,0,0)
        ]);

        let n_insta_btn = 0;
        let n_itchio_btn = 0;
        let n_web_btn = 0;

        //? Instagram
        if( data.data.animation.instagram !== '' ){
            n_insta_btn = animation.add([
                sprite('instagram-icon'),
                scale(0.08),
                anchor('center'),
                pos(0, 170),
                area(),
            ]);
            n_insta_btn.onClick(() => {
                window.open(data.data.animation.instagram);
            });
        }
        //? Itchio
        if( data.data.animation.itchio !== '' ){
            n_itchio_btn = animation.add([
                sprite('itchio-icon'),
                scale(0.08),
                anchor('center'),
                pos(-140, 170),
                area()
            ]);
            n_itchio_btn.onClick(() => {
                window.open(data.data.animation.itchio);
            });
        }
        //? Web
        if( data.data.animation.web !== '' ){
            n_web_btn = animation.add([
                sprite('web-icon'),
                scale(0.08),
                anchor('center'),
                pos(140, 170),
                area(),
            ]);
            n_web_btn.onClick(() => {
                window.open(data.data.animation.web);
            });
        }

        //? Social media control
        if( (n_insta_btn !== 0 && n_itchio_btn !== 0 && n_web_btn === 0) ){
            n_insta_btn.pos.x = 80;
            n_itchio_btn.pos.x = -80;
        }else if( n_insta_btn !== 0 && n_web_btn !== 0 && n_itchio_btn === 0 ){
            n_insta_btn.pos.x = 80;
            n_web_btn.pos.x = -80;
        }else if( n_web_btn !== 0 && n_itchio_btn !== 0 && n_insta_btn === 0 ){
            n_web_btn.pos.x = 80;
            n_itchio_btn.pos.x = -80;
        }

        //todo *****************************************************************************************************************************
        //? GRAPHICS
        //todo *****************************************************************************************************************************
        
        const graphics = add([
            text('Graphics:', { font: 'kfuture' }),
            anchor('center'),
            pos(center().x, 120),
            color(0,0,0)
        ]);
        const gname = graphics.add([
            text(data.data.graphics.name, { font: 'kfuture' }),
            anchor('center'),
            pos(0, 60),
            color(0,0,0)
        ]);

        let g_insta_btn = 0;
        let g_itchio_btn = 0;
        let g_web_btn = 0;

        //? Instagram
        if( data.data.graphics.instagram !== '' ){
            g_insta_btn = graphics.add([
                sprite('instagram-icon'),
                scale(0.08),
                anchor('center'),
                pos(0, 170),
                area(),
            ]);
            g_insta_btn.onClick(() => {
                window.open(data.data.graphics.instagram);
            });
        }
        //? Itchio
        if( data.data.graphics.itchio !== '' ){
            g_itchio_btn = graphics.add([
                sprite('itchio-icon'),
                scale(0.08),
                anchor('center'),
                pos(-140, 170),
                area()
            ]);
            g_itchio_btn.onClick(() => {
                window.open(data.data.graphics.itchio);
            });
        }
        //? Web
        if( data.data.graphics.web !== '' ){
            g_web_btn = graphics.add([
                sprite('web-icon'),
                scale(0.08),
                anchor('center'),
                pos(140, 170),
                area(),
            ]);
            g_web_btn.onClick(() => {
                window.open(data.data.graphics.web);
            });
        }

        //? Social media control
        if( (g_insta_btn !== 0 && g_itchio_btn !== 0 && g_web_btn === 0) ){
            g_insta_btn.pos.x = 80;
            g_itchio_btn.pos.x = -80;
        }else if( g_insta_btn !== 0 && g_web_btn !== 0 && g_itchio_btn === 0 ){
            g_insta_btn.pos.x = 80;
            g_web_btn.pos.x = -80;
        }else if( g_web_btn !== 0 && g_itchio_btn !== 0 && g_insta_btn === 0 ){
            g_web_btn.pos.x = 80;
            g_itchio_btn.pos.x = -80;
        }

        //todo *****************************************************************************************************************************
        //? GRAPHICS
        //todo *****************************************************************************************************************************
        
        const sound = add([
            text('Sound:', { font: 'kfuture' }),
            anchor('center'),
            pos(center().x, 120),
            color(0,0,0)
        ]);
        const sname = sound.add([
            text(data.data.sound.name, { font: 'kfuture' }),
            anchor('center'),
            pos(0, 60),
            color(0,0,0)
        ]);

        let s_insta_btn = 0;
        let s_itchio_btn = 0;
        let s_web_btn = 0;

        //? Instagram
        if( data.data.sound.instagram !== '' ){
            s_insta_btn = sound.add([
                sprite('instagram-icon'),
                scale(0.08),
                anchor('center'),
                pos(0, 170),
                area(),
            ]);
            s_insta_btn.onClick(() => {
                window.open(data.data.sound.instagram);
            });
        }
        //? Itchio
        if( data.data.sound.itchio !== '' ){
            s_itchio_btn = sound.add([
                sprite('itchio-icon'),
                scale(0.08),
                anchor('center'),
                pos(-140, 170),
                area()
            ]);
            s_itchio_btn.onClick(() => {
                window.open(data.data.sound.itchio);
            });
        }
        //? Web
        if( data.data.sound.web !== '' ){
            s_web_btn = sound.add([
                sprite('web-icon'),
                scale(0.08),
                anchor('center'),
                pos(140, 170),
                area(),
            ]);
            s_web_btn.onClick(() => {
                window.open(data.data.sound.web);
            });
        }

        //? Social media control
        if( (s_insta_btn !== 0 && s_itchio_btn !== 0 && s_web_btn === 0) ){
            s_insta_btn.pos.x = 80;
            s_itchio_btn.pos.x = -80;
        }else if( s_insta_btn !== 0 && s_web_btn !== 0 && s_itchio_btn === 0 ){
            s_insta_btn.pos.x = 80;
            s_web_btn.pos.x = -80;
        }else if( s_web_btn !== 0 && s_itchio_btn !== 0 && s_insta_btn === 0 ){
            s_web_btn.pos.x = 80;
            s_itchio_btn.pos.x = -80;
        }

        //todo *****************************************************************************************************************************
        //? BUTTON
        //todo *****************************************************************************************************************************

        const backButton = button({
            btnText: 'Back',
            onClickEvent: () => {
                go('title');
            }
        });
        backButton.pos.x = (width()/2) - (196/2);
        backButton.pos.y = height() - 100;

        //todo *****************************************************************************************************************************
        //? TEXT CONTROL
        //todo *****************************************************************************************************************************
        let rectWidth = 0;

        let current_credict = 0; //? max -> 4

        onUpdate(() => {
            if(current_credict == 0){ programmer.hidden = false; } else { programmer.hidden = true; }
            if(current_credict == 1){ animation.hidden = false; } else { animation.hidden = true; }
            if(current_credict == 2){ graphics.hidden = false; } else{ graphics.hidden = true; }
            if(current_credict == 3){ sound.hidden = false; } else{ sound.hidden = true; }
        });

        onDraw(() => {
            drawRect({
                width: width(),
                height: 10,
                pos: vec2(0, height()-10),
                color: rgb(110, 4, 54),
            });

            drawRect({
                width: rectWidth,
                height: 10,
                pos: vec2(0, height()-10),
                color: rgb(204, 14, 103),
            });
        });

        onUpdate(() => {
            rectWidth += 3.7;

            if(rectWidth >= 800){
                current_credict++;
                if(current_credict >= 4){ current_credict = 0; }
                rectWidth = 0;
            }
        })

    }); //? Fin de la escena

}

export default credits;