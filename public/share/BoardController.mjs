import { Colors } from "./Colors.mjs";

export class BoardController {
    constructor(scene, socket, successCallback) {
        this.scene = scene;
        this.socket = socket;

        this.otherCursors = {};
        this.selectedColor = Colors.WHITE;

        this.fillArr = [];
        this.glasses = null;

        this.answerOverlay = false;

        this.boardFlag = false;

        this.successCallback = successCallback;
    }


    openBoard() {
        this.scene.isOverlayVisible = true
        this.boardFlag = true;

        this.boardBack = this.scene.add.image(this.scene.cameras.main.width / 2 + 40, this.scene.cameras.main.height / 2, 'boardBack').setScale(1.25, 1.3).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.collbsBack = this.scene.add.image(this.scene.cameras.main.width / 2 + 40, this.scene.cameras.main.height * 0.85, 'collbsBack').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.board = this.scene.add.image(this.scene.cameras.main.width / 2 + 40, this.scene.cameras.main.height * 0.4, 'board').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.boardTitle = this.scene.add.text(this.scene.cameras.main.width / 2 - 120, 50, 'Lab table No. 1', { font: "bold 50px Handlee", fill: '#5568FE' }).setScrollFactor(0).setDepth(4);

        this.boardCloseButton = this.scene.add.image(this.scene.cameras.main.width - 80, 60, 'closeIcon').setScrollFactor(0).setDepth(4).setInteractive().on('pointerdown', () => {
            this.socket.emitCloseBoard();
            this.closeBoard();
        });

        this.resetBtn = this.scene.add.image(this.scene.cameras.main.width * 0.5 + 250, this.scene.cameras.main.height / 2 + 135, 'reset').setScale(0.8).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.generateBtn = this.scene.add.image(this.scene.cameras.main.width * 0.5 - 150, this.scene.cameras.main.height / 2 + 135, 'generate').setScale(0.8).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);


