export const CST = {
    SCENE: {
        LOADINGSCENE: "LoadingScene",
        LOBBYSCENE: "LobbyScene",
        GAMESCENE: "GameScene",
        GAMESCENE2: "GameScene2",
        GAMESCENE3: "GameScene3",
        GAMESCENE4: "GameScene4",
        GAMESCENE5: "GameScene5",
        GAMESCENE6: "GameScene6"
    }
}

export const socket = io();

export const LABEL_ID = {
    DOOR_FORWARD_ID: 11111111,
    DOOR_BACK_ID: 22222222,

    PLACE_KEY_1: 333333331,
    PLACE_KEY_2: 333333332,
    PLACE_KEY_3: 333333333,
    PLACE_KEY_4: 333333334,
    PLACE_KEY_5: 333333335,
}

export const myMap = new Map([
    ['place', { x: 430, y: 310, text: 'Кажется, здесь должен\nстоять энергоблок' }],
    ['door', { x: 440, y: 270, text: 'Чтобы включить\nэлектричество,\nрасставьте правильно\nвсе энергоблоки' }],
    ['answer', { x: 500, y: 290, text: 'Ею фтугелолфя!\nНсзсеси фосес:\n\noxplhuh' }],
])