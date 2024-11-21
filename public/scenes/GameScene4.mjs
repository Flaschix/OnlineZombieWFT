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
    }

    update() {
        super.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(865, 805, '698 1839.5 698 1867.5 1 1867.5 1 0.5 1588 0.5 1588 552 1279 558.5 1279 493.5 1299 493.5 1299 503.5 1328.5 503.5 1328.5 525.5 1346.5 535.5 1346.5 498.5 1420.5 498.5 1420.5 493.5 1440 493.5 1435 479 1406.5 482.5 1404 451 1433.5 447.5 1431.5 428.5 1435 425.5 1440 445.5 1463 443.5 1465 469 1479 469 1471.5 479 1469.5 496 1471.5 545.5 1523.5 545.5 1523.5 381.5 1513.5 381.5 1513.5 369.5 1130.5 374 1074.5 374 1074.5 250 1084.5 232.5 1121 228.5 1121 147.5 1118.5 128 1111 153.5 1092.5 176 1068.5 200 1036 204.5 1009 196 994 176 977.5 176 969.5 158.5 967 138 953 138 953 81 818.5 81 822.5 131.5 785 134.5 787.5 196 780 196 777 165.5 770.5 158.5 766.5 138 645 138 645 347.5 635 363.5 586.5 363.5 590 387.5 569 387.5 563.5 368 456 368 456 376.5 446 368 446 351 364 351 354 363.5 246.5 363.5 246.5 387.5 255.5 392 266 399.5 271 415 261 428 246.5 428 240 434.5 232.5 423.5 210.5 434.5 210.5 469 224.5 472 224.5 482.5 210.5 482.5 210.5 516 281 519.5 271 550 198 553.5 205.5 901 241.5 905 241.5 929 201.5 929 201.5 976 279 978.5 279 1028 201.5 1028 201.5 1202 215 1202 215 1229.5 198.5 1229.5 198.5 1259 281.5 1259 281.5 1325.5 192 1325.5 192 1773 203 1757.5 215.5 1740.5 247 1736 267 1746.5 273.5 1773 267 1804 437 1806.5 440.5 1764.5 447.5 1764.5 452 1809 649.5 1804 649.5 1839.5 698 1839.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1217 + 329, 740 + 664, '1 1201 1 1327 657.5 1327 657.5 1 551.5 1 548 97 555 100 551.5 290.5 328 290.5 328 415.5 426.5 419 426.5 429 431.5 429 431.5 419 526.5 419 526.5 441 399.5 441 399.5 461 350.5 461 350.5 642.5 356.5 646.5 515.5 646.5 515.5 631.5 526.5 631.5 526.5 597.5 539 597 539 567.5 529 567.5 529 532.5 490.5 532.5 490.5 496.5 539 496.5 558 504.5 558 835.5 566 844 566 1036 352 1141 183.5 1141 183.5 1173 293 1173 293 1288 144 1288 144 1270.5 109 1270.5 109 1201', { isStatic: true }, true)

        this.matter.add.fromVertices(433.5 + 49.5, 1821.5 + 40, '73.5 78.5 97.5 39.5 50 1.5 31 30.5 0.5 20.5 0.5 27.5', { isStatic: true }, true)
        this.matter.add.fromVertices(722 + 30.5, 778 + 118, '0.5 1 60 1 60 139.5 40.5 142.5 46.5 152.5 46.5 165.5 40.5 170 46.5 184 40.5 201 36.5 211 12 211 12 226 46.5 226 46.5 235.5 0.5 235.5 0.5 4', { isStatic: true }, true)
        this.matter.add.fromVertices(1431 + 36, 1709 + 36, '36 1 1 29 36 70.5 71 38', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(959 + 69.5, 242.5 + 35.5, '1 0.5 5.5 70 134.5 70 137.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDoorBack = this.matter.add.fromVertices(851.5 + 128.5, 1976.5 + 35, '0.5 0.5 0.5 69 256.5 69 256.5 0.5', {
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1800);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1800);
    }

    showOverlay() {
        this.isOverlayVisible = true

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