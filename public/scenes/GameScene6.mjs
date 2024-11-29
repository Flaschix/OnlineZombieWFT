import { CST, LABEL_ID, myMap } from "../CST.mjs";
import { BoxesController } from "../share/BoxesController.mjs";

import { createUILeftMobile, decrypt } from "../share/UICreator.mjs";
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
        this.boxesController.createPlace(546 + 25, 532 + 25, LABEL_ID.PLACE_KEY_1);
        this.boxesController.createPlace(1274 + 25, 517 + 25, LABEL_ID.PLACE_KEY_2);
        this.boxesController.createPlace(1494 + 25, 1002 + 25, LABEL_ID.PLACE_KEY_3);
        this.boxesController.createPlace(1478 + 25, 1635 + 25, LABEL_ID.PLACE_KEY_4);
        this.boxesController.createPlace(546 + 25, 1547 + 25, LABEL_ID.PLACE_KEY_5);
        this.mySocket.emitGetBoxes([18, 19, 20, 21, 22]);
    }

    update() {
        super.update();

        this.boxesController.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(580, 1008, '710.5 1623 710.5 1754 0.5 1754 0.5 0.5 1773.5 0.5 1773.5 145.5 1528 145.5 1512.5 140 1505.5 126 1507.5 50.5 1409.5 50.5 1402 58.5 1103 58.5 1098.5 77.5 1083 100.5 1065 108.5 1038.5 108.5 1016 95 1006.5 82.5 1000 58.5 1004 42 951.5 42 839.5 49.5 745 49.5 745 67 734 92 708.5 112 682.5 112 660.5 100.5 649 85.5 651.5 150.5 647 157 633.5 157 629 146 629 128.5 554.5 128.5 554.5 160 535 160 531 142.5 535 132 545.5 132 545.5 125 541 112 531 100.5 528 94.5 528 58 457 58 457 86 431 86 431 58 412 58 408 64.5 404 58 297.5 58 293 64.5 278 69 278 181.5 284.5 189 275 189 275 337.5 286.5 352.5 286.5 468.5 66.5 468.5 66.5 695.5 103 691 137 691 168 695.5 188 705.5 201 720.5 213 741 218.5 734.5 227 726 240 732 240 741 231 746 240 765.5 244 775 231 781.5 231 788.5 248 788.5 254 779 269.5 784.5 282 801 313.5 807.5 324.5 816 296.5 822 221.5 816 205.5 829.5 168 829.5 139.5 843.5 127 850.5 127 969.5 210 969.5 224.5 984.5 221.5 1001.5 127 1001.5 130 1398.5 157 1404 194.5 1420 216 1447 221 1475 221 1509 203 1549 189 1570 221 1567.5 236 1537.5 303 1537.5 309 1533.5 324.5 1537.5 324.5 1749.5 338 1749.5 341 1730.5 378.5 1722 378.5 1749.5 415 1749.5 422.5 1680.5 430 1673 527 1676.5 527 1736.5 551 1736.5 551 1683.5 557.5 1669.5 620 1669.5 620 1651 630 1646 633.5 1623 710.5 1623', { isStatic: true }, true)
        this.matter.add.fromVertices(1295 + 350.5, 548 + 819, '19.5 1594.5 19.5 1637 700 1637 700 1 606 1 606 166 449 166 449 177 436 179.5 418.5 209 418.5 427 428 431.5 620 431.5 620 456 594.5 460 571 470.5 548.5 482.5 532.5 498.5 529 514 517.5 514 512 526 502.5 531.5 502.5 566.5 512 571.5 517.5 577 529 571.5 544 587 566.5 590 588 584.5 598 590 598 688.5 451.5 688.5 444 692 444 827.5 628.5 827.5 628.5 915 421.5 915 408.5 925 408.5 1044.5 429 1052.5 449 1052.5 449 1103 480 1097.5 480 1168.5 468.5 1168.5 455.5 1172.5 458 1179 480 1182 616 1185.5 616 1331.5 449 1331.5 449 1422.5 324.5 1422.5 320 1432 320 1594.5 296 1594.5 281.5 1591 281.5 1558.5 200.5 1558.5 196 1552.5 123.5 1552.5 116.5 1518 116.5 1507 7 1507 0.5 1511 0.5 1594.5 19.5 1594.5', { isStatic: true }, true)

        this.matter.add.fromVertices(736.5 + 41, 562.5 + 25.5, '0.5 0.5 0.5 50.5 81.5 50.5 81.5 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1119 + 29, 1452 + 39.5, '1 77.5 1 1 57 12.5 57 73', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(979.5 + 54.5, 268 + 63, '0.5 1 0.5 125.5 108 125.5 108 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(845.5 + 183, 2009.5 + 18.5, '0.5 0.5 0.5 36 365 36 365 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const arrBodies = [bodyDoor, bodyDoorBack];


        const arrBodiesDiff = [];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isOverlayVisible = true


        const info = myMap.get('answer');

        this.tweens.add({
            targets: [this.overlayBackground, this.closeButton, this.imgKey, this.imgText],
            alpha: 1,
            duration: 500
        });

        this.imgText.setText(decrypt(info.text));
        this.imgText.setPosition(info.x, info.y);

        this.imgKey.setVisible(true);
        this.imgText.setVisible(true);
        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 400);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
            const info = myMap.get('door');

            this.imgText.setText(info.text);
            this.imgText.setPosition(info.x, info.y);
        } else {
            const info = myMap.get('place');

            this.imgText.setText(info.text);
            this.imgText.setPosition(info.x, info.y);
        }

        this.imgKey.setVisible(true);
        this.imgText.setVisible(true);
        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false

        this.imgKey.setVisible(false);
        this.imgText.setVisible(false);
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
            if (this.eventZone == LABEL_ID.PLACE_KEY_5 && this.boxesController.places[4].box == null) {
                this.boxesController.putBox(4)
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
        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID && this.boxesController.places[0].box == '20' && this.boxesController.places[1].box == '18' && this.boxesController.places[2].box == '22' && this.boxesController.places[3].box == '19' && this.boxesController.places[4].box == '21') {
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