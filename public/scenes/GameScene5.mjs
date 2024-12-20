import { CST, LABEL_ID } from "../CST.mjs";
import { EnemyWalk } from "../share/EnemyWalk.mjs";
import { HeartController } from "../share/HeartController.mjs";

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

        this.enemyState1 = [
            { x: 293, y: 1787 },
            { x: 489, y: 1787 },
            { x: 489, y: 1600 },
            { x: 850, y: 1600 },
            { x: 850, y: 1806 },
            { x: 1119, y: 1806 },
            { x: 1419, y: 1806 },
            { x: 1743, y: 1806 },
            { x: 1743, y: 1486 },
            { x: 1743, y: 1180 },
            { x: 1436, y: 1180 },
            { x: 1095, y: 1180 },
            { x: 1095, y: 1045 },
            { x: 810, y: 1045 },
            { x: 810, y: 1045 },
            { x: 293, y: 1045 },
            { x: 293, y: 1328 },
            { x: 293, y: 1574 },
        ];


        this.enemyState2 = [
            { x: 491, y: 456 },
            { x: 491, y: 754 },
            { x: 491, y: 1098 },
            { x: 830, y: 1098 },
            { x: 830, y: 1400 },
            { x: 1200, y: 1400 },
            { x: 1200, y: 1162 },
            { x: 1200, y: 809 },
            { x: 1200, y: 456 },
            { x: 951, y: 456 },
            { x: 696, y: 456 },
        ];

        this.enemyState3 = [
            { x: 1647, y: 561 },
            { x: 1828, y: 561 },
            { x: 1828, y: 1052 },
            { x: 1828, y: 1203 },
            { x: 1619, y: 1203 },
            { x: 1369, y: 1203 },
            { x: 1369, y: 1494 },
            { x: 1369, y: 1798 },
            { x: 1025, y: 1798 },
            { x: 1025, y: 1517 },
            { x: 1025, y: 1157 },
            { x: 1025, y: 849 },
            { x: 1025, y: 673 },
            { x: 1312, y: 673 },
            { x: 1647, y: 673 },
        ];
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

        this.heartController = new HeartController(this, this.mySocket);
        this.heartController.initHeart(150, 50, 'heart', 200, 50, this.hitPlayerAnims.bind(this))

        this.enemyWalkController = new EnemyWalk(this.mySocket, this, this.enemyTouch, this.player);
        this.mySocket.subscribeTakeEnemyState(this, this.createEnemiys);
        this.mySocket.emitGetEnemyState();

        this.enemyWalkController.handleVisibility();
    }

    createEnemiys(enemyStates) {
        const state1 = enemyStates[3];
        const state2 = enemyStates[4];
        const state3 = enemyStates[5];

        this.enemyWalkController.createEnemy(this.enemyState1[state1].x, this.enemyState1[state1].y, 'zombie1', 3.5, ['zombie_walk_down_1', 'zombie_walk_right_1', 'zombie_walk_left_1', 'zombie_walk_up_1']);
        this.enemyWalkController.createEnemy(this.enemyState2[state2].x, this.enemyState2[state2].y, 'zombie2', 3.5, ['zombie_walk_down_2', 'zombie_walk_right_2', 'zombie_walk_left_2', 'zombie_walk_up_2']);
        this.enemyWalkController.createEnemy(this.enemyState3[state3].x, this.enemyState3[state3].y, 'zombie3', 3.5, ['zombie_walk_down_3', 'zombie_walk_right_3', 'zombie_walk_left_3', 'zombie_walk_up_3']);


        this.mySocket.subscribeEnemyUpdate(this, (newStates) => {
            const newState1 = newStates[3];
            const newState2 = newStates[4];
            const newState3 = newStates[5];
            this.enemyWalkController.updatePositionsFromServer([{ "enemyN": 0, "x": this.enemyState1[newState1].x, "y": this.enemyState1[newState1].y }]);
            this.enemyWalkController.updatePositionsFromServer([{ "enemyN": 1, "x": this.enemyState2[newState2].x, "y": this.enemyState2[newState2].y }]);
            this.enemyWalkController.updatePositionsFromServer([{ "enemyN": 2, "x": this.enemyState3[newState3].x, "y": this.enemyState3[newState3].y }]);
        });
    }

    enemyTouch() {
        this.heartController.hitHeart(null);
    }

    hitPlayerAnims(socketID) {
        let player = null;
        if (socketID == this.mySocket.socket.id) player = this.player;
        else if (this.otherPlayers[socketID]) player = this.otherPlayers[socketID]

        if (player != null) {
            this.tweens.add({
                targets: player,
                tint: { from: 0xFFFFFF, to: 0xFF0000 },
                ease: 'Linear',
                duration: 100,
                yoyo: true,
                repeat: 2,
                onComplete: () => {
                    player.clearTint();
                }
            });
        }
    }

    update() {
        super.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(516, 634, '847 1860.5 847 1931.5 0.5 1917 0.5 0.5 1917 0.5 1917 481.5 1861 481.5 1869 57 1308 57 1301 81 1067.5 81 1060.5 104 1053 104 1050 92 1053 57 846 57 846 92 842.5 104 831.5 104 825.5 79 401 79 401 148 388.5 148 374.5 100.5 245.5 100.5 237.5 165 207 100.5 55.5 100.5 82 165 61.5 165 61.5 370 167 379.5 167 392 55.5 379.5 55.5 561.5 65.5 566 65.5 588.5 207 593 218.5 588.5 218.5 514.5 207 496 207 199 334 199 322 490.5 355 551.5 365 572 355 579.5 351 653.5 309.5 633 225 633 225 915 56 922.5 56 1864 396.5 1860.5 396.5 1847 423.5 1829.5 501 1829.5 501 1529 639 1529 639 1860.5 847 1860.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1300 + 433, 900 + 739, '1 1397.5 1 1477.5 865.5 1467 865.5 0.5 808 0.5 808 695.5 729 695.5 729 925 681.5 933.5 681.5 940 808 940 808 1399 440 1399 440 1384.5 427 1341.5 405.5 1307 371 1272.5 277.5 1325 252.5 1325 245 1341.5 287 1397.5 1 1397.5', { isStatic: true }, true);

        this.matter.add.fromVertices(165 + 72, 1500 + 75, '85 143.5 143 99.5 85 19 99.5 4.5 94 1 16 47.5 24.5 54 1 70.5 12.5 99.5 29 125 57 148.5 85 143.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1056 + 153, 1523 + 141.5, '146.5 26.5 1 110 6.5 122 26 122 129.5 281.5 212.5 242 250.5 225 304.5 192.5 205 14 212.5 9 205 1.5 146.5 26.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1392 + 52.5, 1456 + 57.5, '18 1.5 1.5 47 9.5 53 1.5 84.5 87 113.5 103.5 47 61.5 29.5 65 20.5 18 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1263 + 114, 855 + 99.5, '168 1 1 105.5 1 119.5 44 198 226.5 90', { isStatic: true }, true);
        this.matter.add.fromVertices(1293 + 66.5, 310 + 71, '7 35.5 1.5 92 7 95.5 7 133.5 124.5 140.5 128 123.5 131.5 46 120 46 120 12.5 94.5 1 63.5 1 25.5 6.5 19.5 39.5 7 35.5', { isStatic: true }, true);
        this.matter.add.fromVertices(431.5 + 49, 1462 + 42.5, '96.5 55.5 47 1 15 16.5 1.5 31.5 54.5 84', { isStatic: true }, true);

        this.matter.add.fromVertices(52 + 77, 1035.5 + 139.5, '153 278 1 278 1 7 122 0.5 153 16', { isStatic: true }, true);
        this.matter.add.fromVertices(611 + 142, 239 + 83, '1 165 1 1 283.5 1 283.5 165', { isStatic: true }, true);
        this.matter.add.fromVertices(1244 + 151, 450 + 93, '1 185 7.5 1 303 1 303 161 291 185', { isStatic: true }, true);
        this.matter.add.fromVertices(1605.5 + 83, 756 + 112, '0.5 223 0.5 1 165 1 165 207 149 223', { isStatic: true }, true);
        this.matter.add.fromVertices(107 + 99, 217 + 31, '196.5 61.5 38.5 61.5 1 1 168.5 1', { isStatic: true }, true);
        this.matter.add.fromVertices(394 + 15.5, 328.5 + 171, '1 283.5 30 341 30 58 8.5 0.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1775.5 + 87, 136 + 145.5, '0.5 290.5 0.5 25.5 30 1 171 4 173 253.5 153.5 290.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1543.5 + 84.5, 1517.5 + 76, '168 151 168 0.5 25.5 0.5 0.5 31.5 0.5 151', { isStatic: true }, true);
        this.matter.add.fromVertices(1140 + 126, 39.5 + 89, '17 0.5 1 177 220.5 177 251 0.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1415 + 81, 1528.5 + 73, '55 122.5 9 131 1 122.5 4 110.5 51.5 97.5 62.5 92 58.5 78 15.5 63 9 54.5 9 44.5 21 38.5 101 64.5 112.5 63 118 51.5 115 24 110 11.5 122 1.5 141 8 131.5 28.5 137 51.5 141 64.5 151 69.5 160.5 82.5 151 97.5 141 103.5 137 122.5 122 145 105.5 145 97.5 131 97.5 110.5 55 122.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1585 + 62.5, 148.5 + 110.5, '12 0.5 1 7.5 1 214 12 220.5 102 220.5 124.5 196 124.5 11.5 98.5 0.5', { isStatic: true }, true);
        this.matter.add.fromVertices(526 + 97, 1440 + 53.5, '1 106.5 1 1 193.5 1 193.5 106.5', { isStatic: true }, true);
        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(905 + 115, 46.5 + 80, '1 0.5 8 159 212.5 159 228.5 0.5', {
            label: `${LABEL_ID.DOOR_FORWARD_ID}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(911 + 105, 1976.5 + 35.5, '1 70.5 1 0.5 209 0.5 209 70.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(388 + 166.5, 1191.5 + 126, '1 251.5 1 0.5 332.5 0.5 332.5 251.5', {
            label: `${LABEL_ID.FIVETH_KEY}`,
            isStatic: true,
        });

        const box2 = this.matter.add.fromVertices(1709 + 40, 138.5 + 105.5, '71 210 1 210 1 0.5 79.5 0.5 79.5 180', {
            label: `${LABEL_ID.SEVENTH_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1800 + 26, 1287 + 112.5, '51 1 1 17.5 1 223.5 51 214', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const arrBodies = [bodyDoorBack, bodyDoor, box1, box2, box8];

        const box11 = this.matter.add.fromVertices(613 + 61.5, 486 + 87.5, '100.5 51 92.5 1 1.5 14.5 41 173.5 82 170.5 122 156', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '100.5 51 92.5 1 1.5 14.5 41 173.5 82 170.5 122 156';

        const arrBodiesDiff = [box11];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE6, 1024, 1950);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1010, 320);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.FIVETH_KEY) {
            const key = '5';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.SEVENTH_KEY) {
            const key = '7';
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