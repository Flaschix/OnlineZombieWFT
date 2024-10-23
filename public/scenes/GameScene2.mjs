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

export class GameScene2 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE2);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map2', './assets/map/map_city_2.jpg');

        this.load.image('person21', './assets/mapKey/character2-1.png');
        this.load.image('person22', './assets/mapKey/character2-2.png');
        this.load.image('person23', './assets/mapKey/character2-3.png');
        this.load.image('person24', './assets/mapKey/character2-4.png');
        this.load.image('person25', './assets/mapKey/character2-5.png');
        this.load.image('person26', './assets/mapKey/character2-6.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map2');

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
        this.matter.add.fromVertices(660, 710 + 718.5, '1244.5 839 1260 1398.5 1244.5 1436 1 1436 1 1 2060.5 1 2077.5 155.5 1781 155.5 1771 136 1684.5 136 1684.5 195.5 1246.5 195.5 917 187.5 810 179 810 119 687 119 678.5 145.5 653.5 155.5 628.5 127.5 560.5 127.5 522 187.5 487 294 419 317 419 294 419 254 334 254 334 280.5 172.5 280.5 31 280.5 31 908 234 918 255.5 981.5 539 981.5 567 1167 567 1323 557.5 1366 581.5 1398.5 678.5 1398.5 670 1294.5 647.5 1280.5 647.5 1251 622 1239.5 606.5 1214.5 622 1167 670 1151.5 696.5 1128.5 708 1086.5 735 1063.5 758 1044 815.5 1044 838.5 1063.5 865 1128.5 894 1128.5 915 1140 926.5 1167 915 1197.5 915 1251 894 1304.5 865 1366 865 1398.5 1045.5 1398.5 1024.5 908 1045.5 839 1244.5 839', { isStatic: true }, true)
        this.matter.add.fromVertices(1332 + 296.5, 1575.5 + 229.5, '68 351.5 68 420 68 458 592.5 458 592.5 0.5 352.5 0.5 297.5 178.5 259.5 190 234.5 105 124.5 105 124.5 133.5 93 145 93 178.5 68 190 68 220 33 220 1 266.5 33 308.5 33 340 68 351.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1158 + 41.5, 1027.5 + 45.5, '1 42 1 90.5 29 90.5 82.5 77 82.5 0.5 29 0.5 29 42 1 42', { isStatic: true }, true)
        this.matter.add.fromVertices(1471 + 24.5, 1410.5 + 35, '1 10 1 69.5 37.5 69.5 47.5 33 37.5 1.5 1 10', { isStatic: true }, true)
        this.matter.add.fromVertices(1322.5 + 32.5, 1442 + 41, '0.5 31 0.5 81 52.5 81 64 1 0.5 31', { isStatic: true }, true)
        this.matter.add.fromVertices(938 + 21, 1710 + 44.5, '1 1 1 73 22.5 88 41 73 41 1 1 1', { isStatic: true }, true)
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

        const leftDoor = this.matter.add.fromVertices(9.5 + 67, 1085.5 + 198, '0.5 0.5 0.5 395 133 395 133 0.5', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const rightDoor = this.matter.add.fromVertices(1930.5 + 55.5, 1082.5 + 198.5, '0.5 396.5 110.5 396.5 110.5 0.5 0.5 0.5', {
            label: `${LABEL_ID.DOOR_RIGHT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(1300 + 42, 1746 + 80, 'person21', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(985 + 42, 1083 + 80, 'person22', null, {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(1643 + 42, 902 + 80, 'person23', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(595 + 42, 1426 + 80, 'person24', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(500 + 42, 828 + 80, 'person25', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person6 = this.matter.add.sprite(1582 + 42, 1433 + 80, 'person26', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [rightDoor, leftDoor, person1, person2, person3, person4, person5, person6];


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

        this.secondKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'secondKey');
        this.secondKey.setScale(0.8);
        this.secondKey.setVisible(false);
        this.secondKey.setDepth(2);
        this.secondKey.setScrollFactor(0);
        this.secondKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.emptyMan, this.emptyWoman, this.secondKey],
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
                        targets: [this.closeButton, this.overlayBackground, this.emptyMan, this.emptyWoman, this.secondKey],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.emptyMan, this.emptyWoman, this.secondKey],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1900, 1200);
    }

    moveRightRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 100, 1200);
    }


    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.secondKey.setVisible(true);
            if (this.fold.indexOf(this.secondKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.secondKey.texture.key);
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
        if (this.secondKey.visible) this.secondKey.setVisible(false);
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
                    targets: [context.overlayBackground, context.closeButton, context.emptyMan, context.emptyWoman, context.secondKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.emptyMan, context.emptyWoman, context.secondKey],
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