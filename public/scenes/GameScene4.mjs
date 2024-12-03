import { CST, LABEL_ID } from "../CST.mjs";

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
        this.load.image('map4', './assets/map/map4.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map4');

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
        this.matter.add.fromVertices(795, 1063, '635 1541.5 635 1638.5 1 1638.5 1 0.5 1598 0.5 1598 518 1514.5 518 1509.5 296.5 1490.5 270.5 1464 249.5 1468.5 221.5 1464 196.5 1464 178.5 1448 166 1442.5 150 1377 123.5 1291 123.5 1339.5 155.5 1339.5 221.5 1333.5 236 1364.5 256.5 1361.5 327 1311 355 1187 286.5 1180.5 270.5 1180.5 225.5 1180.5 206 1211 188.5 1211 123.5 990.5 123.5 990.5 83.5 757 83.5 757 119.5 444.5 119.5 444.5 285 203.5 285 196.5 307 164 335 130.5 349 130.5 486 172.5 486 172.5 553.5 180 566 180 608 201 906 201 1002 183.5 1002 183.5 1048.5 162 1073 118.5 1073 118.5 1153.5 177 1130 183.5 1202 190.5 1226.5 170 1241 190.5 1259 201 1288.5 170 1310.5 177 1331.5 201 1320 225.5 1331.5 243 1348.5 243 1373 225.5 1422 190.5 1440.5 190.5 1481.5 556 1481.5 565 1475.5 593 1475.5 617.5 1495 635 1541.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1300 + 303, 790 + 587, '1 1139.5 1 1166.5 605.5 1173.5 605.5 16 387.5 36.5 351 63 342.5 82 339 96 253.5 43.5 253.5 21 222 1.5 212.5 8 212.5 43.5 201.5 49.5 201.5 153.5 320.5 224.5 333.5 230.5 333.5 245 318 248 318 260.5 326 260.5 338.5 248 346 248 346 256 357 252.5 360.5 245 369 252.5 369 260.5 379 260.5 373.5 216 351 205.5 351 153.5 376 160.5 403.5 176 417 160.5 422.5 180.5 452.5 216 487 196.5 489.5 490.5 291.5 537.5 296 587.5 311.5 620 327 635.5 346 635.5 331.5 670.5 331.5 826 494.5 826 494.5 922 474.5 928.5 468.5 947 451.5 934.5 428 922 412.5 904 390 904 384.5 865.5 244 865.5 229 909.5 229 1010 70.5 1010 70.5 1003 38 1003 1 1139.5', { isStatic: true }, true);

        this.matter.add.fromVertices(416 + 81, 1459 + 72, '160.5 85.5 54 143 1 116.5 1 65 22 55 22 44 29 39.5 43 39.5 90 17 100 13 106 14.5 112 9 112 3.5 116.5 1 126.5 3.5 133.5 17 133.5 26.5 158 39.5 160.5 85.5', { isStatic: true }, true);
        this.matter.add.fromVertices(451.5 + 30, 1340.5 + 35.5, '9.5 69.5 1.5 12 50.5 1.5 59 61.5', { isStatic: true }, true);
        this.matter.add.fromVertices(873 + 98, 935 + 81.5, '101 162 101 127 25.5 79 25.5 112 16.5 112 16.5 75.5 1 65 1 49.5 84 1.5 195 65 195 79 176.5 90.5 176.5 121 169 127 169 93.5 110.5 127 110.5 162 101 162', { isStatic: true }, true);
        this.matter.add.fromVertices(1240 + 84.5, 1510 + 59, '160.5 113 160.5 93 115 117 112.5 106.5 104.5 110.5 93.5 110.5 30 71.5 24 75.5 24 97.5 17.5 97.5 17.5 64.5 1.5 50.5 4.5 34 20.5 27 20.5 12.5 40 0.5 46 0.5 52.5 10.5 60.5 7.5 115 39 122 12.5 131 10.5 164.5 31.5 160.5 57.5 168.5 61 168.5 109 160.5 113', { isStatic: true }, true);
        this.matter.add.fromVertices(364 + 63, 700 + 87.5, '0.5 72 0.5 155 32 174 121.5 125.5 125 117.5 125 34 123 26.5 96 11.5 87.5 11.5 74 4 67 1.5 59 11.5 57 22 39.5 32 27.5 22 20 29.5 20 45 0.5 53 0.5 72', { isStatic: true }, true);


        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true);
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(910 + 116.5, 289 + 119.5, '1 1 1 238.5 232.5 238.5 232.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(792.5 + 224.5, 1952 + 47.5, '0.5 1 0.5 94 448.5 94 448.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(227 + 106.5, 1013.5 + 144, '212 287.5 25 287.5 1 209.5 1 0.5 207 0.5 212 51.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1523.5 + 120.5, 1190.5 + 134, '72.5 1.5 1.5 220 170 267 240 64', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1558.5 + 71.5, 702 + 113, '119.5 225 0.5 221.5 0.5 64.5 21 1 142 1 142 178', {
            label: `${LABEL_ID.FOURTH_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4];

        const box11 = this.matter.add.fromVertices(653 + 106.5, 526 + 17, '1 33 1 1 212.5 1 212.5 33', {
            label: `${LABEL_ID.SIXETH_KEY}`,
            isStatic: true,
            isSensor: true
        })

        box11.form = '0.5 -50 0.5 -195 223.5 -195 223.5 -50';

        const arrBodiesDiff = [box11];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1815);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1050, 650);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FOURTH_KEY) {
            const key = '4';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.SIXETH_KEY) {
            const key = '6';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.imgKey.setTexture('emptyKey')
            this.imgKey.setVisible(true);
        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false

        this.imgKey.setVisible(false);
        this.imgTitle.setVisible(false);
        this.imgText.setVisible(false);
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }
}