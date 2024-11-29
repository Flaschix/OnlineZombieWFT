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
        this.matter.add.fromVertices(1065, 722, '693 1956 855 1960.5 843 2003 0.5 1997 0.5 1 1962 1 1962 1107 1893 1107 1884 1187 1753 1175 1747.5 1158.5 1757 1071 1869.5 1080.5 1869.5 1071 1901.5 1080.5 1901.5 917 1718 917 1718 797.5 1753 773 1901.5 773 1901.5 372.5 1901.5 312.5 1892 288.5 1799.5 342 1783 349.5 1773.5 337 1790 327.5 1749.5 206 1773.5 174 1799.5 149 1821 144.5 1843.5 149 1860.5 163 1897.5 199.5 1901.5 131 1674.5 131 1315.5 159 1261.5 159 1267 208.5 1186 217 1178 159 1127 159 1121.5 175.5 1103 175.5 1103 159 1110.5 45.5 930.5 45.5 936.5 150.5 930.5 175.5 913.5 175.5 908.5 159 870 159 870 248 790 248 790 274.5 668.5 274.5 650 180 650 128.5 397.5 128.5 274.5 128.5 274.5 244 81.5 244 73 389 73 1144.5 165.5 1160.5 165.5 1293.5 73 1293.5 73 1605 57 1915 320 1915 396.5 1894 420 1883 420 1824 693 1831.5 693 1956', { isStatic: true }, true)
        this.matter.add.fromVertices(1738, + 1798, '140.5 864.5 0.5 864.5 0.5 906 862.5 895.5 862.5 5.5 781.5 1 786.5 307.5 587 307.5 594.5 530.5 779 536 786 702 651 706 643 725.5 643 871.5 565.5 871.5 570 783 443 783 418.5 801.5 409 871.5 361.5 871.5 140.5 864.5', { isStatic: true }, true)

        this.matter.add.fromVertices(969.5 + 44, 1179.5 + 46, '0.5 91.5 0.5 0.5 87.5 0.5 87.5 91.5 0.5 91.5', { isStatic: true }, true)
        this.matter.add.fromVertices(135.5 + 53, 897 + 46, '0.5 91 0.5 1 105 1 105 91 0.5 91', { isStatic: true }, true)
        this.matter.add.fromVertices(1575 + 72.5, 1457, '85.5 138.5 0.5 92 0.5 1 24.5 7 35 1 108.5 29.5 143.5 34.5 113.5 121.5 98 121.5 85.5 138.5', { isStatic: true }, true)
        this.matter.add.fromVertices(260 + 77, 536 + 82, '86.5 1 1 35 23.5 75 10 81.5 38.5 158.5 56.5 150.5 60.5 162.5 153 125.5 134.5 60.5 119 41 107 41 86.5 1', { isStatic: true }, true)
        this.matter.add.fromVertices(495 + 129, 1230 + 58.5, '1 102 1 54.5 42 54.5 188 0.5 257.5 4.5 257.5 107.5 240 116 211.5 116 51 98 1 102', { isStatic: true }, true)

        this.matter.add.fromVertices(56 + 157, 1469 + 90, '313 179.5 1 179.5 5.5 8.5 313 1', { isStatic: true }, true);
        this.matter.add.fromVertices(586 + 150, 864.5 + 85, '299 169.5 1 169.5 1 1.5 299 9', { isStatic: true }, true);
        this.matter.add.fromVertices(100.5 + 63, 286 + 75.5, '1.5 149.5 5 1 105 1 120.5 16 125 144.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1346.5 + 178, 117 + 65.5, '348.5 125.5 354.5 5 16.5 1 0.5 31.5 5 130', { isStatic: true }, true);
        this.matter.add.fromVertices(1691 + 128.5, 411.5 + 150.5, '1 296 242.5 300.5 256 0.5 21 4.5 9 23.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1444 + 138.5, 1039.5 + 75.5, '1 150.5 3.5 0.5 276 0.5 272.5 148', { isStatic: true }, true);
        this.matter.add.fromVertices(1342 + 111.5, 1340 + 110, '15.5 112.5 19 1 222.5 4 220 219 1.5 210.5 5.5 120', { isStatic: true }, true);
        this.matter.add.fromVertices(90 + 74.5, 1746.5 + 64.5, '113 1.5 1 35.5 30 127.5 148 92', { isStatic: true }, true);
        this.matter.add.fromVertices(46 + 107, 1031 + 91.5, '213 181.5 1 164 3.5 1 181 1 210 35', { isStatic: true }, true);
        this.matter.add.fromVertices(506.5 + 43.5, 273.5 + 46.5, '4 31 1.5 66 38.5 92 86.5 63 86.5 34 58.5 7 48 1.5', { isStatic: true }, true);
        // this.matter.add.fromVertices(, { isStatic: true }, true);

    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(955.5 + 94, 62 + 70, '1.5 1 9 139 175 139 186.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
            isSensor: true
        })

        const bodyDoorBack = this.matter.add.fromVertices(866 + 143, 2002 + 23, '1 45.5 18 1 281 1 284.5 45.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(1286 + 113.5, 1922 + 49.5, '1 1 1 98 226 98 226 1', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(420.5 + 130.5, 114.5 + 55.5, '6 110.5 1.5 0.5 256 5.5 259.5 107.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box7 = this.matter.add.fromVertices(579.5 + 80.5, 1191.5 + 111.5, '0.5 222 0.5 0.5 160.5 0.5 160.5 222', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const box11 = this.matter.add.fromVertices(1242 + 86, 580 + 110, '76.5 219 15.5 164 25.5 155 22 145.5 25.5 135.5 1 98.5 1 88.5 56 31.5 60 20 72 12 81.5 0.5 89 0.5 103.5 45.5 115 55 123 48 170.5 102 166.5 124 156.5 140.5 159 164 170.5 187.5 170.5 193.5 162.5 196.5 156.5 182.5 147 175 147 155 129.5 175 147 206.5 137.5 216 129.5 206.5 123 182.5 99.5 206.5 89 202', {
            label: `${LABEL_ID.EIGHTH_KEY}`,
            isStatic: true,
        })

        box11.form = '76.5 219 15.5 164 25.5 155 22 145.5 25.5 135.5 1 98.5 1 88.5 56 31.5 60 20 72 12 81.5 0.5 89 0.5 103.5 45.5 115 55 123 48 170.5 102 166.5 124 156.5 140.5 159 164 170.5 187.5 170.5 193.5 162.5 196.5 156.5 182.5 147 175 147 155 129.5 175 147 206.5 137.5 216 129.5 206.5 123 182.5 99.5 206.5 89 202';

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box4, box7];

        const arrBodiesDiff = [box11];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1050, 1900);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE2, 1050, 350);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.EIGHTH_KEY) {
            const key = '8';
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