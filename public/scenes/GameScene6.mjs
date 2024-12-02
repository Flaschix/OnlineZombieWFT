import { CST, LABEL_ID } from "../CST.mjs";
import { Colors } from "../share/Colors.mjs";

import { createUILeftMobile } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene6 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE6);
    }

    preload() {
        super.preload();

        //map
        this.load.image('map6', './assets/map/map6.jpg');


        this.otherCursors = {};
        this.selectedColor = Colors.WHITE;

        this.fillArr = [];
        this.glasses = null;

        this.answerOverlay = false;
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map6');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 140);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 140, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 'fold', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu, 90, 200, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN);
        }

        this.createCollision();
        this.createOverlays();
        this.createInputHandlers();
        this.createFold();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());
    }

    update() {
        super.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(1126, 880, '42 1371 904.5 1371 904.5 1428 1 1428 1 1 1496.5 9.5 1496.5 579.5 1404 579.5 1404 539.5 1389 511.5 1358.5 511.5 1332.5 496 1292 480 1265 457.5 1278.5 427 1315 383.5 1344.5 360 1389 360 1437 360 1428.5 303 1265 303 1258 230 1232 237.5 1206 230 1187.5 210.5 1174.5 221 1038.5 221 1033 230 1102 278.5 1048.5 373 968.5 303 1003.5 243.5 1021 221 937 221 937 106.5 902.5 106.5 902.5 70.5 583 70.5 583 112.5 387 112.5 387 262 248.5 262 226.5 273 187 325 144 364 103.5 376.5 42 1371', { isStatic: true }, true);
        this.matter.add.fromVertices(1290 + 338, 1170 + 430, '641 796.5 0.5 801 0.5 859.5 675.5 851.5 675.5 0.5 609.5 0.5 609.5 248 506 248 483.5 376 495.5 552 627 552 641 796.5', { isStatic: true }, true);

        this.matter.add.fromVertices(488 + 22, 1636.5 + 36, '0.5 16 0.5 55 20 70.5 43 55 38.5 16 20 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(358 + 125, 872 + 86.5, '4 125.5 4 78.5 1.5 63 249 1 249 44 210.5 63 169 38.5 111 65.5 111 147.5 67 171.5 29 151 29 83 9.5 74 9.5 125.5 4 125.5', { isStatic: true }, true);

        // this.matter.add.fromVertices(, { isStatic: true }, true);
    }

    createCollision() {
        const bodyDoorBack = this.matter.add.fromVertices(864.5 + 137.5, 1857 + 37.5, '0.5 1 0.5 74 274.5 74 274.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(822 + 162.5, 300.5 + 186.5, '1 0.5 1 372.5 324.5 372.5 324.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const box5 = this.matter.add.fromVertices(393 + 72.5, 1448 + 85.5, '85.5 169.5 3.5 125.5 0.5 48.5 27 33.5 20.5 26.5 67 1.5 76.5 8 71 23 144.5 58.5 144.5 139', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box5.form = '85.5 169.5 3.5 125.5 0.5 48.5 27 33.5 20.5 26.5 67 1.5 76.5 8 71 23 144.5 58.5 144.5 139';


        const box8 = this.matter.add.fromVertices(1316 + 94, 1578 + 81.5, '1 54 1 114.5 49.5 139 49.5 111.5 65 119 77.5 114.5 77.5 101.5 133.5 126 133.5 162 142.5 159.5 142.5 139 179 122 179 141.5 187.5 139 187.5 92 125 58.5 122.5 39 90.5 30.5 90.5 21.5 53.5 1 22 18.5 25.5 42', {
            label: `${LABEL_ID.TENTH_KEY}`,
            isStatic: true,
        })

        box8.form = '1 54 1 114.5 49.5 139 49.5 111.5 65 119 77.5 114.5 77.5 101.5 133.5 126 133.5 162 142.5 159.5 142.5 139 179 122 179 141.5 187.5 139 187.5 92 125 58.5 122.5 39 90.5 30.5 90.5 21.5 53.5 1 22 18.5 25.5 42'

        const box9 = this.matter.add.fromVertices(1250 + 102.5, 984 + 91, '135.5 180.5 119.5 175 119.5 140.5 49 97 13.5 117.5 6.5 114.5 6.5 65 1 54.5 63 20 58 9.5 63 1.5 73.5 6 70.5 20 163.5 75 163.5 58.5 185.5 58.5 193 70.5 185.5 89 204.5 97 204.5 104 185.5 112 185.5 153.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box9.form = '135.5 180.5 119.5 175 119.5 140.5 49 97 13.5 117.5 6.5 114.5 6.5 65 1 54.5 63 20 58 9.5 63 1.5 73.5 6 70.5 20 163.5 75 163.5 58.5 185.5 58.5 193 70.5 185.5 89 204.5 97 204.5 104 185.5 112 185.5 153.5'


        const box11 = this.matter.add.fromVertices(395 + 131.5, 844 + 73, '1 115.5 1 101 192.5 1 201.5 1 262.5 34 262.5 45.5 72 145.5 57 145.5', {
            label: `${LABEL_ID.BOARD_KEY}`,
            isStatic: true,
        })

        box11.form = '1 115.5 1 101 192.5 1 201.5 1 262.5 34 262.5 45.5 72 145.5 57 145.5';

        const arrBodies = [bodyDoorBack, box1];



        const arrBodiesDiff = [box11, box5, box8, box9];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        // this.isInZone = false;
        // this.eventZone = null;
        // this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1800);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 670);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.TENTH_KEY) {
            const key = '10';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.imgKey.setTexture('emptyKey')
            this.imgKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false

        this.imgKey.setVisible(false);
        this.imgTitle.setVisible(false);
        this.imgText.setVisible(false);
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }



















    openBoard() {
        this.boardBack = this.add.image(this.cameras.main.width / 2 + 40, this.cameras.main.height / 2, 'boardBack').setScale(1.25, 1.3).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.collbsBack = this.add.image(this.cameras.main.width / 2 + 40, this.cameras.main.height * 0.85, 'collbsBack').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.board = this.add.image(this.cameras.main.width / 2 + 40, this.cameras.main.height * 0.4, 'board').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.boardTitle = this.add.text(this.cameras.main.width / 2 - 120, 50, 'Lab table No. 1', { font: "bold 50px Handlee", fill: '#5568FE' }).setScrollFactor(0).setDepth(4);

        this.boardCloseButton = this.add.image(this.cameras.main.width - 80, 60, 'closeIcon').setScrollFactor(0).setDepth(4).setInteractive().on('pointerdown', () => {
            this.mySocket.emitCloseBoard();
            this.closeBoard();
        });

        this.resetBtn = this.add.image(this.cameras.main.width * 0.5 + 250, this.cameras.main.height / 2 + 135, 'reset').setScale(0.8).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.generateBtn = this.add.image(this.cameras.main.width * 0.5 - 150, this.cameras.main.height / 2 + 135, 'generate').setScale(0.8).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);


        this.glass1 = this.add.image(450, this.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass2 = this.add.image(620, this.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass3 = this.add.image(790, this.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass4 = this.add.image(960, this.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.createFills(450);
        this.createFills(620);
        this.createFills(790);
        this.createFills(960);

        this.mySocket.subscribeExistedGlasses(this, this.fillGlasses);
        this.mySocket.emitGetGlasses();

        this.createColors();

        this.initCursors();
        this.syncWithOtherPlayers();
    }


    fillGlasses(data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] != null) {
                    this.fillArr[i][j].isColor = true;
                    this.fillArr[i][j].setTintFill(data[i][j]);
                }
            }
        }

        this.setUpGlass(this.glass1, 0);
        this.setUpGlass(this.glass2, 1);
        this.setUpGlass(this.glass3, 2);
        this.setUpGlass(this.glass4, 3);

        this.setUpResetBtn();
        this.setUpGenerateBtn();

        this.mySocket.subscribeColoredGlass(this, this.colorGlass);
        this.mySocket.subscribeResetedGlasses(this, this.resetGlasses);
        this.mySocket.subscribeAnswer(this, this.answerResult);
    }



    answerResult(data) {
        if (data) {
            this.showSuccess();
        } else {
            this.showError();
        }
    }

    showSuccess() {
        console.log('win');
    }

    showError() {
        this.answerOverlay = true;
        if (this.errorTitle != null) this.closeError();

        this.errorGraphics = this.add.graphics();

        this.errorGraphics.setScrollFactor(0).setDepth(5)
        this.errorGraphics.fillStyle(0x221C3E, 1);
        this.errorGraphics.lineStyle(4, 0xF2F0FF, 1);

        const x = 400;
        const y = 180;
        const width = 600;
        const height = 350;
        const radius = 20;

        this.errorGraphics.strokeRoundedRect(x, y, width, height, radius);
        this.errorGraphics.fillRoundedRect(x, y, width, height, radius);

        this.errorTitle = this.add.text(550, 230, 'Incorrect answer', { font: "bold 40px Handlee", fill: '#FF4445' }).setScrollFactor(0).setDepth(5);

        this.btnTryAgain = this.add.image(700, 350, 'try-again').setScale(1).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);

        this.btnTryAgain.setInteractive().on('pointerdown', () => {
            this.mySocket.emitResetGlasses();
            this.closeError();
        });

        this.btnCancel = this.add.image(700, 450, 'cancel').setScale(1).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);

        this.btnCancel.setInteractive().on('pointerdown', () => {
            this.closeError();
        });
    }

    closeError() {
        this.errorTitle.destroy();
        this.errorGraphics.clear();
        this.errorGraphics.destroy();
        this.btnTryAgain.destroy();
        this.btnCancel.destroy();
        this.answerOverlay = false;
    }

    colorGlass(data) {
        const item = this.fillArr[data.glass][data.fill]
        item.isColor = true;
        item.setTintFill(data.color);
    }

    createFills(x) {
        const fill1 = this.add.image(x - 1, this.cameras.main.height / 2 + 70 - 86, 'fill1').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill2 = this.add.image(x - 1, this.cameras.main.height / 2 + 36 - 86, 'fill2').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill3 = this.add.image(x - 1, this.cameras.main.height / 2 + 4 - 86, 'fill3').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill4 = this.add.image(x - 1, this.cameras.main.height / 2 - 33 - 86, 'fill4').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        fill1.isColor = false;
        fill2.isColor = false;
        fill3.isColor = false;
        fill4.isColor = false;

        this.fillArr.push([fill1, fill2, fill3, fill4]);
    }

    setUpGlass(glass, number) {
        glass.setInteractive().on('pointerdown', () => {
            if (this.answerOverlay || this.selectedColor == Colors.WHITE) return;
            for (let i = 0; i < this.fillArr[number].length; i++) {
                let item = this.fillArr[number][i];
                if (!item.isColor) {
                    this.mySocket.emitColorGlass({ glass: number, fill: i, color: this.selectedColor });
                    break;
                }
            }
        });
    }

    setUpResetBtn() {
        this.resetBtn.setInteractive().on('pointerdown', () => {
            if (this.answerOverlay) return;
            this.mySocket.emitResetGlasses();
        });
    }

    setUpGenerateBtn() {
        this.generateBtn.setInteractive().on('pointerdown', () => {
            if (this.answerOverlay) return;
            this.mySocket.emitAnswer();
        });
    }

    createColors() {
        this.red = this.add.image(this.cameras.main.width / 2 - 320, this.cameras.main.height - 107, 'red').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.yellow = this.add.image(this.cameras.main.width / 2 - 176, this.cameras.main.height - 107, 'yellow').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.green = this.add.image(this.cameras.main.width / 2 - 32, this.cameras.main.height - 107, 'green').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.blue = this.add.image(this.cameras.main.width / 2 + 112, this.cameras.main.height - 107, 'blue').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.purple = this.add.image(this.cameras.main.width / 2 + 256, this.cameras.main.height - 107, 'purple').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.pink = this.add.image(this.cameras.main.width / 2 + 400, this.cameras.main.height - 107, 'pink').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.colorStoke = this.add.graphics();
        this.colorStoke.setScrollFactor(0);
        this.colorStoke.setDepth(5);

        this.setUpColor(this.red, Colors.RED);
        this.setUpColor(this.yellow, Colors.YELLOW);
        this.setUpColor(this.green, Colors.GREEN);
        this.setUpColor(this.blue, Colors.BLUE);
        this.setUpColor(this.purple, Colors.PURPLE);
        this.setUpColor(this.pink, Colors.PINK);
    }

    setUpColor(colorItem, color) {
        colorItem.setInteractive().on('pointerdown', () => {
            if (this.selectedColor == color) {
                this.selectedColor = Colors.WHITE;
                this.colorStoke.clear();
                this.cursorStoke.clearTint();
            } else {
                this.colorStoke.clear();
                this.colorStoke.lineStyle(5, 0xDADE2A, 1);
                this.colorStoke.strokeCircle(colorItem.x, colorItem.y, colorItem.displayWidth / 2);
                this.selectedColor = color;

                this.cursorStoke.setTintFill(color);

            }
        });
    }

    resetGlasses(data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] != null) {
                    this.fillArr[i][j].isColor = true;
                    this.fillArr[i][j].setTintFill(data[i][j]);
                } else {
                    this.fillArr[i][j].isColor = false;
                    this.fillArr[i][j].clearTint();
                }
            }
        }
    }

    initCursors() {
        this.cursorImage = this.add.image(-100, -100, 'cursorBack').setOrigin(0.2, 0.2).setScale(0.7).setDepth(6).setScrollFactor(0);
        this.cursorPlayerImg = this.add.image(-100, -100, `char${this.player.character}`).setOrigin(-0.55, -0.6).setScale(0.8).setDepth(6).setScrollFactor(0);;
        this.cursorStoke = this.add.image(-100, -100, 'cursorStoke').setOrigin(0.15, 0.05).setScale(0.7).setDepth(6).setScrollFactor(0);
        this.cursorName = this.add.text(-100, -100, `${this.player.name}`, { font: "bold 12px Handlee", fill: '#FFFFFF', align: 'center' }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(6);

        this.game.canvas.style.cursor = 'none';

        this.input.on('pointermove', (pointer) => {
            this.cursorImage.setPosition(pointer.x, pointer.y);
            this.cursorPlayerImg.setPosition(pointer.x, pointer.y);
            this.cursorStoke.setPosition(pointer.x, pointer.y);
            this.cursorName.setPosition(pointer.x + 25, pointer.y + 10);
            this.sendCursorPositionToServer(pointer.x, pointer.y);
        });

        if (this.mobileFlag) {
            this.input.on('pointerdown', (pointer) => {
                this.cursorImage.setPosition(pointer.x, pointer.y);
                this.cursorPlayerImg.setPosition(pointer.x, pointer.y);
                this.cursorStoke.setPosition(pointer.x, pointer.y);
                this.cursorName.setPosition(pointer.x + 25, pointer.y + 10);
                this.sendCursorPositionToServer(pointer.x, pointer.y);
            });
        }
    }

    sendCursorPositionToServer(x, y) {
        this.mySocket.emitCursorMove({ playerId: this.mySocket.socket.id, x: x, y: y, color: this.selectedColor, character: this.player.character, name: this.player.name });
    }

    syncWithOtherPlayers() {
        this.mySocket.subscribePlayerClosedBoard(this, this.deleteBoardPlayer);

        // Прослушивание переданных сервером данных о курсорах других игроков
        this.mySocket.socket.on('cursorMove', (data) => {
            if (!this.otherCursors[data.playerId]) {
                // Создать курсор для нового игрока
                this.otherCursors[data.playerId] = {};
                this.otherCursors[data.playerId].cursor = this.add.image(data.x, data.y, 'cursorBack').setOrigin(0.2, 0.2).setDepth(4).setScale(0.7).setScrollFactor(0);
                this.otherCursors[data.playerId].cursorImg = this.add.image(data.x, data.y, `char${data.character}`).setOrigin(-0.55, -0.6).setScale(0.7).setDepth(4).setScrollFactor(0);
                this.otherCursors[data.playerId].cursorStoke = this.add.image(data.x, data.y, 'cursorStoke').setOrigin(0.15, 0.05).setScale(0.7).setDepth(4).setScrollFactor(0).setTintFill(data.color);
                this.otherCursors[data.playerId].cursorName = this.add.text(data.x + 25, data.y + 10, `${data.name}`, { font: "bold 12px Handlee", fill: '#FFFFFF', align: 'center' }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
                this.otherCursors[data.playerId].color = data.color;
            } else {
                const cursor = this.otherCursors[data.playerId].cursor;
                const cursorImg = this.otherCursors[data.playerId].cursorImg
                const cursorName = this.otherCursors[data.playerId].cursorName
                const stoke = this.otherCursors[data.playerId].cursorStoke

                if (this.otherCursors[data.playerId].color != data.color) {
                    this.otherCursors[data.playerId].color = data.color;
                    stoke.setTintFill(data.color);
                }

                this.tweens.add({
                    targets: [cursor, cursorImg, stoke],
                    x: data.x,
                    y: data.y,
                    duration: 200,
                });

                this.tweens.add({
                    targets: [cursorName],
                    x: data.x + 25,
                    y: data.y + 10,
                    duration: 200,
                });
            }
        });
    }

    deleteBoardPlayer(id) {
        if (this.otherCursors[id]) {
            console.log(this.otherPlayers);
            this.otherCursors[id].cursor.destroy();
            this.otherCursors[id].cursorImg.destroy();
            this.otherCursors[id].cursorStoke.destroy();
            this.otherCursors[id].cursorName.destroy();
            this.otherCursors[id].color = null;
            delete this.otherCursors[id]
            console.log(this.otherPlayers);
        }
    }

    closeBoard() {
        this.mySocket.unSubscribeBoard();

        // Отключение отслеживания курсора
        this.input.off('pointermove');
        this.game.canvas.style.cursor = 'default';
        this.clearOtherCursors();
        this.clearPlayerCursor();

        this.boardBack.destroy();

        this.collbsBack.destroy();

        this.board.destroy();

        this.boardTitle.destroy();

        this.boardCloseButton.destroy();

        this.resetBtn.destroy();
        this.generateBtn.destroy();


        this.glass1.destroy();
        this.glass2.destroy();
        this.glass3.destroy();
        this.glass4.destroy();

        this.clearFills();
        this.clearColors();
    }

    clearOtherCursors() {
        // Пройтись по всем элементам объекта
        for (let playerId in this.otherCursors) {
            if (this.otherCursors.hasOwnProperty(playerId)) {
                this.otherCursors[playerId].cursor.destroy();
                this.otherCursors[playerId].cursorImg.destroy();
                this.otherCursors[playerId].cursorStoke.destroy();
                this.otherCursors[playerId].cursorName.destroy();
            }
        }

        // Очистить объект
        this.otherCursors = {};
    }

    clearPlayerCursor() {
        this.cursorImage.destroy();
        this.cursorPlayerImg.destroy();
        this.cursorStoke.destroy();
        this.cursorName.destroy();
    }

    clearFills() {
        this.fillArr.forEach(fills => {
            fills.forEach(fill => {
                fill.destroy();
            });
        });

        this.fillArr = [];
    }

    clearColors() {
        this.red.destroy();
        this.yellow.destroy();
        this.green.destroy();
        this.blue.destroy();
        this.purple.destroy();
        this.pink.destroy();

        this.colorStoke.clear();
        this.colorStoke.destroy();
    }
}