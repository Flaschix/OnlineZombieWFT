import { CST, LABEL_ID, myMap } from "../CST.mjs";

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
        this.matter.add.fromVertices(946, 1022, '105.5 1154.5 91 1492 4.5 1501.5 4.5 1 1899.5 1 1899.5 1541 1549 1541 1549 1490.5 1490.5 1440 1562 1172.5 1770.5 1197 1748 729.5 1638.5 729.5 1638.5 607 1666.5 512.5 1704 506 1704 440 1622 446 1617.5 358 1638.5 301 1689 301 1674.5 187 1520 187 1306.5 187 1105.5 187 1105.5 207 1062 207 1062 146 811 146 811 203 772.5 203 772.5 187.5 505 180.5 510.5 232.5 435.5 265 430.5 291.5 450 300.5 475.5 314 475.5 371 516 392 516 464 417 514 362 481.5 322 437.5 301 552 143 552 113.5 941 210 943 225.5 961 225.5 1046 200 994 113.5 994 105.5 1154.5', { isStatic: true }, true);
        this.matter.add.fromVertices(109 + 777, 1922.5 + 37.5, '5 0.5 1549 0.5 1549 66.5 5 66.5', { isStatic: true }, true);

        this.matter.add.fromVertices(442 + 96, 1395 + 58, '184.5 43 184.5 115 11 115 11 36.5 1 36.5 11 0.5 184.5 0.5 191 36.5 184.5 43', { isStatic: true }, true);
        this.matter.add.fromVertices(1385.5 + 49.5, 1664 + 57, '0.5 28.5 0.5 89.5 46 112.5 98 89.5 98 28.5 49.5 1 0.5 28.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1501 + 72, 767 + 85.5, '143 139 85.5 170 3 125 0.5 56.5 0.5 48.5 28.5 33.5 22 27 67.5 1.5 75 12.5 71.5 21 143 61.5 143 139', { isStatic: true }, true);

        // this.matter.add.fromVertices(, { isStatic: true }, true);
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(888 + 134, 381.5 + 129.5, '5 0.5 9.5 250.5 258 250.5 263 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const box1 = this.matter.add.fromVertices(465 + 37.5, 997 + 23, '40.5 1.5 5.5 21 34 37 69.5 17.5', {
            label: `${LABEL_ID.SEVENTH_KEY}`,
            isStatic: true,
            isSensor: true
        })

        const arrBodies = [bodyDoor, box1];


        const box2 = this.matter.add.fromVertices(177 + 70.5, 1436 + 94, '5 91 14 1 114 1 136 59 136 179 30 179', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box2.form = '5 91 14 1 114 1 136 59 136 179 30 179';

        const box3 = this.matter.add.fromVertices(1540 + 93.5, 1320 + 93, '62 1 5 36.5 9.5 112.5 132.5 182 179 153.5 182 84.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box3.form = '62 1 5 36.5 9.5 112.5 132.5 182 179 153.5 182 84.5';

        const box4 = this.matter.add.fromVertices(1384 + 117.5, 385 + 146.5, '19 1 5 235 12 284 206 284 230 131 230 1', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })
        box4.form = '19 1 5 235 12 284 206 284 230 131 230 1';

        const arrBodiesDiff = [box4, box2, box3];

        this.createSimpleCollision(arrBodies, arrBodiesDiff)
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1060, 1960);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SEVENTH_KEY) {
            const key = '7';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.SECOND_KEY) {
            const key = '2';
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