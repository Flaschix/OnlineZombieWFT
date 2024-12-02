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
        this.matter.add.fromVertices(793, 990, '157 1111.5 151 1209.5 157 1456 413 1450 413 1464 1 1464 9.5 1 1621 1 1621 392.5 1437.5 392.5 1433 366.5 1336.5 360 1306 338 1292 308 1306 279.5 1319.5 257.5 1175.5 257.5 1152.5 264.5 1163 122 1029.5 122 1017 122 1010 103 1010 46 769 46 769 88.5 750 122 735.5 122 731.5 113.5 708.5 113.5 704.5 187.5 693 191.5 525 191.5 513 113.5 328 113.5 346.5 282.5 328 442.5 172.5 442.5 172.5 462.5 145 469.5 135 615.5 107 640.5 78 1087.5 146.5 1087.5 157 1111.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1665 + 125.5, 1124 + 544.5, '104 0.5 151.5 655.5 26 655.5 19 664.5 36 787.5 1 859 1 872.5 161 866 174 1088 250.5 1088 250.5 0.5 104 0.5', { isStatic: true }, true);

        this.matter.add.fromVertices(355 + 100.5, 1470 + 90, '182.5 152 132 179 118 174 118 136.5 49.5 96 7.5 118 3 111.5 3 63 1 58 3 50 55.5 21.5 55.5 5.5 65 1.5 70 5.5 70 21.5 158.5 71.5 165 60 182.5 60 191 71.5 182.5 76.5 182.5 87.5 200 96 200 103.5 182.5 111.5 182.5 152', { isStatic: true }, true);
        this.matter.add.fromVertices(1440 + 79.5, 1020 + 96.5, '158 160 98 192 4 135 4 68.5 1.5 62 5.5 55 25 45.5 25 9 37 1 84 27.5 84 37 158 77.5 158 160', { isStatic: true }, true);
        this.matter.add.fromVertices(1370 + 94.5, 1610 + 82, '49 135.5 0.5 114 0.5 53.5 25.5 43 25.5 32 22.5 26.5 22.5 17 55 1 92.5 19.5 98 29.5 107 29.5 107 43 113.5 45.5 113.5 35 124.5 35 124.5 53.5 138.5 58 138.5 66.5 188.5 90.5 188.5 138 179 142 179 121.5 144.5 138 144.5 160 133 162.5 133 125.5 95.5 111 72.5 118 52 111 49 135.5', { isStatic: true }, true);
        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(922.5 + 129.5, 448 + 114.5, '1.5 1 7.5 228.5 250.5 228.5 257.5 1', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(916 + 151, 1990 + 29.5, '1 1 1 58 301 58 301 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(1198 + 66.5, 612 + 116.5, '1 169.5 6 1 126 1 132 78 121 232 1 232', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box2 = this.matter.add.fromVertices(1652.5 + 13, 1634 + 92, '25 118 0.5 183.5 0.5 59 21 1', {
            label: `${LABEL_ID.FIRST_KEY}`,
            isStatic: true,
        })

        const box4 = this.matter.add.fromVertices(625.5 + 80, 963.5 + 59.5, '159 118.5 0.5 118.5 2.5 1.5 149.5 0.5 159 31.5', {
            label: `${LABEL_ID.NINETH_KEY}`,
            isStatic: true,
        })


        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box4];

        const box3 = this.matter.add.fromVertices(203 + 187, 1795 + 121.5, '335.5 1 17 1 1 151 39 242 373 242 373 151', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })
        box3.form = '335.5 1 17 1 1 151 39 242 373 242 373 151';

        const arrBodiesDiff = [box3];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE3, 950, 1910);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 700);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIRST_KEY) {
            const key = '1';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.NINETH_KEY) {
            const key = '9';
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