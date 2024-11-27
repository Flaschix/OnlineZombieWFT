import { CST, LABEL_ID, myMap } from "../CST.mjs";
import { Colors } from "../share/Colors.mjs";


import { createUILeftMobile } from "../share/UICreator.mjs";
import { createUI } from "../share/UICreator.mjs";
import { createAvatarDialog } from "../share/UICreator.mjs";
import { isMobile } from "../share/UICreator.mjs";
import { CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";

import { createJoystick } from "../share/UICreator.mjs";
import { createMobileXButton } from "../share/UICreator.mjs";

import { BaseScene } from "./BaseScene.mjs";

export class GameScene extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE);

        this.otherCursors = {};
        this.selectedColor = Colors.WHITE;

        this.fillArr = [];
        this.glasses = null;

        this.answerOverlay = false;
    }

    preload() {
        super.preload();

        //map
        this.load.image('map', './assets/map/map1.jpg');

    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map');

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

    createUnWalkedObjects() {
        this.matter.add.fromVertices(784, 868, '69 948 78 1819 728 1824.5 728 1815 647.5 1734.5 620 1787.5 518.5 1731.5 541 1672 604.5 1690.5 532 1605.5 649 1532.5 823.5 1724 823.5 1739.5 735.5 1819 1053.5 1819 1053.5 1869.5 1 1869.5 1 1 1944.5 1 1944.5 483.5 1820 483.5 1820 234 1637 234 1637 218.5 1540 218.5 1552.5 116 1036.5 128 1040.5 79 839 79 839 128 610.5 123.5 684.5 230.5 704.5 211.5 762.5 198.5 782.5 275.5 715.5 296.5 704.5 275.5 567 309.5 533 343.5 498 381 458 381 425 303 498 275.5 517.5 309.5 546 296.5 491 123.5 76.5 123.5 69 810.5 214 810.5 214 1007.5 239.5 1019.5 239.5 1113 214 1124 140.5 1124 123 1105.5 123 1033 147 1019.5 147 948 69 948', { isStatic: true }, true)
        this.matter.add.fromVertices(1595, 1694, '116.5 1341 0.5 1341 0.5 1398 911.5 1406.5 911.5 0.5 819.5 0.5 819.5 585.5 797 611 790 645 797 659 797 729.5 819.5 740.5 824.5 1339.5 483.5 1331 471.5 1323.5 370 1331 179.5 1337 175 1311 191.5 1256 185 1211 130 1196.5 99 1202.5 91.5 1276 104.5 1303.5 116.5 1341', { isStatic: true }, true)

        this.matter.add.fromVertices(1420 + 68, 1502 + 70, '29.5 114 0.5 89 0.5 71 16.5 64 25 50.5 52 11 65 1 108 23 131 44.5 135 55 135 71 112 108.5 91 135.5 74.5 132.5 70.5 139.5 29.5 114', { isStatic: true }, true)
        this.matter.add.fromVertices(1514 + 67, 852 + 172, '1 281 20.5 237.5 33 229 49 231.5 69.5 231.5 85.5 241.5 117.5 256.5 120 108 96.5 108 96.5 175.5 85.5 187.5 58.5 192.5 29.5 178.5 12 178.5 6 168 6 108 12 102 35 102 35 90.5 12 83 12 17 20.5 10 38 4.5 77 0.5 110 0.5 120 10 134.5 4.5 134.5 328 117.5 328 117.5 297.5 112.5 297.5 85.5 343 20.5 315.5 1 309 1 281', { isStatic: true }, true)
        this.matter.add.fromVertices(1679 + 56, 637 + 53, '111 78 111 22 90.5 15 66.5 7.5 37 1 20.5 7.5 16.5 87.5 1 90.5 4.5 99 45.5 106 83.5 106 100 90.5 111 78', { isStatic: true }, true)
        this.matter.add.fromVertices(620 + 108, 1430 + 103, '129.5 6 1 136.5 24.5 173.5 62.5 204.5 149.5 121 169.5 141.5 216 90.5 216 74 154.5 6 142 1.5 129.5 6', { isStatic: true }, true)

        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(899.5 + 115.5, 117 + 78, '1.5 1 19 155.5 216 155.5 230 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const box1 = this.matter.add.fromVertices(1648.5 + 109, 848 + 165.5, '0.5 330 0.5 1 217 1 217 330', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(113.5 + 68.5, 1531 + 140.5, '107 279.5 1.5 259 32 1 136 14.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1436 + 58.5, 1852 + 51.5, '12 101.5 1 12 100.5 1.5 115.5 90', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(1708 + 86.5, 1266 + 87.5, '27 39.5 69 1.5 172 81 104 174 1 81', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box6 = this.matter.add.fromVertices(1195.5 + 177, 216.5 + 122, '1.5 237.5 9 0.5 353.5 6 353.5 211.5 341 243', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(552 + 122.5, 244.5 + 135.5, '91.5 270 1 23 170.5 1.5 243.5 212.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(153 + 89, 265 + 165, '1 329 1 0.5 176.5 0.5 170 329', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(182 + 99.5, 875.5 + 131, '1 258 198 258 198 0.5 1 4', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1685 + 115, 374 + 95, '1 189 1 19 26 1 228.5 4.5 223 189', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1866.5 + 65, 1576.5 + 161.5, '129.5 0.5 0.5 0.5 0.5 306 30 317 129.5 322', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, box1, box2, box4, box5, box6, box7, box8, box9, box10, box11];


        const box3 = this.matter.add.fromVertices(1128 + 167, 1466 + 149.5, '184.5 184 17 184 1 202 1 273.5 11.5 298 327.5 298 333 13.5 309.5 0.5 184.5 0.5', {
            label: `${LABEL_ID.BOARD_KEY}`,
            isStatic: true,
        })
        box3.form = '184.5 184 17 184 1 202 1 273.5 11.5 298 327.5 298 333 13.5 309.5 0.5 184.5 0.5';

        const arrBodiesDiff = [box3];

        this.createSimpleCollision(arrBodies, arrBodiesDiff)
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1940);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            const key = '1';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.SECOND_KEY) {
            const key = '5';
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
}