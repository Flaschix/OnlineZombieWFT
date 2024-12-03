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
    DOOR_BACK_ID: 111143444,

    FIRST_KEY: 33333333,
    SECOND_KEY: 44444444,
    THIRD_KEY: 55555555,
    FOURTH_KEY: 6666666,
    FIVETH_KEY: 7777777,
    SIXETH_KEY: 8888888,
    SEVENTH_KEY: 9999999,
    EIGHTH_KEY: 33332245,
    NINETH_KEY: 82342424,
    TENTH_KEY: 82342134,

    EMPTY_KEY: 2312525,

    BOARD_KEY: 624234252,
}

export const myMap = new Map([
    ["1", { x: 450, y: 350, xt: 440, yt: 310, img: 'paper1', title: 'Ehdnhu 1:', text: "• \"Eoxh pxvw frph diwhu uhg.\"\n• \"Bhoorz lv lq wkh wklug srvlwlrq.\"\n• \"Juhhq fdq’w eh iluvw.\"" }],
    ["2", { x: 450, y: 330, xt: 440, yt: 290, img: 'paper1', title: 'Ehdnhu 2:', text: '• "Sxusoh lv ehiruh bhoorz."\n• "Slqn fdq’w eh iluvw ru odvw."\n• "Eoxh dqg uhg duh qrw lq wkh\nvhfrqg ehdnhu."' }],
    ["3", { x: 450, y: 300, xt: 440, yt: 270, img: 'paper1', title: 'Ehdnhu 3:', text: '• "Juhhq fdq\'w eh odvw ru\nvhfrqg wr odvw."\n• "Bhoorz lv qrw lq wklv ehdnhu."\n• "Uhg kdv wr eh vrphzkhuh lq\nkhuh, exw qrw qhaw wr sxusoh."\n• "Eoxh lv lq wkh wklug srvlwlrq."' }],
    ["4", { x: 440, y: 290, xt: 430, yt: 250, img: 'paper1', title: 'Ehdnhu 4:', text: '• "Slqn wdnhv xs wzr vsrwv, exw\nwkhb fdq\'w eh qhaw wr hdfk rwkhu."\n• "Bhoorz fdq\'w eh lq wkh iluvw, wklug,\nru irxuwk srvlwlrq."\n• "Eoxh wdnhv wkh vhfrqg wr odvw\nvsrw."\n• "Juhhq lv qrw lq wklv ehdnhu."' }],
    ["5", { x: 450, y: 310, xk: 550, yk: 292, img: 'paper5', title: '', text: 'Rog qrwh:\n"L ohiw brxu idyrulwh friihh rq\nwkh wdeoh. Zdqw wr jude oxqfk\nwrjhwkhu wrpruurz? ;)"' }],
    ["6", { x: 430, y: 280, xk: 638, yk: 385, img: 'paper5', title: '', text: 'Whvw uhvxowv:\n"Dq deqrupdoob kljk qxpehu ri\nzklwh eorrg fhoov zdv uhfrughg lq\nwkh vxemhfw\'v eorrg, wkh eudlq lv\ndiihfwhg, dqg wkhuh lv qr\nkhduwehdw."' }],
    ["7", { x: 420, y: 280, xk: 660, yk: 232, img: 'paper5', title: '', text: 'Dq rog idplob skrwr.\nWkh lqvfulswlrq rq wkh edfn uhdgv:\n“Ohw wklv kdssb prphqw dozdbv\neh zlwk brx: brx, ph, dqg rxu\nolwwoh rqh. Orrn dw wkh skrwr riwhq\ndqg vploh :)”' }],
    ["8", { x: 450, y: 300, xk: 638, yk: 385, img: 'paper5', title: '', text: 'D eurnhq plfurvfrsh.\nEhiruh lw zdv xvhg iru juhdw\nglvfryhulhv, exw qrz lw’v\nirujrwwhq dqg shukdsv zloo eh\niruhyhu.' }],
    ["9", { x: 440, y: 320, xk: 490, yk: 324, img: 'paper5', title: '', text: 'Rog vbulqjh.\nBrx fdq vhh gulhg eorrg lqvlgh.\nEh fduhixo, zkr nqrzv zkrvh\neorrg wklv lv...' }],
    ["10", { x: 460, y: 330, xk: 490, yk: 324, img: 'paper5', title: '', text: 'Hpsorbhh Fdug:\nMrkq Grh, Khdg ri Elrorjlfdo \nUhvhdufk Ghsduwphqw' }],
    ["answer", { x: 460, y: 280, xk: 490, yk: 324, img: 'paper5', title: '', text: 'Frqjudwxodwlrqv!\n\nBrx\'yh vxffhvvixoob fuhdwhg d\nydfflqh djdlqvw wkh yluxv.\n\nFrgh zrug: VXUY' }],

    // ["", { x: 410, y: 370, xk: 400, yk: 500, img: 'paper', key: '', text: '' }],
]);