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

    EMPTY_KEY: 2312525,
    ANSWER_KEY: 13124235,
}

export const myMap = new Map([
    ["1", { x: 490, y: 230, xk: 583, yk: 353, img: 'paper1', key: 'qlqh ', text: "Wkh qhzv uhsruwv duh\njhwwlqj lqfuhdvlqjob\ndoduplqj. Wkh yluxv lv\nvsuhdglqj wrr idvw. Pb\nwhdp ri         dqg L kdyh\nvwduwhg uhvhdufklqj, exw\nhyhq zh fdq'w iljxuh rxw\nzkdw'v jrlqj rq." }],
    ["2", { x: 490, y: 230, xk: 680, yk: 385, img: 'paper1', key: 'wklug ', text: "Zh khdug vfuhdpv dqg\nuhdolchg wkh whvw vxemhfw\nkdg frph wr dqg elw d\nfroohdjxh. L'yh qhyhu ihow\nvxfk whuuru. Zh eduulfdghg\nrxuvhoyhv lq wkh       \ngrfxphqwdwlrq riilfh, exw\nL grq’w wklqn zh fdq krog\nrxw khuh iru orqj." }],
    ["3", { x: 490, y: 230, xk: 683, yk: 293, img: 'paper1', key: 'rqh ', text: "Zh qhhg wr iljxuh rxw krz\nwr vwrs wkh vsuhdg ri wkh\nyluxv! Bhvwhugdb,      \nfroohdjxh vdlg wkdw doo\nhiiruwv duh douhdgb\nsrlqwohvv. Exw L’p qrw jlylqj\nxs krsh." }],
    ["4", { x: 490, y: 230, xk: 638, yk: 385, img: 'paper4', key: '', text: "Irrg vxssolhv duh uxqqlqj\norz. L fdq khdu crpelhv\nvkxiiolqj durxqg rxwvlgh\nwkh zdoov. Hyhub gdb lv\njhwwlqj kdughu. L'p vwduwlqj\nwr orvh krsh." }],
    ["5", { x: 490, y: 230, xk: 489, yk: 292, img: 'paper1', key: 'Wzr ', text: "Vrph whdp phpehuv\nvwduwhg orvlqj wkhlu plqgv.\n        ri wkhp wulhg wr\nhvfdsh lq d ilw ri ghvsdlu,\ndqg d plqxwh odwhu zh khdug \nwkhlu iudqwlf vfuhdpv. Zh\nqhhg wr vwlfn wrjhwkhu." }],
    ["6", { x: 490, y: 230, xk: 638, yk: 385, img: 'paper6', key: '', text: "Zh'uh sxvklqj wkurxjk zlwk\nrxu uhvhdufk. Zh'yh irxqg\nsrwhqwldo lq vdpsohv wkdw\nfrxog eorfn wkh yluxv! Zh\nqhhg wr frqgxfw\nhashulphqwv dv vrrq dv\nsrvvleoh." }],
    ["7", { x: 490, y: 230, xk: 660, yk: 231, img: 'paper7', key: 'irxu ', text: "Wkhuh duh rqob        ri xv\nohiw. L fdq ihho krz ihdu\ndqg sdudqrld duh wdnlqj\nryhu xv. Crpelhv duh\njhwwlqj forvhu." }],
    ["8", { x: 490, y: 230, xk: 638, yk: 385, img: 'paper1', key: '', text: "Li dqbrqh hyhu ilqgv wklv:\nGrq'w jlyh xs. Wkh\nlqirupdwlrq frxog vdyh\nwkh zruog!\nBrx kdyh wr vwrs wklv!" }],
    ["9", { x: 490, y: 230, xk: 644, yk: 292, img: 'paper9', key: 'ilyh ', text: "Dv L zulwh wklv, L fdq khdu\nwkhp jhwwlqj forvhu. L grq’w\nzdqw pb odvw        plqxwhv\nri olih wr eh vshqw lq djrqb;\nlw'v ehwwhu wr wdnh pdwwhuv\nlqwr pb rzq kdqgv.\nIruwxqdwhob, wkhuh'v d orw\nkhuh wkdw fdq khos ph zlwk\nwkdw. Mxvw nqrz wkdw L\nirxjkw xqwlo wkh hqg." }],
    ["answer", { x: 500, y: 320, img: 'paper1', text: "Brx hqwhuhg wkh fruuhfw\nsdvvzrug: 486790\n\nWkh grru lv rshq" }],
    ["wrong", { x: 550, y: 370, img: 'paper1', text: "Zurqj sdvvzrug" }],
    // ["", { x: 410, y: 370, xk: 400, yk: 500, img: 'paper', key: '', text: "" }],
]);