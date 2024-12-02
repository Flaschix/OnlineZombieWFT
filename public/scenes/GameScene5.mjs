import { CST, LABEL_ID } from "../CST.mjs";

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
        this.matter.add.fromVertices(768, 1080, '130 991.5 107 1010 107 1063 82.5 1078.5 56 1063 40.5 1063 40.5 1296.5 187.5 1296.5 217.5 1352.5 217.5 1461 926 1461 926 1394.5 1122.5 1394.5 1122.5 1512 1 1512 1 0.5 1613.5 0.5 1613.5 183.5 1613.5 365 1504 365 1442.5 399 1352 349 1352 234.5 1202.5 234.5 1202.5 212.5 982.5 212.5 982.5 135 937 135 932.5 144 915 148 901.5 138 901.5 82 703.5 82 703.5 130.5 693.5 148 672.5 148 667 138 559 142.5 559 192.5 269 192.5 269 516 67 516 67 677.5 95.5 711.5 77 746 82.5 767 107 746 135.5 774.5 172 754 185.5 814.5 185.5 842 195 906.5 148 936 135.5 991.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1316 + 317.5, 1100 + 686, '87.5 1309.5 0.5 1309.5 0.5 1371.5 634.5 1371.5 634.5 1 479 1 479 521 497.5 1309.5 401 1309.5 401 1201 349 1201 349 1164 278.5 1164 278.5 1143 192.5 1143 192.5 1164 138.5 1164 138.5 1173.5 87.5 1173.5 87.5 1309.5', { isStatic: true }, true);

        this.matter.add.fromVertices(751 + 50.5, 1656.5 + 59.5, '1 29 1 94 46.5 118 100.5 90 100.5 31 51 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1396 + 33.5, 1573 + 37, '66 50 34.5 73 1 50 4.5 37 13.5 30.5 13.5 21.5 21 17 26 21.5 31.5 17 31.5 6 39 1.5 43 13.5 63.5 30.5 66 50', { isStatic: true }, true);
        this.matter.add.fromVertices(1450 + 87.5, 1376 + 106, '174 185 126 211 3 142 3 82.5 0.5 76.5 0.5 62 38.5 43.5 40.5 1 81 1 81 46 106 62 106 73 117 79 119.5 69 135 62 165 79 165 107 174 114 174 185', { isStatic: true }, true);
        this.matter.add.fromVertices(1454 + 78, 945 + 96, '155 161 96.5 191 1 132.5 1 65.5 1 56.5 22.5 45 22.5 8 34 1 81 25 81 35.5 155 76.5 155 161', { isStatic: true }, true);
        this.matter.add.fromVertices(488 + 43.5, 1025 + 41, '66.5 81 26.5 81 21.5 74 21.5 65.5 28 62 28 52.5 11 44.5 0.5 29 0.5 15 21.5 1 59.5 8 86 35 75.5 46.5 75.5 62 79 74 66.5 81', { isStatic: true }, true);


        // this.matter.add.fromVertices(, { isStatic: true }, true);
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(940.5 + 100.5, 358.5 + 120.5, '0.5 0.5 0.5 240.5 200 240.5 200 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(923 + 118.5, 1857 + 37.5, '1 1 1 74 236 74 236 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(629 + 79.5, 607.5 + 56, '158.5 111.5 1 111.5 1 0.5 150 0.5 157 30.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box11 = this.matter.add.fromVertices(1332 + 46, 756 + 62, '67 123 1 111.5 11.5 76 2.5 68 15 1 91 10 79.5 76 91 108', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '67 123 1 111.5 11.5 76 2.5 68 15 1 91 10 79.5 76 91 108';

        const box12 = this.matter.add.fromVertices(419 + 78, 1308 + 110, '57.5 219 0.5 187 0.5 47 90 1 118.5 16 118.5 76 155.5 94 155.5 170', {
            label: `${LABEL_ID.THIRD_KEY}`,
            isStatic: true,
        })

        box12.form = '57.5 219 0.5 187 0.5 47 90 1 118.5 16 118.5 76 155.5 94 155.5 170';

        const box13 = this.matter.add.fromVertices(1026 + 73, 1092 + 114.5, '85 228 1 185 1 113 13 100 13 92 20.5 89 25.5 75.5 23.5 60 8.5 50.5 31.5 40 13 20 13 11.5 29 1.5 43.5 11.5 57.5 6 74.5 18 80 36.5 106.5 50.5 115.5 44.5 129 50.5 126 75.5 115.5 84 122.5 103 145 113 145 196', {
            label: `${LABEL_ID.EIGHTH_KEY}`,
            isStatic: true,
        })

        box13.form = '85 228 1 185 1 113 13 100 13 92 20.5 89 25.5 75.5 23.5 60 8.5 50.5 31.5 40 13 20 13 11.5 29 1.5 43.5 11.5 57.5 6 74.5 18 80 36.5 106.5 50.5 115.5 44.5 129 50.5 126 75.5 115.5 84 122.5 103 145 113 145 196';

        const arrBodies = [bodyDoorBack, bodyDoor, box1];



        const arrBodiesDiff = [box11, box12, box13];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 1000, 1820);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1010, 590);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.THIRD_KEY) {
            const key = '3';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.EIGHTH_KEY) {
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
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }
}