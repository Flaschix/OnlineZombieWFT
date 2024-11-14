import { CST, LABEL_ID } from "../CST.mjs";


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
        // Создаем графику для подсветки
        const highlightGraphics = this.add.graphics();
        highlightGraphics.lineStyle(2, 0x06ff01, 1);
        highlightGraphics.setDepth(0);

        // Создаем область, через которую игрок не может пройти
        // const bodyBookshellMiddle = this.matter.add.fromVertices(706 + 319.5, 1435 + 173.5, '1 1 1 254.121 230.5 346 419 346 638 254.121 638 1 1 1', { label: '1', isStatic: true })

        const bodyDoor = this.matter.add.fromVertices(937 + 84, 400, '1 0.5 7.5 151.5 161.5 151.5 166.5 0.5 ', {
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

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1800);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.imgKey.setVisible(true);
            this.imgKey.setTexture('firstKey')
            if (this.fold.indexOf(this.imgKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.imgKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.imgKey.setVisible(true);
            this.imgKey.setTexture('secondKey')
            if (this.fold.indexOf(this.imgKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.imgKey.texture.key);
            }
        }

        if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.imgKey.setVisible(true);
            this.imgKey.setTexture('emptyKey')
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false
        if (this.imgKey.visible) this.imgKey.setVisible(false);

        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }
}