import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";
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
        this.load.image('map', './assets/map/tample_1.jpg');

        this.load.image('red', './assets/collbs/red.png');
        this.load.image('yellow', './assets/collbs/yellow.png');
        this.load.image('green', './assets/collbs/green.png');
        this.load.image('blue', './assets/collbs/blue.png');
        this.load.image('purple', './assets/collbs/purple.png');
        this.load.image('pink', './assets/collbs/pink.png');
        this.load.image('glass', './assets/collbs/glass.png');

        this.load.image('fill1', './assets/collbsFill/fill1.png');
        this.load.image('fill2', './assets/collbsFill/fill2.png');
        this.load.image('fill3', './assets/collbsFill/fill3.png');
        this.load.image('fill4', './assets/collbsFill/fill4.png');

        this.load.image('cursorBack', './assets/cursors/cursorBack.png');
        this.load.image('cursorStoke', './assets/cursors/cursorStoke.png');
        this.load.image('otherPlayerCursor', './assets/joystick/joystick-back.png');

        this.load.image('reset', 'assets/button/reset.png');
        this.load.image('try-again', 'assets/button/try-again.png');
        this.load.image('cancel', 'assets/button/cancel.png');
        this.load.image('board', 'assets/board/board.png');
        this.load.image('generate', 'assets/button/generate.png');
        this.load.image('collbsBack', './assets/board/collbsBack.png');
        this.load.image('boardBack', './assets/board/boardBack.png');

        this.load.image('char1', './assets/character/man1Noback.png');
        this.load.image('char2', './assets/character/man2Noback.png');
        this.load.image('char3', './assets/character/man3Noback.png');
        this.load.image('char4', './assets/character/woman1Noback.png');
        this.load.image('char5', './assets/character/woman2Noback.png');
        this.load.image('char6', './assets/character/woman3Noback.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 140);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 140, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 'fold', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu, 90, 200, this.showFold); this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu, this.showFold);
            this.createPlayers(players, CAMERA_MARGIN);
        }

        //Создаём объект с которыми будем взаимодействовать
        this.createCollision();
        //Создание оверлея
        this.createOverlays();
        this.createFold();
        //Создание слушателей нажатия кнопок
        this.createInputHandlers();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());
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
    }

    sendCursorPositionToServer(x, y) {
        this.mySocket.emitCursorMove({ playerId: this.mySocket.socket.id, x: x, y: y, color: this.selectedColor, character: this.player.character, name: this.player.name });
    }

    syncWithOtherPlayers() {
        this.mySocket.subscribePlayerClosedBoard(this, this.deleteBoardPlayer);

        // Прослушивание переданных сервером данных о курсорах других игроков
        socket.on('cursorMove', (data) => {
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


    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(90 + 824, 746, '813.5 1533 813.5 1621.5 950 1621.5 966 1533 1014 1533 1046.5 1792.5 1 1792.5 1 1 1635.5 1 1635.5 460 1558 508 1400.5 362.5 1413 337.5 1400.5 316.5 1348 337.5 1348 384 1302 433 1285.5 453 1380 508 1423 493 1455.5 533 1447 583 1389.5 598 1322 692 985.5 454 1084 337.5 1229 418.5 1240.5 384 1240.5 351.5 1270.5 316.5 1260.5 282.5 1270.5 220.5 1322 180 1380 180 1380 141.5 1278 148.5 1260.5 158 1031 148.5 1012.5 220.5 961.5 220.5 966.5 120.5 794 120.5 794 189.5 787 232 734 243.5 725.5 158 448 158 469.5 204.5 367.5 270 313 183 259 183 211 249.5 278.5 291 322.5 327.5 284.5 385 329.5 391 337.5 359 433 316.5 459 327.5 475.5 291 598.5 204.5 686 291 547.5 418.5 540 460 404 538.5 380 521.5 337.5 427.5 297.5 454 259 418.5 189.5 469.5 135.5 418.5 152.5 549.5 223 549.5 223 1208 152.5 1208 152.5 1359.5 189.5 1328 223 1345 318 1426.5 216.5 1551.5 333.5 1665 420.5 1678.5 384 1765.5 726.5 1765.5 752 1533 813.5 1533', { isStatic: true }, true)
        this.matter.add.fromVertices(1220 + 387, 870 + 644, '97.5 1100 1.5 1109 19 1287.5 773 1287.5 764.5 0.5 538.5 0.5 562 104 652 70 652 822.5 590 799 590 926 538.5 926 494 958 481 1026 538.5 1079 481 1134 464.5 1091 414.5 1091 385 1122 251 1134 242 1100 194.5 1067.5 221 1026 125.5 946.5 65 1018.5 153.5 1100 184.5 1079 194.5 1147 113.5 1147 97.5 1100', { isStatic: true }, true)
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, this.map.width + cameraMargin.right, this.map.height + cameraMargin.bottom);
            } else {
                this.playersController.createOtherPlayer(this, players[id], this.otherPlayers);
            }
        });
    }

    createCollision() {
        // Создаем графику для подсветки
        const highlightGraphics = this.add.graphics();
        highlightGraphics.lineStyle(2, 0x06ff01, 1);
        highlightGraphics.setDepth(0);

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(937 + 84, 1600, '1 0.5 7.5 151.5 161.5 151.5 166.5 0.5 ', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const firstKey = this.matter.add.fromVertices(509 + 192.5, 1657 + 71.5, '1 116 374.5 141.5 384 1 28.5 1 1 31 1 116', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })

        const secondkey = this.matter.add.fromVertices(1722.5 + 89, 582.5 + 408.5, '37.5 768 177 816 177 1.5 0.5 85 0.5 697 37.5 768', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const shellLeft = this.matter.add.fromVertices(549.5 + 161, 151.5 + 65.5, '1.5 0.5 48.5 130.5 321 130.5 293 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        const shellRight = this.matter.add.fromVertices(1170 + 141, 148.5 + 63.5, '14 0.5 1.5 126 228.5 126 280.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        const table = this.matter.add.fromVertices(289.5 + 47, 639 + 342.5, '93 684 0.5 684 0.5 1 93 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const tableRight = this.matter.add.fromVertices(1113 + 230.5, 413 + 198, '1 144 120 1 459.5 240 359 394.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, firstKey, secondkey, shellLeft, shellRight, table, tableRight];


        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = true;
                this.eventZone = Number(eventData.bodyB.label);

                // Подсвечиваем границы зоны
                const vertices = eventData.bodyB.vertices;
                highlightGraphics.beginPath();
                highlightGraphics.moveTo(vertices[0].x, vertices[0].y);
                for (let i = 1; i < vertices.length; i++) {
                    highlightGraphics.lineTo(vertices[i].x, vertices[i].y);
                }
                highlightGraphics.closePath();
                highlightGraphics.strokePath();
            },
            context: this
        });

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = false;
                this.eventZone = null;

                highlightGraphics.clear();
            },
            context: this
        });
    }

    createOverlays() {
        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false);

        //задний фон оверлея
        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.firstKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'firstKey');
        this.firstKey.setScale(0.5);
        this.firstKey.setVisible(false);
        this.firstKey.setDepth(2);
        this.firstKey.setScrollFactor(0);
        this.firstKey.setAlpha(0);

        this.secondkey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'secondKey');
        this.secondkey.setScale(0.5);
        this.secondkey.setVisible(false);
        this.secondkey.setDepth(2);
        this.secondkey.setScrollFactor(0);
        this.secondkey.setAlpha(0);

        this.emptyKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyKey');
        this.emptyKey.setVisible(false);
        this.emptyKey.setDepth(2);
        this.emptyKey.setScrollFactor(0);
        this.emptyKey.setAlpha(0);

        this.closeButton = this.add.image(this.cameras.main.width - 200, 85, 'closeIcon');
        this.closeButton.setDisplaySize(50, 50);
        this.closeButton.setInteractive();
        this.closeButton.setVisible(false);
        this.closeButton.setDepth(2);
        this.closeButton.setScrollFactor(0);
        this.closeButton.setAlpha(0); // Начальное значение прозрачности

        this.closeButton.on('pointerdown', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    try {
                        this.hideOverlay();
                    }
                    catch (e) { }
                }
            });
        });
    }

    createInputHandlers() {
        this.input.keyboard.on('keydown-X', () => {
            if (this.foldKeys.visible) return;

            if (this.isInZone) {
                this.player.setVelocity(0);

                if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                    // this.moveForwardRoom();
                    this.openBoard();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.firstKey, this.secondkey, this.emptyKey],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            try {
                                this.hideOverlay();
                            } catch (e) { }

                        }
                    });
                }
            }
        });
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1800);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.firstKey.setVisible(true);
            if (this.fold.indexOf(this.firstKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.firstKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondkey.setVisible(true);
            if (this.fold.indexOf(this.secondkey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.secondkey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.emptyKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.firstKey.visible) this.firstKey.setVisible(false);
        if (this.secondkey.visible) this.secondkey.setVisible(false);
        if (this.emptyKey.visible) this.emptyKey.setVisible(false);

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    loadedResolutionMap(name, scaleX, scaleY) {
        this.map.setScale(scaleX, scaleY);

        this.map.setTexture(name);
        this.matter.world.setBounds(0, 0, this.map.width * scaleX, this.map.height * scaleY);
    }

    itemInteract(context) {
        if (context.foldKeys.visible) return;
        if (context.isInZone) {
            context.player.setVelocity(0);

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveForwardRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.emptyKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.firstKey, context.secondkey, context.emptyKey],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        try {
                            context.hideOverlay();
                        } catch (e) { }

                    }
                });
            }
        }
    }


    update() {
        super.update();
    }
}