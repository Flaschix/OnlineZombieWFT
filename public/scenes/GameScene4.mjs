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

export class GameScene4 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE4);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map4', './assets/map/map_city_4.jpg');

        this.load.image('person41', './assets/mapKey/character4-1.png');
        this.load.image('person42', './assets/mapKey/character4-2.png');
        this.load.image('person43', './assets/mapKey/character4-3.png');
        this.load.image('person44', './assets/mapKey/character4-4.png');
        this.load.image('person45', './assets/mapKey/character4-5.png');
        this.load.image('person46', './assets/mapKey/character4-6.png');
        this.load.image('person47', './assets/mapKey/character4-7.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map4');

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
        this.matter.add.fromVertices(1458 + 291.5, 970, '1 1879.5 1 2040.5 582.5 2021.5 582.5 0.5 112.5 0.5 112.5 153 89.5 174.5 74.5 216.5 89.5 266 44 277.5 32.5 328 32.5 423.5 112.5 423.5 112.5 681 89.5 681 89.5 945 60.5 945 48 904.5 2 904.5 2 945 13.5 993.5 48 993.5 89.5 993.5 89.5 1058 175 1058 202.5 1032.5 319.5 1032.5 319.5 1098.5 402 1098.5 402 1022.5 568.5 1032.5 568.5 1277.5 527.5 1277.5 527.5 1535.5 491 1535.5 491 1870.5 1 1879.5', { isStatic: true }, true)
        this.matter.add.fromVertices(450, 1260, '736.5 1981 802.5 1981 802.5 2060.5 0.5 2060.5 0.5 1 1467 1 1467 49 1437 62 1437 230.5 1437 297.5 1406 297.5 1388.5 284.5 1356.5 321 1243.5 321 1197 244.5 1046.5 244.5 1033.5 128.5 1006.5 192 978.5 192 978.5 751.5 1006.5 746 1006.5 789 988.5 828 1034.5 828 1046.5 868.5 1034.5 916 969 904 904.5 910.5 904.5 857 863.5 857 863.5 1025.5 880 1042 882 1127 844.5 1179.5 844.5 1231 805.5 1223.5 779.5 1160 748.5 1047 654 1047 654 1085 587 1085 587 1047 356 1047 356 1092.5 308.5 1113 276.5 1092.5 270 1119.5 227 1136.5 213 1179.5 181.5 1223.5 181.5 1258 19 1258 19 1285 114 1317.5 114 1463.5 78.5 1471 61 1486 12.5 1486 12.5 1527 128 1527 173 1540 227 1545.5 245 1564.5 264.5 1564.5 284 1533.5 533.5 1540 562.5 1554 562.5 1533.5 584 1533.5 584 1564.5 598 1564.5 631.5 1564.5 674.5 1589.5 674.5 1734.5 631.5 1757 598 1757 576.5 1744.5 369 1744.5 355 1757 307.5 1757 254.5 1744.5 254.5 1695 227 1695 194.5 1718.5 160 1704.5 47 1704.5 41.5 1718.5 67.5 1744.5 85 1772.5 91 1814.5 114 1829.5 114 1866 85 1915.5 53.5 1938 32 1959.5 11.5 1975.5 11.5 2038 261 2038 261 1987.5 334.5 1987.5 361 1996 361 1938 598 1938 598 1975.5 664.5 1975.5 664.5 1948.5 736.5 1948.5 736.5 1981', { isStatic: true }, true)
        this.matter.add.fromVertices(1269 + 32, 1373 + 97.5, '1 105 1 194 63 194 63 105 44 95 33 1 13.5 1 24 95', { isStatic: true }, true)
        this.matter.add.fromVertices(1355 + 40, 1077 + 246, '66 491 18 483.5 1.5 446.5 29 417.5 29 328.5 37 86 18 59.5 18 32.5 29 1 57 1 78.5 21.5 78.5 59.5 57 93.5 57 328.5 57 417.5 78.5 446.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1713 + 53, 1538 + 130, '0.5 1 0.5 259 105.5 259 105.5 7.5 83 7.5 56 28', { isStatic: true }, true)
        this.matter.add.fromVertices(1504 + 151, 1320 + 76.5, '45 152 15.5 152 0.5 98.5 0.5 49 0.5 31.5 45 31.5 64 63 85.5 41.5 123.5 41.5 164 63 164 49 142.5 12 164 1 171.5 22.5 208.5 31.5 253 31.5 268 63 301 98.5 283.5 140.5 208.5 131.5 152.5 140.5 108.5 152 64 140.5', { isStatic: true }, true)
        this.matter.add.fromVertices(914 + 60.5, 996 + 92, '30.5 182.5 1 165 1 124 20 102.5 20 1 120.5 1 120.5 124 109 124 109 102.5 59.5 102.5 59.5 146', { isStatic: true }, true)
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

        const bodyRightDoor = this.matter.add.fromVertices(1877.5 + 88, 1280 + 174, '0.5 347.5 0.5 1 175 1 175 347.5', {
            label: `${LABEL_ID.DOOR_RIGHT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDownDoor = this.matter.add.fromVertices(859.5 + 175.5, 1934 + 56.5, '0.5 1 0.5 112 350.5 112 350.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(1024 + 42, 490 - 80, 'person41', null, {
            label: `${LABEL_ID.SEVENTH_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(1406 + 42, 902 - 80, 'person42', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(435 + 42, 1852 - 80, 'person43', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(1409 + 42, 1771 - 80, 'person44', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(441 + 42, 1239 - 80, 'person45', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person6 = this.matter.add.sprite(1674 + 42, 1239 - 80, 'person46', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person7 = this.matter.add.sprite(862 + 42, 1581 - 80, 'person47', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [bodyRightDoor, bodyDownDoor, person1, person2, person3, person4, person5, person6, person7];


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
        this.seventhKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'seventhKey');
        this.seventhKey.setScale(0.8);
        this.seventhKey.setVisible(false);
        this.seventhKey.setDepth(2);
        this.seventhKey.setScrollFactor(0);
        this.seventhKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.seventhKey, this.emptyMan, this.emptyWoman],
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

                if (this.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                    this.moveRightRoom();
                    return;
                }

                if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
                    this.moveDownRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.seventhKey, this.emptyMan, this.emptyWoman],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.seventhKey, this.emptyMan, this.emptyWoman],
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

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 100, 1384);
    }

    moveDownRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1640, 240);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SEVENTH_KEY) {
            this.seventhKey.setVisible(true);
            if (this.fold.indexOf(this.seventhKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.seventhKey.texture.key);
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
        if (this.seventhKey.visible) this.seventhKey.setVisible(false);
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

            if (context.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                context.moveRightRoom();
                return;
            }

            if (context.eventZone == LABEL_ID.DOOR_BACK_ID) {
                context.moveDownRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.seventhKey, context.emptyMan, context.emptyWoman],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.seventhKey, context.emptyMan, context.emptyWoman],
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