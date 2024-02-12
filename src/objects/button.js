
function button(options = {
    btnSprite: 'buttonLarge',
    btnText: 'Button',
    btnTextColor: rgb(0, 0, 0),
    btnTextSize: 24,
    pos: vec2(0, 0),
    offset: vec2(0, 0),
    onClickEvent: () => {},
    sound: 'click',
    soundVolume: 0.3,
    parent: null
}){
        if(options.btnSprite == undefined) options.btnSprite = 'buttonLarge';
        if(options.btnText == undefined) options.btnText = 'Button';
        if(options.btnTextSize == undefined) options.btnTextSize = 32;
        if(options.pos == undefined) options.pos = vec2(0, 0);
        if(options.offset == undefined) options.offset = vec2(2, -8);
        if(options.sound == undefined) options.sound = 'click';
        if(options.soundVolume == undefined) options.soundVolume = 0.3;
        if(options.onClickEvent == undefined) options.onClickEvent = () => {
            play('click', { volume: options.soundVolume });
        };
        if(options.btnTextColor == undefined) options.btnTextColor = rgb(0, 0, 0);

        if(options.parent == undefined){
            const btn = add([
                sprite(options.btnSprite),
                pos(),
                area(),
                fixed(),
            ]);

            const btnText = btn.add([
                text(options.btnText, {
                    font: 'kfuture',
                    size: options.btnTextSize,
                }),
                pos(),
                area(),
            ]);

            const tx = (btn.width/2) - (btnText.width/2);
            const ty = (btn.height/2) - (btnText.height/2);

            btnText.pos.x = (tx + options.offset.x);
            btnText.pos.y = (ty + options.offset.y);

            btn.onClick(() => {
                play(options.sound, {
                    volume: options.soundVolume
                });
                options.onClickEvent();
            });

            return btn;
        }else{
            const btn = parent.add([
                sprite(options.btnSprite),
            ]);

            return btn;
        }

}

export default button;