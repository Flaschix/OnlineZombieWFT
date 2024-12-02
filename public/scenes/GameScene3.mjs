import { CST, LABEL_ID } from "../CST.mjs";

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
        this.load.image('map3', './assets/map/map3.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map3');

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
        this.matter.add.fromVertices(871, 895, '472 1480 472 1628.5 0.5 1628.5 0.5 0.5 1733 0.5 1733 799 1516 799 1516 449.5 1525.5 417.5 1562.5 412 1579.5 390.5 1606.5 396 1612.5 381 1632 373.5 1632 346.5 1461.5 346.5 1461.5 171.5 1431.5 171.5 1412 151 1390.5 165 1381 151 1322 151 1322 270 1106.5 270 1101 165 1032 159.5 1024.5 72 775.5 67.5 758.5 159.5 668.5 165 663 270 561 275.5 548.5 300.5 548.5 182.5 396 175 396 300.5 335 290.5 329.5 166 253 166 246 253 216 246.5 216 331 124 331 96 513.5 96 676 124 707 124 829 108.5 829 108.5 1008 174.5 1008 174.5 1202.5 63 1202.5 63 1364 166 1364 174.5 1480 472 1480', { isStatic: true }, true);
        this.matter.add.fromVertices(1416 + 376, 1242 + 422, '1 694.5 1 843 751 843 751 0.5 536 0.5 512.5 98 512.5 136 536 149 536 261.5 644 261.5 644 404.5 616.5 404.5 603.5 418.5 565.5 418.5 565.5 489.5 644 489.5 644 565 616.5 544 572 530 536 550 523 588.5 536 618 565.5 640.5 565.5 662.5 523 669 498.5 694.5 1 694.5', { isStatic: true }, true);

        this.matter.add.fromVertices(1191 + 88.5, 1495 + 105.5, '176 184 123 209.5 4 141.5 4 79 1 75.5 1 62 42 41.5 42 1 83 1 83 48.5 123 69 136.5 62 168.5 79 163.5 101.5 176 114.5 176 184', { isStatic: true }, true);
        this.matter.add.fromVertices(402 + 43.5, 1776 + 28, '0.5 0.5 0.5 55 86.5 55 86.5 24.5 53 0.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1303 + 72, 788 + 85.5, '143.5 139 87.5 170 3.5 125.5 1 56.5 1 47 19 38 19 24.5 66.5 1 74 6 74 19 120 49.5 120 24.5 128 24.5 128 53 143.5 58.5 143.5 139', { isStatic: true }, true);
        this.matter.add.fromVertices(1336 + 116.5, 1208 + 100, '145 163.5 86 131.5 66 139 66 163.5 60 166.5 54.5 163.5 54.5 137 15 115.5 15 137 12 139 6.5 137 6.5 106.5 1 104 1 85 92.5 32 131.5 18.5 151.5 18.5 151.5 10.5 171 1.5 171 10.5 163.5 15.5 157 28 171 32 182.5 28 189 36 182.5 43 182.5 68.5 232 99.5 232 118.5 223.5 125.5 223.5 157 214 163.5 214 131.5 157 163.5 157 195 145 199 145 163.5', { isStatic: true }, true);
        this.matter.add.fromVertices(371.5 + 26.5, 1548 + 29, '0.5 20 0.5 32 29.5 57 52.5 39.5 52.5 26 25 1', { isStatic: true }, true);
        this.matter.add.fromVertices(454 + 30, 1278 + 54.5, '17 59 1 87 29 107.5 59 84 42.5 59 42.5 48 39 9.5 25.5 1 17 9.5 17 48 13.5 52.5', { isStatic: true }, true);
        this.matter.add.fromVertices(355 + 78.5, 964 + 110, '57.5 218.5 0.5 184.5 0.5 48 43.5 26.5 43.5 19 57.5 15 57.5 22 66.5 19 66.5 5.5 75 1 81 11.5 91 5.5 120 19 120 76.5 156 97.5 156 170 57.5 218.5', { isStatic: true }, true);
        this.matter.add.fromVertices(548 + 39, 871.5 + 31, '1 34 1 44.5 29.5 61 77 30 77 21.5 46.5 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(491 + 31.5, 707 + 34, '1 21 1 50.5 34 67 62 44.5 62 16 29 1', { isStatic: true }, true);


        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true);
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(916.5 + 134.5, 279.5 + 131, '0.5 0.5 0.5 261 268.5 261 268.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(626.5 + 286.5, 1933.5 + 55, '0.5 0.5 0.5 109 572.5 109 572.5 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(1390.5 + 28, 1122.5 + 19, '45 37 1.5 37 13 0.5 54.5 0.5', {
            label: `${LABEL_ID.FIVETH_KEY}`,
            isStatic: true,
            isSensor: true
        })

        const box2 = this.matter.add.fromVertices(213 + 76, 647 + 145, '1 171 26 282 28.5 289 151 289 146 1 1 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(548.5 + 77, 506 + 110, '0.5 219 0.5 1 153.5 1 153.5 219', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(481.5 + 50.5, 1525 + 59, '0.5 28.5 0.5 90 48 117 100.5 90 100.5 28.5 53.5 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '0.5 28.5 0.5 90 48 117 100.5 90 100.5 28.5 53.5 1';


        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4];



        const arrBodiesDiff = [box11];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1050, 700);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIVETH_KEY) {
            const key = '5';
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