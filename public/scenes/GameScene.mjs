import { CST, LABEL_ID } from "../CST.mjs";

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
        this.load.image('map1', './assets/map/map1.jpg');
    }

    create(data) {
        super.create(data);

        const { players } = data;

        this.createMap('map1');

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
        this.matter.add.fromVertices(700, 993, '187.5 1833 820 1820 935 1828.5 935 1875.5 1 1887 1 0.5 1715.5 0.5 1715.5 642 1569.5 637.5 1569.5 678.5 1561 695 1420 695 1393.5 690 1379.5 674.5 1382 571 1393.5 571 1405 559.5 1409.5 368 1393 368 1389 382 1372 391 1347 389.5 1332.5 375 1332.5 360 1341.5 339.5 1319.5 339.5 1305.5 343.5 1287 343.5 1275 351.5 1161 354 1148.5 357 1141.5 346.5 1078 346.5 1018 339 1009.5 329 1009.5 225 840.5 225 840.5 313 837.5 339 790 342 782.5 353.5 775 342 726 342 718.5 353.5 607.5 353.5 599 327 585.5 327 579 337 563.5 339 542.5 280 522.5 243 500.5 243 489 268 457.5 272.5 441 268 437.5 253 437.5 82 386 82 386 348 434 353.5 471.5 403 471.5 686.5 446 686.5 446 709.5 177 714.5 177 996.5 207 1006 207 1021.5 219.5 1027.5 214 1046.5 233 1054.5 233 1087 210 1163 173.5 1163 173.5 1224.5 236 1224.5 239.5 1211.5 246 1202.5 252 1211.5 257.5 1218.5 394.5 1224.5 384 1245 394.5 1252 411.5 1252 417.5 1268.5 411.5 1284 397.5 1301 384 1309 384 1336 360 1360 316 1410 277.5 1410 265.5 1423 185 1418.5 185 1547 219 1547 219 1533.5 233.5 1525.5 233.5 1514 247.5 1508.5 247.5 1529.5 270 1529.5 273.5 1547 301.5 1522 339 1519 377.5 1533.5 403.5 1533.5 434 1533.5 437.5 1626.5 422.5 1626.5 419.5 1651.5 368.5 1694.5 348.5 1730.5 190.5 1719 187.5 1833', { isStatic: true }, true)
        this.matter.add.fromVertices(1700, 1480, '197 1201.5 1 1201.5 1 1249 806.5 1249 806.5 1 731.5 1 731.5 154 728 167 725.5 175 670.5 175 664 177.5 668.5 257.5 670.5 274 674.5 449 738 449 736 495 613.5 499 619 510.5 679 510.5 738 510.5 753.5 510.5 758 579 766 685.5 766 746 753 761.5 758 770 758 849 748.5 854 752.5 903 752.5 923.5 724 914 705.5 908.5 708.5 894.5 693.5 894.5 689 914 659.5 903 626 894.5 591.5 903 568.5 914 548.5 923.5 537 934 537 954.5 537 980.5 555.5 1013.5 585 1033.5 619 1049.5 673 1049.5 697.5 1079.5 731 1099.5 778.5 1099.5 778.5 1201.5 307 1201.5 260 1193 217 1193 197 1201.5', { isStatic: true }, true)
        this.matter.add.fromVertices(386 + 61.5, 985 + 46.5, '1 20 5 1 96.5 1 122.5 9 122.5 60 112 68.5 112 92.5 20.5 92.5 20.5 68.5 1 68.5 1 20', { isStatic: true }, true)
        this.matter.add.fromVertices(1557 + 84, 1410 + 54.5, '1 65 1 108.5 167 108.5 167 1 65.5 1 65.5 65', { isStatic: true }, true)

        // this.matter.add.fromVertices(, { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(946 + 87, 334 + 60.5, '173.5 120.5 5 120.5 1 1 173.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const arrBodies = [bodyDoor];


        const arrBodiesDiff = [];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1800);
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