import { CST, LABEL_ID } from "../CST.mjs";
import { BoxesController } from "../share/BoxesController.mjs";


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
        this.load.image('map5', './assets/map/map5.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map5');

        if (this.mobileFlag) {
            createJoystick(this, 'joystickBase', 'joystickThumb', this.isDragging, 160, this.cameras.main.height - 140);
            createMobileXButton(this, 'touchButton', 'joystickBase', this.cameras.main.width - 150, this.cameras.main.height - 140, this.itemInteract);
            createUILeftMobile(this, 'settingsMobile', 'exitMobile', 90, 70, this.cameras.main.width - 90, 70, this.showSettings, this.showExitMenu);
            this.createPlayers(players, CAMERA_MARGIN_MOBILE);
        } else {
            createUI(this, this.showSettings, this.showExitMenu);
            this.createPlayers(players, CAMERA_MARGIN);
        }

        this.createCollision();
        this.createOverlays();
        this.createInputHandlers();

        createAvatarDialog(this, this.enterNewSettingsInAvatarDialog, this.closeAvatarDialog, this.player.room, isMobile());

        this.boxesController = new BoxesController(this, this.player); // Передаем сцену
        this.mySocket.subscribeTakeBoxes(this, this.boxesController.createBoxes.bind(this.boxesController));
        this.boxesController.createPlace(787 + 25, 523 + 25, LABEL_ID.PLACE_KEY_1);
        this.boxesController.createPlace(452 + 25, 882 + 25, LABEL_ID.PLACE_KEY_2);
        this.boxesController.createPlace(1544 + 25, 858 + 25, LABEL_ID.PLACE_KEY_3);
        this.boxesController.createPlace(1357 + 25, 1551 + 25, LABEL_ID.PLACE_KEY_4);
        this.mySocket.emitGetBoxes([14, 15, 16, 17]);
    }

    update() {
        super.update();

        this.boxesController.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(740, 876, '558 1804.5 596 1804.5 596 1843 0.5 1843 0.5 0.5 1611.5 0.5 1611.5 587 1348.5 587 1348.5 568.5 1339 540.5 1339 493 1343 442.5 1348.5 418.5 1522 418.5 1522 370.5 1556 367 1556 323 1361.5 323 1352.5 310 1352.5 289 1202 285 1205 236 1110 236 1110 195.5 1082.5 190 1028 185.5 1020 175 954 175 954 201.5 946.5 201.5 946.5 61.5 768 61.5 768 201.5 758 201.5 758 37 693.5 37 690.5 51 632.5 54.5 617 66.5 613.5 107.5 677.5 107.5 677.5 165.5 690.5 169 690.5 195 642 195 642 158 607 158 607 235 539 235 539 288 459 288 442.5 255.5 409 255.5 409 288 357.5 284 345.5 255.5 220.5 255.5 220.5 316.5 177 328 177 349 162.5 349 162.5 360.5 385.5 360.5 399 364.5 499.5 364.5 499.5 584.5 405 589 386 584.5 340 584.5 320.5 592 159.5 595 159.5 606 170.5 617.5 182 631 219 652.5 215.5 915 189 922 110 922 110 973 78.5 979 78.5 1262 103 1262 108 1242.5 246 1242.5 246 1197 267.5 1195 267.5 1187 281 1187 281 1245.5 301 1245.5 306 1372 325 1381 325 1418.5 301 1431 274 1431 257 1422 257 1407.5 93 1407.5 74.5 1409.5 74.5 1476 90.5 1476 108.5 1465.5 301 1465.5 301 1559.5 294 1601.5 80 1605 80 1684 508 1693.5 508 1830 553 1830 553 1814 558 1804.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1276 + 327.5, 958 + 630, '0.5 1154 0.5 1259.5 640 1259.5 654 0.5 432.5 0.5 432.5 271.5 342 271.5 336 283 336 379.5 424 379.5 424 446 438 446 438 437 517.5 437 517.5 631.5 470 631.5 470 654 407 637 343 631.5 288 637 247 657.5 219.5 674 219.5 868 259 868 294 873.5 343 877.5 403.5 877.5 403.5 897.5 524 897.5 524 1107 162.5 1107 162.5 1132.5 103 1132.5 97 1127.5 79 1127.5 79 1121.5 57.5 1121.5 57.5 1135.5 42 1135.5 42 1087 37 1087 37 1135.5 4 1135.5 0.5 1154', { isStatic: true }, true)

        this.matter.add.fromVertices(713 + 36.5, 1907.5 + 23, '1 8.5 1 45.5 60 45.5 72 31 72 13 65 0.5 6.5 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(720 + 92.5, 1804 + 36, '17 0.5 1 0.5 1 52 13 52 13 68 25 71 111 71 118 52 176.5 52 184 44 184 4 25 4', { isStatic: true }, true)
        this.matter.add.fromVertices(1345 + 30.5, 1764.5 + 54.5, '60 108 60 0.5 1 0.5 1 108', { isStatic: true }, true)
        this.matter.add.fromVertices(753.5 + 67.5, 1209.5 + 14, '0.5 27.5 0.5 0.5 134.5 0.5 134.5 27.5', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(950 + 88.5, 262.5 + 41, '1 0.5 1 81.5 176.5 81.5 176.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDoorBack = this.matter.add.fromVertices(688.5 + 288.5, 2019.5 + 14, '0.5 0.5 0.5 27.5 576 27.5 576 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const arrBodies = [bodyDoor, bodyDoorBack];


        const arrBodiesDiff = [];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 1024, 1950);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 350);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
            this.imgKey.setTexture('paperDoor');
        } else {
            this.imgKey.setTexture('paperPlace');
        }

        this.imgKey.setVisible(true);
        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false

        this.imgKey.setVisible(false);
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    boxeEvent() {
        if (this.boxesController.isHoldingObject) {
            if (this.eventZone == LABEL_ID.PLACE_KEY_1 && this.boxesController.places[0].box == null) {
                this.boxesController.putBox(0)
                return true;
            }
            if (this.eventZone == LABEL_ID.PLACE_KEY_2 && this.boxesController.places[1].box == null) {
                this.boxesController.putBox(1)
                return true;
            }
            if (this.eventZone == LABEL_ID.PLACE_KEY_3 && this.boxesController.places[2].box == null) {
                this.boxesController.putBox(2)
                return true;
            }
            if (this.eventZone == LABEL_ID.PLACE_KEY_4 && this.boxesController.places[3].box == null) {
                this.boxesController.putBox(3)
                return true;
            }
            this.boxesController.releaseObject(this.boxesController.isHoldingObject);
            return true;
        } else if (this.boxesController.isNearObject) {
            this.boxesController.holdObject(this.boxesController.isNearObject);
            return true;
        }
    }

    doorEvent() {
        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID && this.boxesController.places[0].box == '17' && this.boxesController.places[1].box == '16' && this.boxesController.places[2].box == '15' && this.boxesController.places[3].box == '14') {
            this.moveForwardRoom();
            return true;
        }

        if (this.eventZone == LABEL_ID.DOOR_BACK_ID) {
            this.moveBackRoom();
            return true;
        }

        return false;
    }
}