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
        this.matter.add.fromVertices(838, 894, '542.5 1854 1201.5 1854 1201.5 1898 1 1898 1 0.5 1949 0.5 1949 826.5 1918.5 826.5 1918.5 542.5 1906 542.5 1892.5 586.5 1856 595.5 1770.5 598.5 1770.5 514.5 1764 506 1770.5 494.5 1856 500.5 1887.5 490.5 1900.5 500.5 1906 531 1918.5 531 1918.5 49 1218 49 1066.5 49 1066.5 130.5 1046.5 130.5 1042.5 107 898 107 884.5 130.5 871 130.5 871 55 48.5 55 54 708 74.5 686.5 115 697.5 115 675.5 196 693.5 201 708 222.5 718.5 216 732 201 820 205 830.5 74.5 810.5 58.5 804 58.5 1030.5 152.5 1030.5 152.5 1139 162 1162 174 1191.5 174 1215.5 162 1244 140.5 1262.5 101.5 1262.5 77.5 1244 68 1215.5 58.5 1215.5 58.5 1854 436 1854 444 1706.5 415.5 1706.5 415.5 1653 552 1653 552 1706.5 527 1706.5 542.5 1854', { isStatic: true }, true)
        this.matter.add.fromVertices(1657, 1800, '0.5 762 0.5 1046.5 0.5 1074.5 784.5 1074.5 784.5 1 730 1 730 1035 218 1031 144 1057.5 136.5 758 43 758 0.5 762', { isStatic: true }, true)

        this.matter.add.fromVertices(510 + 90, 600 + 200, '9.5 68.5 71 1 119.5 44 62.5 113.5 183 427.5 183 467 23.5 467 23.5 117.5 1.5 101 9.5 68.5', { isStatic: true }, true)
        this.matter.add.fromVertices(620 + 60, 1627 + 99, '1.5 119 8 1.5 119 5 108 125 98 125 98 168 98 187.5 92.5 194 65 197.5 26 194 8 187.5 5 176.5 11.5 171.5 11.5 149 11.5 119 1.5 119', { isStatic: true }, true)
        this.matter.add.fromVertices(773 + 86.5, 1330.5 + 77.5, '76 1.5 1 102.5 11 126.5 33 140.5 72.5 153.5 93.5 145.5 106 153.5 172 61.5 156.5 56 85.5 15.5 76 1.5', { isStatic: true }, true)
        this.matter.add.fromVertices(130 + 86, 524 + 76.5, '0.5 37.5 11.5 11.5 31 15 63 21 69 1.5 148 11.5 150.5 34 171 37.5 167.5 75.5 161 124 148 151.5 55.5 129 58 116.5 8 102 0.5 67.5 0.5 37.5', { isStatic: true }, true)
        this.matter.add.fromVertices(650 + 69, 272 + 91.5, '0.5 134.5 11 31 14.5 0.5 54.5 0.5 88.5 6.5 112 14 125 31 115 146 125 172 119 181.5 108 172 102.5 151.5 14.5 140.5 19.5 172 11 175.5 0.5 134.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1269 + 73, 414.5 + 32.5, '1 64 5 16.5 144.5 1.5 139.5 41 134.5 56.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1733 + 60, 374.5 + 19.5, '1.5 30.5 7 14 119 1.5 119 38', { isStatic: true }, true)
        this.matter.add.fromVertices(1817 + 59, 1660 + 64, '24 122.5 5 102 1 24.5 8.5 1 86.5 1 98.5 3.5 111 6 111 95 117 114 97 127.5 57.5 127.5 24 122.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1236 + 85, 1404 + 84.5, '71.5 4 11 56.5 1 69 11 80.5 88.5 168 102.5 159 166 93.5 168.5 73 154 66 83.5 1.5 71.5 4', { isStatic: true }, true)
        this.matter.add.fromVertices(1270 + 170, 516 + 176.5, '5.5 193.5 1.5 234.5 167 352 195 311.5 328.5 174 328.5 155.5 323 145.5 339 135 328.5 101 195 1.5 171 13 5.5 193.5', { isStatic: true }, true)

        this.matter.add.fromVertices(1030 + 149.5, 860 + 128, '1.5 180 10.5 149.5 123.5 36 133 4 145 1 211.5 19 215 26.5 211.5 38.5 207.5 44.5 204.5 54.5 298 204.5 287 255 280 252.5 289.5 208 101 161.5 90.5 208 85 212 4 191 1.5 180', { isStatic: true }, true);
        this.matter.add.fromVertices(1002.5 + 166.5, 883.5 + 111, '41 1.5 1.5 144.5 295 220.5 332 76.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1610 + 77.5, 1234 + 83.5, '100 1.5 1.5 22 29 166 130 147 130 127 154 122.5 134 25 107.5 31 100 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1431 + 40.5, 1777 + 41, '8 35.5 1 39.5 8 62.5 29.5 80.5 38 75.5 38 69 63 50 63 39.5 67 35.5 67 31.5 80 31.5 76.5 20 67 20 63 12.5 60 1 51.5 1 48 6.5 51.5 23 38 31.5 27 23 23.5 26.5 29.5 42 21 42 8 35.5', { isStatic: true }, true);
        this.matter.add.fromVertices(578 + 43, 222 + 71, '47.5 107 70.5 140.5 79 125.5 85 61 75 51 70.5 53.5 52 41.5 47.5 31.5 38 26 34.5 11.5 20.5 1.5 7 6.5 1.5 17.5 4 29 12.5 39.5 4 51 4 85.5 25.5 107 25.5 121 38 125.5 41.5 118 47.5 107', { isStatic: true }, true);
        this.matter.add.fromVertices(1250 + 106.5, 139.5 + 147.5, '18 294 1 7.5 187 1.5 212 263.5 166 282', { isStatic: true }, true);
        this.matter.add.fromVertices(1731 + 94, 117 + 128, '1 254.5 1 7 179.5 1.5 187 149.5 155 156 169 210.5 147 245', { isStatic: true }, true);
        this.matter.add.fromVertices(1627.5 + 170.5, 941.5 + 94.5, '0.5 188.5 0.5 0.5 340.5 0.5 340.5 188.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1374.5 + 48, 1942.5 + 37, '0.5 1.5 0.5 73.5 95.5 73.5 95.5 10', { isStatic: true }, true);
        this.matter.add.fromVertices(450 + 73, 1555 + 126, '1 250.5 1 1 130.5 1 145.5 13 145.5 246', { isStatic: true }, true);
        this.matter.add.fromVertices(101.5 + 179, 1107.5 + 94.5, '357 188 0.5 175.5 0.5 0.5 338 0.5 357 28', { isStatic: true }, true);
        // this.matter.add.fromVertices(, { isStatic: true }, true);
        // this.matter.add.fromVertices(, { isStatic: true }, true);
        // this.matter.add.fromVertices(, { isStatic: true }, true);
        // this.matter.add.fromVertices(, { isStatic: true }, true);


        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(927 + 78.5, 101.5 + 86.5, '1 0.5 8 172 156 172 156 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(915.5 + 137.5, 1937 + 30.5, '0.5 1 0.5 60 274.5 60 274.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(1502 + 123, 1569.5 + 119.5, '11.5 78.5 117 1.5 245 139.5 123 238 1 92.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(512.5 + 104.5, 714 + 166, '4.5 330.5 0.5 9.5 193 1 207.5 322', {
            label: `${LABEL_ID.SECOND_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(1585 + 65.5, 164 + 123.5, '1 246 1 1 130 1 130 246', {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(150 + 250, 198 + 119, '0.5 160 0.5 9 486.5 1 499.5 194.5 490 237 309 194.5 279.5 205 40.5 205', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '0.5 160 0.5 9 486.5 1 499.5 194.5 490 237 309 194.5 279.5 205 40.5 205';

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4];

        const arrBodiesDiff = [box11];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 1930);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 1050, 260);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.SECOND_KEY) {
            const key = '2';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.THIRD_KEY) {
            const key = '3';
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