        this.glass1 = this.scene.add.image(450, this.scene.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass2 = this.scene.add.image(620, this.scene.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass3 = this.scene.add.image(790, this.scene.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.glass4 = this.scene.add.image(960, this.scene.cameras.main.height * 0.4, 'glass').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.createFills(450);
        this.createFills(620);
        this.createFills(790);
        this.createFills(960);

        this.socket.subscribeExistedGlasses(this, this.fillGlasses);
        this.socket.emitGetGlasses();

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

        this.socket.subscribeColoredGlass(this, this.colorGlass);
        this.socket.subscribeResetedGlasses(this, this.resetGlasses);
        this.socket.subscribeAnswer(this, this.answerResult);
    }

    answerResult(data) {
        if (data) {
            this.showSuccess();
        } else {
            this.showError();
        }
    }

    showSuccess() {
        if (this.successCallback) {
            this.closeBoard();
            this.successCallback();
        }
    }

    showError() {
        this.answerOverlay = true;
        if (this.errorTitle != null) this.closeError();

        this.errorGraphics = this.scene.add.graphics();

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

        this.errorTitle = this.scene.add.text(550, 230, 'Incorrect answer', { font: "bold 40px Handlee", fill: '#FF4445' }).setScrollFactor(0).setDepth(5);

        this.btnTryAgain = this.scene.add.image(700, 350, 'try-again').setScale(1).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);

        this.btnTryAgain.setInteractive().on('pointerdown', () => {
            this.socket.emitResetGlasses();
            this.closeError();
        });

        this.btnCancel = this.scene.add.image(700, 450, 'cancel').setScale(1).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);

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
        const fill1 = this.scene.add.image(x - 1, this.scene.cameras.main.height / 2 + 70 - 86, 'fill1').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill2 = this.scene.add.image(x - 1, this.scene.cameras.main.height / 2 + 36 - 86, 'fill2').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill3 = this.scene.add.image(x - 1, this.scene.cameras.main.height / 2 + 4 - 86, 'fill3').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        const fill4 = this.scene.add.image(x - 1, this.scene.cameras.main.height / 2 - 33 - 86, 'fill4').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

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
                    this.socket.emitColorGlass({ glass: number, fill: i, color: this.selectedColor });
                    break;
                }
            }
        });
    }

    setUpResetBtn() {
        this.resetBtn.setInteractive().on('pointerdown', () => {
            if (this.answerOverlay) return;
            this.socket.emitResetGlasses();
        });
    }

    setUpGenerateBtn() {
        this.generateBtn.setInteractive().on('pointerdown', () => {
            if (this.answerOverlay) return;
            this.socket.emitAnswer();
        });
    }

    createColors() {
        this.red = this.scene.add.image(this.scene.cameras.main.width / 2 - 320, this.scene.cameras.main.height - 107, 'red').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.yellow = this.scene.add.image(this.scene.cameras.main.width / 2 - 176, this.scene.cameras.main.height - 107, 'yellow').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.green = this.scene.add.image(this.scene.cameras.main.width / 2 - 32, this.scene.cameras.main.height - 107, 'green').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.blue = this.scene.add.image(this.scene.cameras.main.width / 2 + 112, this.scene.cameras.main.height - 107, 'blue').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.purple = this.scene.add.image(this.scene.cameras.main.width / 2 + 256, this.scene.cameras.main.height - 107, 'purple').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
        this.pink = this.scene.add.image(this.scene.cameras.main.width / 2 + 400, this.scene.cameras.main.height - 107, 'pink').setScale(0.6).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);

        this.colorStoke = this.scene.add.graphics();
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
        this.cursorImage = this.scene.add.image(-100, -100, 'cursorBack').setOrigin(0.2, 0.2).setScale(0.7).setDepth(6).setScrollFactor(0);
        this.cursorPlayerImg = this.scene.add.image(-100, -100, `char${this.scene.player.character}`).setOrigin(-0.55, -0.6).setScale(0.8).setDepth(6).setScrollFactor(0);;
        this.cursorStoke = this.scene.add.image(-100, -100, 'cursorStoke').setOrigin(0.15, 0.05).setScale(0.7).setDepth(6).setScrollFactor(0);
        this.cursorName = this.scene.add.text(-100, -100, `${this.scene.player.name}`, { font: "bold 12px Handlee", fill: '#FFFFFF', align: 'center' }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(6);

        this.scene.game.canvas.style.cursor = 'none';

        this.scene.input.on('pointermove', (pointer) => {
            this.cursorImage.setPosition(pointer.x, pointer.y);
            this.cursorPlayerImg.setPosition(pointer.x, pointer.y);
            this.cursorStoke.setPosition(pointer.x, pointer.y);
            this.cursorName.setPosition(pointer.x + 25, pointer.y + 10);
            this.sendCursorPositionToServer(pointer.x, pointer.y);
        });

        if (this.scene.mobileFlag) {
            this.scene.input.on('pointerdown', (pointer) => {
                this.cursorImage.setPosition(pointer.x, pointer.y);
                this.cursorPlayerImg.setPosition(pointer.x, pointer.y);
                this.cursorStoke.setPosition(pointer.x, pointer.y);
                this.cursorName.setPosition(pointer.x + 25, pointer.y + 10);
                this.sendCursorPositionToServer(pointer.x, pointer.y);
            });
        }
    }

    sendCursorPositionToServer(x, y) {
        this.socket.emitCursorMove({ playerId: this.socket.socket.id, x: x, y: y, color: this.selectedColor, character: this.scene.player.character, name: this.scene.player.name });
    }

    syncWithOtherPlayers() {
        this.socket.subscribePlayerClosedBoard(this, this.deleteBoardPlayer);

        // Прослушивание переданных сервером данных о курсорах других игроков
        this.socket.socket.on('cursorMove', (data) => {
            if (!this.otherCursors[data.playerId]) {
                // Создать курсор для нового игрока
                this.otherCursors[data.playerId] = {};
                this.otherCursors[data.playerId].cursor = this.scene.add.image(data.x, data.y, 'cursorBack').setOrigin(0.2, 0.2).setDepth(4).setScale(0.7).setScrollFactor(0);
                this.otherCursors[data.playerId].cursorImg = this.scene.add.image(data.x, data.y, `char${data.character}`).setOrigin(-0.55, -0.6).setScale(0.7).setDepth(4).setScrollFactor(0);
                this.otherCursors[data.playerId].cursorStoke = this.scene.add.image(data.x, data.y, 'cursorStoke').setOrigin(0.15, 0.05).setScale(0.7).setDepth(4).setScrollFactor(0).setTintFill(data.color);
                this.otherCursors[data.playerId].cursorName = this.scene.add.text(data.x + 25, data.y + 10, `${data.name}`, { font: "bold 12px Handlee", fill: '#FFFFFF', align: 'center' }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(4);
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

                this.scene.tweens.add({
                    targets: [cursor, cursorImg, stoke],
                    x: data.x,
                    y: data.y,
                    duration: 200,
                });

                this.scene.tweens.add({
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
        this.socket.unSubscribeBoard();

        // Отключение отслеживания курсора
        this.scene.input.off('pointermove');
        this.scene.game.canvas.style.cursor = 'default';
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

        if (this.errorTitle != null) this.closeError();

        this.boardFlag = false;
        this.scene.isOverlayVisible = false;
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