import { CST, LABEL_ID } from "../CST.mjs";

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
        this.load.image('map2', './assets/map/map2.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map2');

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
        this.matter.add.fromVertices(886, 746, '762 1538 777 1552.5 777 1860.5 1 1860.5 1 1 1899 1 1899 468.5 1849 468.5 1849 208.5 1776 227 1736 126.5 1736 102 1553.5 102 1553.5 126.5 1428.5 213.5 1375.5 142 1382 102 1049.5 102 1049.5 43.5 875.5 43.5 875.5 78.5 866.5 97.5 779.5 97.5 779.5 221 583.5 216.5 567 182.5 567 43.5 170.5 38.5 170.5 177 191 256 179.5 286.5 86 273.5 72.5 689 64 993.5 58 1846.5 423.5 1851.5 423.5 1609 753 1609 753 1538 762 1538', { isStatic: true }, true)
        this.matter.add.fromVertices(1766, 1590, '170.5 1377 0.5 1377 0.5 1417.5 748 1417.5 748 0.5 662 0.5 678 348 527 359.5 500 359.5 500 377.5 514.5 384 514.5 538.5 668.5 527 679 1023.5 684.5 1406 583.5 1406 583.5 1219 471.5 1219 471.5 1322 231.5 1322 231.5 1407 170.5 1407 170.5 1377', { isStatic: true }, true)

        this.matter.add.fromVertices(584 + 131.5, 1070 + 210.5, '1 402 1 323.5 74.5 222.5 74.5 96.5 90 84 90 37 86.5 15 169 1 187 80.5 159 104.5 159 222.5 217 240 239 257.5 255 250.5 262 257.5 247 263.5 255 272.5 262 292 255 315.5 262 331.5 231 343.5 199 365 170.5 369 170.5 389 113.5 389 102.5 420 37 402 1 402', { isStatic: true }, true)
        this.matter.add.fromVertices(447 + 89.5, 452 + 103, '102.5 1 1 47 25.5 103.5 40 125.5 53 157 75 205 89 205 139 186 163 170.5 178 170.5 157 125.5 146 125.5 146 96.5 126.5 57 102.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(1270 + 90.5, 1372 + 74, '1 36 1 0.5 180.5 0.5 180.5 40.5 154 40.5 154 147.5 111.5 147.5 65 88 65 36 1 36', { isStatic: true }, true)
        this.matter.add.fromVertices(1104 + 142.5, 497 + 221.5, '94 214 116 214 116 396.5 108.5 410.5 108.5 442.5 284.5 442.5 284.5 390.5 240.5 390.5 240.5 1 101 1 101 90.5 64.5 90.5 21.5 85.5 1 133 1 160 15.5 177 1 192 7.5 198 21.5 187 34.5 192 94 214', { isStatic: true }, true)
        this.matter.add.fromVertices(1612 + 77, 453 + 85, '144 116.5 90 157 87 168 65.5 123.5 1 47.5 51 1.5 153 87 144 116.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1120 + 63, 721 + 77.5, '74.5 138.5 101.5 154.5 118.5 154.5 101.5 132.5 109 109 118.5 102.5 113 84.5 125 61 125 46 53 20 39 1 25.5 11 1 84.5 13.5 102.5 39 118 35 126 53 132.5 74.5 138.5', { isStatic: true }, true)
        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(960 + 95, 103 + 88.5, '1 1 8.5 176 189.5 176 189.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(873.5 + 175, 1956 + 45, '0.5 1 0.5 89 349.5 89 349.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(136 + 166, 1748 + 106.5, '331 6.5 1 1 1 212.5 312.5 212.5 331 197', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(147.5 + 102.5, 1365 + 137.5, '204.5 274 0.5 269.5 0.5 1 180.5 1 204.5 16.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(128 + 114, 947 + 118.5, '227 49.5 227 236.5 0.5 236.5 0.5 1 196.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(134 + 111.5, 470 + 208.5, '222 416.5 1 416.5 12 1 201.5 1 222 42', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(564 + 87.5, 1135 + 120.5, '1 240 1 1 174.5 1 174.5 240', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1278 + 95, 1115.5 + 144.5, '1 288.5 1 0.5 189 0.5 189 288.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box9 = this.matter.add.fromVertices(1255.5 + 93.5, 585.5 + 159, '181.5 317.5 186 1.5 0.5 6 0.5 317.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(1777 + 90.5, 666 + 162.5, '0.5 26.5 0.5 324 179.5 311.5 172 0.5 14.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1506.5 + 122.5, 1751.5 + 101.5, '0.5 202 0.5 0.5 240 0.5 244 202', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4, box5, box7, box8, box9, box10, box11];

        const box3 = this.matter.add.fromVertices(285 + 207, 261 + 90.5, '412 180.5 11 180.5 0.5 145.5 0.5 0.5 395 0.5 395 145.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box3.form = '412 180.5 11 180.5 0.5 145.5 0.5 0.5 395 0.5 395 145.5';

        const box6 = this.matter.add.fromVertices(1836 + 61.5, 1354 + 194, '11 0.5 122.5 4 121 387.5 16.5 387.5 16.5 363.5 0.5 340 0.5 21', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box6.form = '11 0.5 122.5 4 121 387.5 16.5 387.5 16.5 363.5 0.5 340 0.5 21';

        const arrBodiesDiff = [box3, box6];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1960);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 340);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            this.imgKey.setVisible(true);
            this.imgKey.setTexture('firstKey')
            if (this.fold.indexOf(this.imgKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.imgKey.texture.key);
            }
        } else if (this.eventZone == LABEL_ID.SECOND_KEY) {
            this.imgKey.setVisible(true);
            this.imgKey.setTexture('secondKey')
            if (this.fold.indexOf(this.imgKey.texture.key) == -1) {
                this.mySocket.emitAddNewImg(this.imgKey.texture.key);
            }
        } else if (this.eventZone == LABEL_ID.EMPTY_KEY) {
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