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
        this.boxesController.createPlace(694 + 25, 569 + 25, LABEL_ID.PLACE_KEY_1);
        this.boxesController.createPlace(1272 + 25, 569 + 25, LABEL_ID.PLACE_KEY_2);
        this.boxesController.createPlace(1629 + 25, 1126 + 25, LABEL_ID.PLACE_KEY_3);
        this.mySocket.emitGetBoxes([6, 7, 8, 9]);
    }

    update() {
        super.update();

        this.boxesController.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(515, 1133, '754 1833 754 1941.5 0.5 1941.5 0.5 0.5 1525.5 0.5 1525.5 58 1330.5 58 1330.5 270.5 1321.5 332 1310.5 387 1290 411 1254.5 419.5 1201 428.5 1166 419.5 1134 401 1115.5 375.5 1107 337 1097 290.5 1094 215 1063.5 215 1024.5 219.5 999.5 222 971.5 215 969 191 969 160 788.5 160 791 185 770.5 200.5 750.5 215 750.5 265.5 754 301.5 756.5 358 732.5 396 690.5 423.5 652 431.5 608 423.5 562.5 400 547.5 358 547.5 234.5 556.5 230 550.5 203 550.5 120.5 463 120.5 463 479 454.5 499 438 510 420 520 385.5 531.5 385.5 575.5 376.5 575.5 376.5 594 412 609.5 438 635.5 459 667.5 459 695.5 449.5 729 449.5 750 497.5 750 497.5 779.5 443.5 779.5 415.5 789 415.5 848 409 856.5 335.5 856.5 330 848 330 801 300 801 300 762.5 295 756.5 276.5 745.5 260.5 732 243.5 715 243.5 754 232 756.5 219 754 214.5 743 206.5 743 206.5 910 456 910 466 925.5 466 1126 460 1126 460 934 456 920 447 917 232 917 232 969 273 969 273 960 276 955 311.5 958 308.5 969 326.5 969 382 974 406 976.5 436.5 1007.5 436.5 1022.5 435 1047 403 1085.5 406.5 1102 401.5 1109.5 401.5 1129 397.5 1132 392 1129 392 1136.5 397.5 1144.5 397.5 1160 460 1160 460 1144.5 466 1144.5 466 1160 530 1162 542.5 1167.5 548 1179 548 1198 542.5 1198 538.5 1174.5 525.5 1167.5 468 1167.5 466 1244.5 460 1244.5 460 1167.5 223 1170 223 1210 208.5 1219 293.5 1215 414 1222 440 1234 440 1266.5 418 1305 390.5 1308 423.5 1341.5 435.5 1357 431.5 1386 423.5 1386 404 1408 159.5 1411 159.5 1431 97 1431 97 1521.5 297.5 1521.5 297.5 1595.5 273.5 1595.5 276.5 1604.5 288 1606.5 409 1604.5 409 1610.5 283.5 1610.5 270.5 1606.5 266.5 1598 255 1595.5 250.5 1592 128 1592 128 1816 138 1821.5 207 1821.5 204.5 1803 234 1803 227 1819 314.5 1816 321.5 1807.5 330.5 1816 363 1816 363 1797 580.5 1787.5 655 1794.5 663 1806 734.5 1806 754 1833', { isStatic: true }, true)
        this.matter.add.fromVertices(1330 + 354.5, 267 + 953.5, '0.5 1759 0.5 1905.5 708 1906.5 708 1 435 1 435 42 425 55 425 409 428.5 423.5 428.5 457.5 432 468.5 428.5 475 428.5 501 415 514.5 400 525 400 582 432 582 432 638 438 643.5 472 643.5 481 638 493.5 638 498.5 647 523.5 647 537 641 540.5 643.5 576 643.5 581.5 634.5 581.5 611.5 593.5 609.5 593.5 593.5 614.5 586.5 614.5 773.5 606.5 778 606.5 804.5 586 808 586 814 566.5 817 566.5 828.5 582.5 830.5 582.5 1102.5 512.5 1102.5 512.5 1131.5 576 1142.5 585 1147 585 1236.5 592 1240 595.5 1600.5 604 1607.5 604 1733.5 599.5 1739.5 573.5 1739.5 573.5 1721.5 565 1717 549 1717 545.5 1736.5 515.5 1736.5 511.5 1748 473 1744 464.5 1733.5 447.5 1736.5 447.5 1751.5 404.5 1751.5 400.5 1757.5 160 1755 155 1643 111.5 1643 111.5 1612 67 1612 67 1741 20 1741 0.5 1759', { isStatic: true }, true)

        this.matter.add.fromVertices(432 + 106, 1450 + 83, '185.5 161 1 161 1 165 197 165 206.5 158 211 149.5 211 0.5 206.5 0.5 206.5 149.5 197 158 185.5 161', { isStatic: true }, true)
        this.matter.add.fromVertices(650 + 4.5, 1336 + 90, '8 1 1.5 1 1 179 8 179', { isStatic: true }, true)
        this.matter.add.fromVertices(1330 + 134, 1778 + 18.5, '8 36 1.5 36 8 15.5 13 7 24 1 267 3 267 9 27 9 19 11.5 13 20', { isStatic: true }, true)
        this.matter.add.fromVertices(1475 + 89.5, 1708.5 + 3.5, '178.5 6 1 6 1 0.5 178.5 0.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1620 + 77, 1319 + 181.5, '103.5 192.5 33 192.5 27 70 13.5 64 0.5 41 0.5 8.5 19.5 8.5 21.5 4 120.5 4 126.5 1 126.5 29 120.5 26.5 120.5 59.5 140 59.5 153 67 153 89.5 153 105 144.5 120 144.5 333.5 147.5 362 140 362 137.5 338.5 140 131.5 117 131.5 117 185 103.5 192.5', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(888.5 + 96, 226 + 34, '1.5 1 9.5 67 191.5 67 191.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDoorBack = this.matter.add.fromVertices(864 + 166, 1945 + 51, '1 1 1 101.5 331 101.5 331 1', {
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
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1000, 1940);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 500);
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
            this.boxesController.releaseObject(this.boxesController.isHoldingObject);
            return true;
        } else if (this.boxesController.isNearObject) {
            this.boxesController.holdObject(this.boxesController.isNearObject);
            return true;
        }
    }

    doorEvent() {
        if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID && this.boxesController.places[1].box == '9' && this.boxesController.places[0].box == '8' && this.boxesController.places[2].box == '7') {
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