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

export class GameScene5 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE5);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map5', './assets/map/map_city_5.jpg');

        this.load.image('person51', './assets/mapKey/character5-1.png');
        this.load.image('person52', './assets/mapKey/character5-2.png');
        this.load.image('person53', './assets/mapKey/character5-3.png');
        this.load.image('person54', './assets/mapKey/character5-4.png');
        this.load.image('person55', './assets/mapKey/character5-5.png');
        this.load.image('person56', './assets/mapKey/character5-6.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map5');

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
        this.matter.add.fromVertices(1008, 1359 + 344, '33.5 470.5 0.5 483.5 0.5 687 1922 687 1922 516 1883.5 510.5 1878 447 1854.5 429.5 1825 447 1825 483.5 1802.5 483.5 1802.5 269.5 1802.5 249 1664.5 249 1655 269.5 1558 269.5 1545 256.5 1360 249 1388.5 210.5 1355 185.5 1360 158 1355 121.5 1345.5 71 1327 57 1345.5 46.5 1335.5 15 1306.5 19 1289.5 15 1278 1.5 1251.5 15 1240.5 46.5 1233 65 1218 46.5 1207.5 19 1189 19 1176 7.5 1151.5 35.5 1144 65 1126.5 71 1093 98 1112.5 98 1144 113 1126.5 129.5 1146 147 1157.5 172.5 1144 195 1151.5 219.5 1151.5 256.5 1194 269.5 1207.5 304.5 1146 304.5 1146 371 1157.5 380.5 1169.5 353.5 1240.5 353.5 1248.5 404.5 1240.5 463 1201.5 471 1201.5 516 1144 542.5 1146 672 975.5 672 975.5 547 863 483.5 863 429.5 549 429.5 533.5 380.5 492.5 371 463.5 380.5 455 415.5 328.5 415.5 328.5 336 357 327.5 348.5 285.5 248 292.5 248 361.5 248 397 230.5 415.5 191.5 407.5 159 392 132 397 135.5 429.5 89.5 429.5 89.5 392 59 407.5 59 476.5 33.5 470.5', { isStatic: true }, true)
        this.matter.add.fromVertices(808, 920, '403.5 691 347 704.5 322.5 691 177.5 691 128 712 86 691 59.5 657.5 59.5 544.5 1 544.5 1 444.5 20.5 0.5 2032 0.5 2032 225 1775.5 225 1775.5 263 1687.5 263 1687.5 211.5 1514.5 211.5 1419.5 254.5 1391 254.5 1387.5 170 1348 170 1338 211.5 1283 211.5 1283 328 1199.5 328 1146.5 384.5 1096.5 344.5 966.5 356.5 866.5 409.5 791.5 298 778.5 246.5 791.5 211.5 740 211.5 740 135 487 135 500.5 298 235.5 281.5 150.5 308 114 409.5 100.5 444.5 100.5 501 177.5 491 220.5 471 367 471 428.5 491 440.5 544.5 440.5 657.5 403.5 691', { isStatic: true }, true)
        this.matter.add.fromVertices(1541 + 73.5, 1340 + 68, '135 115.5 88 135.5 51 135.5 23.5 115.5 1.5 88.5 17 49 23.5 25 51 0.5 95 0.5 121 25 135 59.5 145.5 76', { isStatic: true }, true)
        this.matter.add.fromVertices(1707.5 + 45, 935 + 93, '0.5 1 0.5 185 89.5 185 89.5 16 82.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(422 + 24, 940.5 + 64, '14 66 14 114.5 25.5 126.5 42.5 121.5 42.5 66 47 13 25.5 1.5 1 19 1 56', { isStatic: true }, true)
        this.matter.add.fromVertices(997 + 29, 1617.5 + 61, '1 121.5 1 0.5 57.5 0.5 57.5 121.5', { isStatic: true }, true)
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

        const leftDoor = this.matter.add.fromVertices(36, 1282 + 177, '72.5 0.5 0.5 0.5 0.5 353 72.5 353', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const rightDoor = this.matter.add.fromVertices(1965 + 41, 1267 + 187, '0.5 373.5 0.5 0.5 81 0.5 81 373.5', {
            label: `${LABEL_ID.DOOR_RIGHT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(885 + 42, 1810 - 80, 'person51', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(1883 + 42, 1132 - 80, 'person52', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(1010 + 42, 1255 - 80, 'person53', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(389 + 42, 935 - 80, 'person54', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(83 + 42, 1730 - 80, 'person55', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person6 = this.matter.add.sprite(1645 + 42, 1632 - 80, 'person56', null, {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [leftDoor, rightDoor, person1, person2, person3, person4, person5, person6];


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

        this.thirdKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'thirdKey');
        this.thirdKey.setScale(0.8);
        this.thirdKey.setVisible(false);
        this.thirdKey.setDepth(2);
        this.thirdKey.setScrollFactor(0);
        this.thirdKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.emptyMan, this.emptyWoman],
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

                if (this.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                    this.moveRightRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.emptyMan, this.emptyWoman],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.thirdKey, this.emptyMan, this.emptyWoman],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1850, 1380);
    }

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 180, 1240);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.THIRD_KEY) {
            this.thirdKey.setVisible(true);
            if (this.fold.indexOf(this.thirdKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.thirdKey.texture.key);
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
        if (this.thirdKey.visible) this.thirdKey.setVisible(false);
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

            if (context.eventZone == LABEL_ID.DOOR_RIGHT_ID) {
                context.moveRightRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.emptyMan, context.emptyWoman],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.thirdKey, context.emptyMan, context.emptyWoman],
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