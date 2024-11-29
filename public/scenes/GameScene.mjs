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
        this.matter.add.fromVertices(784, 868, '69 948 78 1819 728 1824.5 728 1815 647.5 1734.5 620 1787.5 518.5 1731.5 541 1672 604.5 1690.5 532 1605.5 649 1532.5 823.5 1724 823.5 1739.5 735.5 1819 1053.5 1819 1053.5 1869.5 1 1869.5 1 1 1944.5 1 1944.5 483.5 1820 483.5 1820 234 1637 234 1637 218.5 1540 218.5 1552.5 116 1036.5 128 1040.5 79 839 79 839 128 610.5 123.5 684.5 230.5 704.5 211.5 762.5 198.5 782.5 275.5 715.5 296.5 704.5 275.5 567 309.5 533 343.5 498 381 458 381 425 303 498 275.5 517.5 309.5 546 296.5 491 123.5 76.5 123.5 69 810.5 214 810.5 214 1007.5 239.5 1019.5 239.5 1113 214 1124 140.5 1124 123 1105.5 123 1033 147 1019.5 147 948 69 948', { isStatic: true }, true)
        this.matter.add.fromVertices(1718, 1164, '116.5 1341 0.5 1341 0.5 1398 911.5 1406.5 911.5 0.5 815 0.5 815 80 806 80 789.5 92.5 789.5 117.5 798 125.5 787 139.5 761.5 147.5 757.5 152.5 746.5 145.5 733.5 164.5 723.5 166.5 723.5 173.5 714.5 178.5 705.5 176 695.5 176 695.5 188 717 192 733.5 192 727.5 208 709.5 217.5 709.5 234 727.5 234 737.5 208 751.5 188 771.5 197 793.5 197 804 188 819.5 176 819.5 585.5 797 611 790 645 797 659 797 729.5 819.5 740.5 824.5 1339.5 483.5 1331 471.5 1323.5 370 1331 179.5 1337 175 1311 191.5 1256 185 1211 130 1196.5 99 1202.5 91.5 1276 104.5 1303.5', { isStatic: true }, true)

        this.matter.add.fromVertices(1420 + 68, 1502 + 70, '29.5 114 0.5 89 0.5 71 16.5 64 25 50.5 52 11 65 1 108 23 131 44.5 135 55 135 71 112 108.5 91 135.5 74.5 132.5 70.5 139.5 29.5 114', { isStatic: true }, true)
        this.matter.add.fromVertices(1514 + 67, 852 + 172, '1 281 20.5 237.5 33 229 49 231.5 69.5 231.5 85.5 241.5 117.5 256.5 120 108 96.5 108 96.5 175.5 85.5 187.5 58.5 192.5 29.5 178.5 12 178.5 6 168 6 108 12 102 35 102 35 90.5 12 83 12 17 20.5 10 38 4.5 77 0.5 110 0.5 120 10 134.5 4.5 134.5 328 117.5 328 117.5 297.5 112.5 297.5 85.5 343 20.5 315.5 1 309 1 281', { isStatic: true }, true)
        this.matter.add.fromVertices(1679 + 56, 637 + 53, '111 78 111 22 90.5 15 66.5 7.5 37 1 20.5 7.5 16.5 87.5 1 90.5 4.5 99 45.5 106 83.5 106 100 90.5 111 78', { isStatic: true }, true)
        this.matter.add.fromVertices(620 + 108, 1430 + 103, '129.5 6 1 136.5 24.5 173.5 62.5 204.5 149.5 121 169.5 141.5 216 90.5 216 74 154.5 6 142 1.5 129.5 6', { isStatic: true }, true)
        this.matter.add.fromVertices(206 + 68, 1734 + 87, '30.5 24 109 1 89 67.5 89 100.5 120.5 84.5 134.5 105.5 100 138.5 78.5 173 41 151 1 155.5 1 138.5 41 110', { isStatic: true }, true)

        this.matter.add.fromVertices(1648.5 + 109, 848 + 165.5, '0.5 330 0.5 1 217 1 217 330', { isStatic: true }, true);
        this.matter.add.fromVertices(113.5 + 68.5, 1531 + 140.5, '107 279.5 1.5 259 32 1 136 14.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1436 + 58.5, 1852 + 51.5, '12 101.5 1 12 100.5 1.5 115.5 90', { isStatic: true }, true);
        this.matter.add.fromVertices(1708 + 86.5, 1266 + 87.5, '27 39.5 69 1.5 172 81 104 174 1 81', { isStatic: true }, true);
        this.matter.add.fromVertices(1195.5 + 177, 216.5 + 122, '1.5 237.5 9 0.5 353.5 6 353.5 211.5 341 243', { isStatic: true }, true);
        this.matter.add.fromVertices(552 + 122.5, 244.5 + 135.5, '91.5 270 1 23 170.5 1.5 243.5 212.5', { isStatic: true }, true);
        this.matter.add.fromVertices(153 + 89, 265 + 165, '1 329 1 0.5 176.5 0.5 170 329', { isStatic: true }, true);
        this.matter.add.fromVertices(182 + 99.5, 875.5 + 131, '1 258 198 258 198 0.5 1 4', { isStatic: true }, true);
        this.matter.add.fromVertices(1685 + 115, 374 + 95, '1 189 1 19 26 1 228.5 4.5 223 189', { isStatic: true }, true);
        this.matter.add.fromVertices(1128 + 167, 1466 + 149.5, '184.5 184 17 184 1 202 1 273.5 11.5 298 327.5 298 333 13.5 309.5 0.5 184.5 0.5', { isStatic: true }, true);
        this.matter.add.fromVertices(206 + 68, 1734 + 87, '30.5 24 109 1 89 67.5 89 100.5 120.5 84.5 134.5 105.5 100 138.5 78.5 173 41 151 1 155.5 1 138.5 41 110', { isStatic: true }, true);

        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }


    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(899.5 + 115.5, 117 + 78, '1.5 1 19 155.5 216 155.5 230 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const box10 = this.matter.add.fromVertices(147 + 152, 1345 + 81, '303 161 1 161 1 1 303 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1866.5 + 65, 1576.5 + 161.5, '129.5 0.5 0.5 0.5 0.5 306 30 317 129.5 322', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoor, box10, box11];


        const box3 = this.matter.add.fromVertices(813 + 160.5, 915 + 83.5, '0.5 166 0.5 18 250.5 17 254 1 307.5 1 320.5 12 320.5 166 220 166 220 141 93 141 93 166', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box3.form = '0.5 166 0.5 18 250.5 17 254 1 307.5 1 320.5 12 320.5 166 220 166 220 141 93 141 93 166';

        const box4 = this.matter.add.fromVertices(153 + 88, 623 + 121.5, '175 36.5 175 225.5 168 225.5 168 242.5 146 242.5 146 232.5 30 232.5 30 242.5 7 242.5 7 232.5 1 225.5 1 24.5 39.5 24.5 39.5 0.5 127.5 0.5 127.5 24.5 164 24.5 164 36.5', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })
        box4.form = '175 36.5 175 225.5 168 225.5 168 242.5 146 242.5 146 232.5 30 232.5 30 242.5 7 242.5 7 232.5 1 225.5 1 24.5 39.5 24.5 39.5 0.5 127.5 0.5 127.5 24.5 164 24.5 164 36.5';

        const arrBodiesDiff = [box3, box4];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1024, 1940);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            const key = '1';
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
        this.imgTextKey.setVisible(false);
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }
}