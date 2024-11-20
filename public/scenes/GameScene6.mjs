import { CST, LABEL_ID } from "../CST.mjs";

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
        this.load.image('map6', './assets/map/map6.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map6');

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
        this.matter.add.fromVertices(789, 605, '456 1944.5 472.5 1972.5 1 1972.5 1 0.5 1952.5 0.5 1952.5 648.5 1897 648.5 1897 393 1765 393 1767.5 343.5 1715 434.5 1703 434.5 1652 389 1647 375 1652 367.5 1661.5 375 1666.5 361 1733 315.5 1767.5 334 1844.5 334 1844.5 112 1509.5 98 1499 158.5 1319 158.5 1116 161.5 1116 128.5 1093.5 128.5 1093.5 115.5 917.5 115.5 917.5 128.5 886.5 128.5 886.5 139 661.5 133.5 451 133.5 473 246.5 451 260.5 451 438.5 435.5 448.5 297 448.5 281 416.5 281 240.5 243 216 205 233 197 293.5 201.5 474 222 502.5 222 513 66.5 520.5 59.5 977.5 107.5 987 107.5 1019 189.5 1019 189.5 1182 221 1198.5 217 1206.5 54 1206.5 49.5 1755.5 74.5 1755.5 160.5 1616 532 1805.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1536 + 297.5, 557 + 619, '397.5 1128 397.5 1236.5 594 1227.5 594 0.5 1 0.5 1 25 186.5 87.5 197.5 84 210 55 232.5 59.5 246 15.5 295.5 15.5 295.5 63 490.5 63 490.5 90 481.5 99 462.5 99 449 99 444.5 106.5 444.5 119.5 436 119.5 431.5 133 436 147 355 119.5 333 198 315.5 247 328 256 333 241 342 226 347 237 411.5 253 402.5 284.5 414.5 284.5 424 247 449 165 466.5 165 485.5 157.5 485.5 639 443 669.5 438 663.5 438 572 455.5 568 438 498 258 334 266 322 169.5 247 56.5 371 60 375.5 76.5 354.5 249 517.5 223 538.5 332.5 649 339 669.5 371.5 710 432 691 471.5 736.5 476.5 732 485.5 736.5 493 1020 542.5 1039.5 585 1039.5 585 1128 397.5 1128', { isStatic: true }, true)

        this.matter.add.fromVertices(300 + 95.5, 905 + 117.5, '190.5 234.5 25 234.5 1 203 1 0.5 168.5 0.5 168.5 203 190.5 225 190.5 234.5', { isStatic: true }, true)
        this.matter.add.fromVertices(656 + 44, 297 + 67, '75.5 103.5 79.5 130 87 130 87 118 83 89 87 57.5 87 1 75.5 1 75.5 17 14 17 1 22 1 84 14 133.5 20.5 133.5 14 103.5 75.5 103.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1627.5 + 125.5, 1646 + 106.5, '250 93 119 212 9.5 101.5 1.5 81 71.5 5 154 1 161.5 13.5 197.5 40 250 93', { isStatic: true }, true)
        this.matter.add.fromVertices(1260 + 141.5, 1480 + 137.5, '120 10.5 110.5 1.5 11.5 104.5 6.5 101 1 110.5 11.5 119 16.5 114.5 139 232.5 130.5 243 163.5 273.5 281.5 158 245 119 233 130 120 10.5', { isStatic: true }, true)
        this.matter.add.fromVertices(603.5 + 86.5, 1349.5 + 88, '3.5 174.5 0.5 0.5 172.5 0.5 172.5 168.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1515 + 68.5, 273 + 74.5, '0.5 97 3.5 116 11.5 109 101.5 126.5 101.5 148 107 148 115.5 133.5 127 91.5 136 12.5 124 9 115.5 39.5 32.5 22 37 5 23.5 1.5 0.5 97', { isStatic: true }, true)
        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(962 + 89, 92 + 55.5, '1 1 1 110.5 177 110.5 177 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(871 + 142.5, 2003.5 + 22.5, '1 0.5 1 44 284 44 284 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(233.5 + 16, 1096.5 + 90, '31.5 178.5 0.5 161.5 4.5 1.5 31.5 18', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(460 + 11.5, 867 + 110, '21.5 218 1 196 1 2 19 29', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(499 + 167.5, 123.5 + 78, '1 116 1 0.5 334 4 334 155 9.5 155', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box5 = this.matter.add.fromVertices(128 + 103, 252 + 153.5, '1 1 174.5 1 205 39.5 205 136.5 198 147.5 180.5 119 180.5 304.5 165 283 1 287.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box5.form = '1 1 174.5 1 205 39.5 205 136.5 198 147.5 180.5 119 180.5 304.5 165 283 1 287.5';

        const box7 = this.matter.add.fromVertices(1817.5 + 66.5, 149.5 + 146.5, '4.5 292.5 0.5 0.5 132 0.5 132 292.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1310 + 176, 690 + 103, '0.5 205 5 6 351.5 1 351.5 175.5 11.5 180', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box8.form = '0.5 205 5 6 351.5 1 351.5 175.5 11.5 180'

        const box9 = this.matter.add.fromVertices(1726.5 + 120, 707 + 90.5, '239.5 1 22 1 22 152 1.5 180.5 239.5 180.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box9.form = '239.5 1 22 1 22 152 1.5 180.5 239.5 180.5'


        const box11 = this.matter.add.fromVertices(1333 + 225.5, 136.5 + 117, '1 233.5 1 7.5 450.5 0.5 450.5 123.5 441 166.5 359.5 166.5 369 123.5 118.5 123.5 118.5 192 112 233.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '1 233.5 1 7.5 450.5 0.5 450.5 123.5 441 166.5 359.5 166.5 369 123.5 118.5 123.5 118.5 192 112 233.5';

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4, box7];



        const arrBodiesDiff = [box11, box5, box8, box9];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        // this.isInZone = false;
        // this.eventZone = null;
        // this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1800);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1800);
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