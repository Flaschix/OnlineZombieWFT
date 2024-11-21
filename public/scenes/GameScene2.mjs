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
        this.matter.add.fromVertices(705, 822, '629 1561.5 629 1666 1 1666 1 1 1610 1 1610 639.5 1540.5 639.5 1531 455 1522.5 445.5 1522.5 268.5 1455.5 263 1452.5 235.5 1359 235.5 1359 153 1200 153 1177 192.5 1173.5 241 1018 241 1014.5 225 920 225 915.5 232 903 232 903 207 899.5 191.5 901 175 901 154.5 907 122 901 113 903 106.5 899.5 92.5 896.5 82.5 899.5 73 872.5 75 868 53.5 677.5 53.5 677.5 71 669.5 78 646.5 78 646.5 98.5 640.5 120.5 648.5 142 648.5 203 644.5 215.5 632.5 215.5 616.5 208.5 618.5 193 616.5 168.5 539 170 536 238.5 490 238.5 488 275 419 272.5 419 236 371.5 236 366.5 228 366.5 214 361.5 205.5 358.5 188 351.5 181 347.5 172 353.5 167 344.5 132 341 128.5 341 93 312 73 312 60 298.5 45 290.5 42 269.5 53.5 254 47 215 42 215 126.5 211 126.5 208 42 190.5 39 180 31.5 162 19.5 142 15 142 77.5 149.5 81.5 149.5 277 158 277 158 284 113.5 284 109.5 336.5 103 348 90 348 73.5 331.5 31 333 31 373.5 42.5 373.5 42.5 384.5 70.5 387.5 70.5 430 52 430 49 509 102.5 509 102.5 904 84.5 904 81 909 23.5 909 23.5 998 75.5 1000 75.5 1008 96.5 1008 96.5 1004 104 998 135.5 1000 135.5 1021.5 133 1028 72.5 1028 72.5 1048 20 1048 15.5 1156 69 1156 69 1207.5 15.5 1207.5 15.5 1325.5 27 1310 54.5 1288.5 452 1291.5 463.5 1312 463.5 1415.5 458 1445 437.5 1460.5 365.5 1463.5 365.5 1501 349.5 1512 326.5 1512 326.5 1527 593 1522.5 629 1561.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1267 + 319, 1208 + 521.5, '0.5 973 0.5 1042.5 637 1042.5 637 0.5 566.5 0.5 569.5 235 558 235 558 210.5 549 208 549 231 555.5 245 558 407 542 407 539.5 374.5 438 374.5 438 548.5 460.5 560 591.5 560 591.5 694 577.5 694 561.5 671 370 667.5 351 652 337.5 642.5 326 649 329 667.5 238.5 667.5 229 673.5 222 686.5 210.5 686.5 206 724 206 795.5 213.5 822.5 226.5 825 235 842 584.5 837 591.5 868 577 903 440 903 428 892 404.5 871 389.5 862 380 868 367 882.5 358.5 903 299 898.5 294 882.5 268.5 882.5 257.5 898.5 86 898.5 86 882.5 75.5 882.5 71 898.5 59 898.5 50 892.5 24 931 4.5 941 0.5 973', { isStatic: true }, true);

        this.matter.add.fromVertices(516.5 + 17.5, 635.5 + 14, '4 18.5 11 27 31.5 27 34 4 23 0.5 1.5 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(337 + 18, 1465.5 + 19, '1 8 14 0.5 26 0.5 34 7 35 23.5 29.5 31 16 36.5 1 27.5', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true);
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(914 + 98, 416 + 20, '1 1 1 39.5 195 39.5 195 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDoorBack = this.matter.add.fromVertices(866 + 179.5, 1946 + 49.5, '7.5 1 1 98.5 358 98.5 347 1', {
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1024, 1800);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 1800);
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

    doorEvent() {
        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID && this.boxesController.places[1].box == '2') {
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