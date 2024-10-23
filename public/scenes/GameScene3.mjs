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

export class GameScene3 extends BaseScene {
    constructor() {
        super(CST.SCENE.GAMESCENE3);

    }

    preload() {
        super.preload();

        //map
        this.load.image('map3', './assets/map/map_city_3.jpg');

        this.load.image('person31', './assets/mapKey/character3-1.png');
        this.load.image('person32', './assets/mapKey/character3-2.png');
        this.load.image('person33', './assets/mapKey/character3-3.png');
        this.load.image('person34', './assets/mapKey/character3-4.png');
        this.load.image('person35', './assets/mapKey/character3-5.png');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        // Добавляем карту
        this.createMap('map3');

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
        this.matter.add.fromVertices(1290, 620 + 802, '319 1025 0.5 1025 0.5 1603 1974 1603 1974 872.5 1845 433 1902.5 179.5 1859.5 167 1823 105 1828.5 27 1805.5 1.5 1762.5 29 1762.5 105 1707 89.5 1621 153 1621 223 1707 223 1692.5 360 1707 433 1815 441 1823 477.5 1823 662 1893 676.5 1893 757.5 1668.5 748 1668.5 703.5 1707 652.5 1668.5 652.5 1646.5 676.5 1630.5 691 1606.5 676.5 1582.5 703.5 1621 722.5 1630.5 757.5 1495 757.5 1495 893 1412.5 893 1420.5 1217.5 1495 1230.5 1495 1281.5 1420.5 1281.5 1420.5 1410 1291.5 1435.5 1291.5 1574 1194.5 1574 1194.5 1271.5 1277 1271.5 1267.5 1100 1333 1100 1333 920 1320 893 1299.5 861 1291.5 824.5 1299.5 777 1277 740 1215 691 1186.5 691 1194.5 713 1169 740 1094 732 1059 722.5 1032 732 1041.5 757.5 1094 757.5 1081.5 813.5 1100.5 872.5 1081.5 893 1094 920 1145 953.5 1145 999.5 1094 1030 1100.5 1143 1194.5 1143 1194.5 1203.5 1019.5 1203.5 1019.5 1318 992 1326 976.5 1305 965 1251 925.5 1230.5 861.5 1243 838 1271.5 822 1294 803 1326 783.5 1351.5 753.5 1351.5 737.5 1389.5 709 1389.5 709 1203.5 569 1203.5 569 1435.5 448 1389.5 343 1372 343 1049 319 1025', { isStatic: true }, true)
        this.matter.add.fromVertices(1300, 520, '160.5 615.5 1.5 615.5 426.5 1 2048 1 2048 777.5 2005 777.5 2005 717 2030.5 717 2030.5 682 2021 645.5 1989 645.5 1970 650.5 1970 609 1938 609 1930 645.5 1901.5 645.5 1901.5 598 1914.5 574 1914.5 421 1833 421 1842.5 20 1445 20 1445 193.5 1480 193.5 1491 206.5 1480 225.5 1419.5 225.5 1419.5 367 1408 481.5 1408 574 1324 574 1324 542 1278 609 1285 736 1310.5 748 1310.5 650.5 1414 657 1419.5 702 1431.5 711 1425.5 781.5 1324 781.5 1300.5 765.5 1266 787 1236 765.5 1247.5 645.5 1214 645.5 1137.5 669.5 967.5 650.5 956 625 846.5 625 833.5 645.5 749.5 645.5 749.5 598 592 598 525 645.5 426.5 645.5 377 650.5 370.5 598 237 598 237 645.5 160.5 645.5 160.5 615.5', { isStatic: true }, true)
        this.matter.add.fromVertices(218 + 200.5, 1102 + 86, '12 160 387.5 171 400.5 104.5 400.5 1 34 9 12 24.5 1 112.5', { isStatic: true }, true)
        this.matter.add.fromVertices(91 + 85, 720 + 33, '1 1 1 65.5 169.5 65.5 169.5 1 ', { isStatic: true }, true)
        this.matter.add.fromVertices(867 + 80.5, 718.5 + 28.5, '1 0.5 1 56.5 160.5 56.5 160.5 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1162.5 + 22, 696 + 31, '43.5 61 0.5 61 0.5 1 43.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(775 + 27, 733.5 + 23, '1 45 1 0.5 53.5 0.5 53.5 45', { isStatic: true }, true)
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


        const leftDoor = this.matter.add.fromVertices(4.5 + 37.5, 819 + 329.5, '74.5 658.5 0.5 658.5 0.5 1 74.5 1', {
            label: `${LABEL_ID.DOOR_LEFT_ID}`,
            isStatic: true,
            isSensor: true
        })

        const upDoor = this.matter.add.fromVertices(1446.5 + 182.5, 7.5 + 39.5, '0.5 78 0.5 0.5 364.5 0.5 364.5 78', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const person1 = this.matter.add.sprite(1543 + 42, 502 - 80, 'person31', null, {
            label: `${LABEL_ID.EMPTY_WOMAN}`,
            isStatic: true,
            isSensor: true
        });

        const person2 = this.matter.add.sprite(956 + 42, 1495 - 80, 'person32', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const person3 = this.matter.add.sprite(418 + 42, 1476 + 80, 'person33', null, {
            label: `${LABEL_ID.SIXETH_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person4 = this.matter.add.sprite(375 + 42, 636 + 80, 'person34', null, {
            label: `${LABEL_ID.FIVETH_KEY}`,
            isStatic: true,
            isSensor: true
        });

        const person5 = this.matter.add.sprite(1113 + 42, 809 - 80, 'person35', null, {
            label: `${LABEL_ID.EMPTY_MAN}`,
            isStatic: true,
            isSensor: true
        });

        const arrBodies = [leftDoor, upDoor, person1, person2, person3, person4, person5];


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

        this.fivethKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fivethKey');
        this.fivethKey.setScale(0.8);
        this.fivethKey.setVisible(false);
        this.fivethKey.setDepth(2);
        this.fivethKey.setScrollFactor(0);
        this.fivethKey.setAlpha(0);

        this.sixethKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sixethKey');
        this.sixethKey.setScale(0.8);
        this.sixethKey.setVisible(false);
        this.sixethKey.setDepth(2);
        this.sixethKey.setScrollFactor(0);
        this.sixethKey.setAlpha(0);

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
                targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyMan, this.emptyWoman],
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

                if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                    this.moveUpRoom();
                    return;
                }

                if (!this.isOverlayVisible) {

                    this.showOverlay();

                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyMan, this.emptyWoman],
                        alpha: 1,
                        duration: 500
                    });
                }
                else {
                    this.tweens.add({
                        targets: [this.closeButton, this.overlayBackground, this.fivethKey, this.sixethKey, this.emptyMan, this.emptyWoman],
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1900, 1384);
    }

    moveUpRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 1024, 1910);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIVETH_KEY) {
            this.fivethKey.setVisible(true);
            if (this.fold.indexOf(this.fivethKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.fivethKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.SIXETH_KEY) {
            this.sixethKey.setVisible(true);
            if (this.fold.indexOf(this.sixethKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.sixethKey.texture.key);
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
        if (this.fivethKey.visible) this.fivethKey.setVisible(false);
        if (this.sixethKey.visible) this.sixethKey.setVisible(false);
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

            if (context.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                context.moveUpRoom();
                return;
            }

            if (!context.isOverlayVisible) {

                context.showOverlay();

                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.sixethKey, context.emptyMan, context.emptyWoman],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                context.tweens.add({
                    targets: [context.overlayBackground, context.closeButton, context.fivethKey, context.sixethKey, context.emptyMan, context.emptyWoman],
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