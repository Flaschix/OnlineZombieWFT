import { CST, LABEL_ID } from "../CST.mjs";

import { socket } from "../CST.mjs";

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
        this.load.image('map6', './assets/map/map_city_6.jpg');

        this.load.image('person61', './assets/mapKey/character6-1.png');
        this.load.image('person62', './assets/mapKey/character6-2.png');
        this.load.image('person63', './assets/mapKey/character6-3.png');
        this.load.image('person64', './assets/mapKey/character6-4.png');
        this.load.image('person65', './assets/mapKey/character6-5.png');
        this.load.image('person66', './assets/mapKey/character6-6.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map6');

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

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(994, 126 + 523.5, '185 887 4.5 887 1 0.5 2048 0.5 2048 754.5 1908.5 754.5 1883.5 661 1883.5 624.5 1794.5 624.5 1785 725 1680 725 1678 667.5 1640 667.5 1609 661 1609 616.5 1554.5 616.5 1554.5 667.5 1407 661 1374 713.5 1318 713.5 1318 834.5 1218.5 834.5 1218.5 667.5 1191 640.5 1146.5 578.5 1122.5 542 1129 518 1146.5 490.5 1146.5 459.5 1159 438 1181.5 445 1181.5 406 1171.5 363.5 1191 339.5 1225 323.5 1225 117 970.5 117 914.5 182 759 182 759 302 817 302 817 323.5 859.5 323.5 859.5 251.5 881 251.5 881 323.5 923.5 323.5 923.5 251.5 941.5 251.5 955.5 329.5 955.5 467.5 941.5 467.5 941.5 675.5 849 693 796.5 730.5 689 730.5 689 851.5 713 864.5 719 920.5 719 1046 639 1046 639 920.5 428.5 920.5 428.5 851.5 451.5 823 451.5 749 245.5 749 245.5 851.5 185 851.5 185 887', { isStatic: true }, true)
        this.matter.add.fromVertices(1255, 1184 + 504, '485.5 376.5 1 376.5 1 1007.5 2051 1007.5 2051 89 1939.5 68.5 1877.5 9.5 1725.5 0.5 1623 9.5 1582.5 39 1582.5 154 1613.5 214.5 1902 214.5 1902 286.5 1926.5 326 1926.5 365.5 1422 365.5 1422 521 1387 552 1373.5 593.5 1303.5 563 1215.5 563 1139 593.5 1139 986 818.5 986 818.5 664 779 633 702.5 620 625.5 633 588.5 664 588.5 986 520.5 986 520.5 885.5 485.5 885.5 485.5 376.5', { isStatic: true }, true)
        this.matter.add.fromVertices(879 + 35.5, 1267.5 + 47, '1.5 14 9.5 84 43.5 93 70 73 43.5 1.5', { isStatic: true }, true)
        this.matter.add.fromVertices(475 + 107.5, 1216 + 160, '59.5 288 93.5 319 121.5 319 161.5 307 161.5 260.5 121.5 231 121.5 156.5 149.5 156.5 149.5 131.5 121.5 117.5 214.5 117.5 214.5 51 78 51 85.5 21.5 84 1 0.5 1 0.5 29 51.5 29 59.5 58.5 33 58.5 33 86.5 106 86.5 106 131.5 84 131.5 84 156.5 106 156.5 106 231 71.5 248', { isStatic: true }, true)
        this.matter.add.fromVertices(846 + 59, 864.5 + 65, '1 129.5 1 9.5 108.5 1.5 117.5 32.5 117.5 129.5', { isStatic: true }, true)
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

        const leftDoor = this.matter.add.fromVertices(50, 1153 + 135, '0.5 1 0.5 269.5 99.5 269.5 99.5 1', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const downDoor = this.matter.add.fromVertices(827.5 + 152, 1947.5 + 49.5, '0.5 0.5 0.5 98 303 98 303 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(1905 + 42, 812 + 80, 'person61', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(1024 + 42, 322 + 80, 'person62', null, {
            label: `${LABEL_ID.FOURTH_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(726 + 42, 979 + 80, 'person63', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(304 + 42, 795 + 80, 'person64', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(1212 + 42, 1206 + 80, 'person65', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person6 = this.matter.add.sprite(675 + 42, 1497 + 80, 'person66', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [leftDoor, downDoor, person1, person2, person3, person4, person5, person6];


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

        this.fourthKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fourthKey');
        this.fourthKey.setScale(0.8);
        this.fourthKey.setVisible(false);
        this.fourthKey.setDepth(2);
        this.fourthKey.setScrollFactor(0);
        this.fourthKey.setAlpha(0);

        this.emptyMan = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyMan');
        this.emptyMan.setScale(0.8);
        this.emptyMan.setVisible(false);
        this.emptyMan.setDepth(2);
        this.emptyMan.setScrollFactor(0);
        this.emptyMan.setAlpha(0);

        this.emptyWoman = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'emptyWoman');
        this.emptyWoman.setScale(0.8);
        this.emptyWoman.setVisible(false);
        this.emptyWoman.setDepth(2);
        this.emptyWoman.setScrollFactor(0);
        this.emptyWoman.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyMan, this.emptyWoman],
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

                if (this.eventZone == LABEL_ID.DOOR_LEFT_ID) {
                    this.moveLeftRoom();
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveDownRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyMan, this.emptyWoman],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fourthKey, this.emptyMan, this.emptyWoman],
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

    moveLeftRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1920, 1380);
    }

    moveDownRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1600, 100);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FOURTH_KEY) {
            this.fourthKey.setVisible(true);
            if (this.fold.indexOf(this.fourthKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fourthKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_MAN) {
            this.emptyMan.setVisible(true);
        }

        if (this.eventZone == LABEL_ID.EMPTY_WOMAN) {
            this.emptyWoman.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.fourthKey.visible) this.fourthKey.setVisible(false);
        if (this.emptyMan.visible) this.emptyMan.setVisible(false);
        if (this.emptyWoman.visible) this.emptyWoman.setVisible(false);

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

            if (context.eventZone == LABEL_ID.DOOR_LEFT_ID) {
                context.moveLeftRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveDownRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fourthKey, context.emptyMan, context.emptyWoman],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fourthKey, context.emptyMan, context.emptyWoman],
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