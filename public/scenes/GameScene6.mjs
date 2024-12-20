import { CST, LABEL_ID, myMap } from "../CST.mjs";
import { EnemyWalk } from "../share/EnemyWalk.mjs";
import { HeartController } from "../share/HeartController.mjs";

import { cd, createUILeftMobile, decrypt, decryptN } from "../share/UICreator.mjs";
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

        this.cd = decryptN(cd);

        this.enterCodeContainer;

        this.enemyState1 = [
            { x: 1526, y: 517 },
            { x: 1190, y: 517 },
            { x: 861, y: 517 },
            { x: 861, y: 432 },
            { x: 597, y: 432 },
            { x: 597, y: 632 },
            { x: 388, y: 632 },
            { x: 388, y: 791 },
            { x: 592, y: 791 },
            { x: 592, y: 995 },
            { x: 592, y: 1218 },
            { x: 386, y: 1218 },
            { x: 386, y: 1454 },
            { x: 386, y: 1632 },
            { x: 656, y: 1632 },
            { x: 856, y: 1632 },
            { x: 856, y: 1364 },
            { x: 856, y: 1088 },
            { x: 856, y: 839 },
            { x: 1119, y: 839 },
            { x: 1304, y: 839 },
            { x: 1304, y: 517 },
        ];


        this.enemyState2 = [
            { x: 1594, y: 1556 },
            { x: 1594, y: 1879 },
            { x: 1300, y: 1879 },
            { x: 1007, y: 1879 },
            { x: 700, y: 1879 },
            { x: 700, y: 1580 },
            { x: 385, y: 1580 },
            { x: 385, y: 1373 },
            { x: 385, y: 1170 },
            { x: 597, y: 1170 },
            { x: 830, y: 1170 },
            { x: 830, y: 942 },
            { x: 830, y: 710 },
            { x: 1166, y: 710 },
            { x: 1166, y: 1005 },
            { x: 1166, y: 1321 },
            { x: 1397, y: 1321 },
            { x: 1594, y: 1321 },
        ];
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

        this.createEnterCodeContainer();

        this.heartController = new HeartController(this, this.mySocket);
        this.heartController.initHeart(150, 50, 'heart', 200, 50, this.hitPlayerAnims.bind(this))

        this.enemyWalkController = new EnemyWalk(this.mySocket, this, this.enemyTouch, this.player);
        this.mySocket.subscribeTakeEnemyState(this, this.createEnemiys);
        this.mySocket.emitGetEnemyState();

        this.enemyWalkController.handleVisibility();
    }

    createEnemiys(enemyStates) {
        const state1 = enemyStates[6];
        const state2 = enemyStates[7];

        this.enemyWalkController.createEnemy(this.enemyState1[state1].x, this.enemyState1[state1].y, 'zombie1', 3.5, ['zombie_walk_down_1', 'zombie_walk_right_1', 'zombie_walk_left_1', 'zombie_walk_up_1']);
        this.enemyWalkController.createEnemy(this.enemyState2[state2].x, this.enemyState2[state2].y, 'zombie2', 3.5, ['zombie_walk_down_2', 'zombie_walk_right_2', 'zombie_walk_left_2', 'zombie_walk_up_2']);

        this.mySocket.subscribeEnemyUpdate(this, (newStates) => {
            const newState1 = newStates[6];
            const newState2 = newStates[7];
            this.enemyWalkController.updatePositionsFromServer([{ "enemyN": 0, "x": this.enemyState1[newState1].x, "y": this.enemyState1[newState1].y }]);
            this.enemyWalkController.updatePositionsFromServer([{ "enemyN": 1, "x": this.enemyState2[newState2].x, "y": this.enemyState2[newState2].y }]);
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
        this.matter.add.fromVertices(789, 605, '456 1944.5 472.5 1972.5 1 1972.5 1 0.5 1952.5 0.5 1952.5 648.5 1897 648.5 1897 393 1765 393 1767.5 343.5 1715 434.5 1703 434.5 1652 389 1647 375 1652 367.5 1661.5 375 1666.5 361 1733 315.5 1767.5 334 1844.5 334 1844.5 112 1509.5 98 1499 158.5 1319 158.5 1116 161.5 1116 128.5 1093.5 128.5 1093.5 115.5 917.5 115.5 917.5 128.5 886.5 128.5 886.5 139 661.5 133.5 451 133.5 473 246.5 451 260.5 451 438.5 435.5 448.5 297 448.5 281 416.5 281 240.5 243 216 205 233 197 293.5 201.5 474 222 502.5 222 513 66.5 520.5 59.5 977.5 107.5 987 107.5 1019 189.5 1019 189.5 1182 221 1198.5 217 1206.5 54 1206.5 49.5 1755.5 74.5 1755.5 160.5 1616 532 1805.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1536 + 297.5, 557 + 619, '397.5 1128 397.5 1236.5 594 1227.5 594 0.5 1 0.5 1 25 186.5 87.5 197.5 84 210 55 232.5 59.5 246 15.5 295.5 15.5 295.5 63 490.5 63 490.5 90 481.5 99 462.5 99 449 99 444.5 106.5 444.5 119.5 436 119.5 431.5 133 436 147 355 119.5 333 198 315.5 247 328 256 333 241 342 226 347 237 411.5 253 402.5 284.5 414.5 284.5 424 247 449 165 466.5 165 485.5 157.5 485.5 639 443 669.5 438 663.5 438 572 455.5 568 438 498 258 334 266 322 169.5 247 56.5 371 60 375.5 76.5 354.5 249 517.5 223 538.5 332.5 649 339 669.5 371.5 710 432 691 471.5 736.5 476.5 732 485.5 736.5 493 1020 542.5 1039.5 585 1039.5 585 1128 397.5 1128', { isStatic: true }, true)

        this.matter.add.fromVertices(300 + 95.5, 905 + 117.5, '190.5 234.5 25 234.5 1 203 1 0.5 168.5 0.5 168.5 203 190.5 225 190.5 234.5', { isStatic: true }, true)
        this.matter.add.fromVertices(656 + 44, 297 + 67, '75.5 103.5 79.5 130 87 130 87 118 83 89 87 57.5 87 1 75.5 1 75.5 17 14 17 1 22 1 84 14 133.5 20.5 133.5 14 103.5 75.5 103.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1627.5 + 125.5, 1646 + 106.5, '250 93 119 212 9.5 101.5 1.5 81 71.5 5 154 1 161.5 13.5 197.5 40 250 93', { isStatic: true }, true)
        this.matter.add.fromVertices(603.5 + 86.5, 1349.5 + 88, '3.5 174.5 0.5 0.5 172.5 0.5 172.5 168.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1515 + 68.5, 273 + 74.5, '0.5 97 3.5 116 11.5 109 101.5 126.5 101.5 148 107 148 115.5 133.5 127 91.5 136 12.5 124 9 115.5 39.5 32.5 22 37 5 23.5 1.5 0.5 97', { isStatic: true }, true)

        this.matter.add.fromVertices(233.5 + 16, 1096.5 + 90, '31.5 178.5 0.5 161.5 4.5 1.5 31.5 18', { isStatic: true }, true);
        this.matter.add.fromVertices(499 + 167.5, 123.5 + 78, '1 116 1 0.5 334 4 334 155 9.5 155', { isStatic: true }, true);
        this.matter.add.fromVertices(128 + 103, 252 + 153.5, '1 1 174.5 1 205 39.5 205 136.5 198 147.5 180.5 119 180.5 304.5 165 283 1 287.5', { isStatic: true }, true)
        this.matter.add.fromVertices(1817.5 + 66.5, 149.5 + 146.5, '4.5 292.5 0.5 0.5 132 0.5 132 292.5', { isStatic: true }, true);
        this.matter.add.fromVertices(311 + 75.5, 1278 + 78.5, '76.5 1 1 60.5 71.5 155.5 149.5 98.5', { isStatic: true }, true);
        this.matter.add.fromVertices(1378 + 84, 936 + 72, '7 83.5 1 64 21.5 64 81.5 55.5 116.5 39.5 121 11 145 1.5 159 11 148.5 29 163 29 167 44.5 159 64 167 88.5 167 114.5 159 126 148.5 119.5 148.5 96.5 129 83.5 37 133.5 29.5 142.5 16.5 126 16.5 96.5 7 83.5', { isStatic: true }, true);


        // this.matter.add.fromVertices(0, 0, '', { isStatic: true }, true)
    }

    createCollision() {
        const bodyDoor = this.matter.add.fromVertices(962 + 89, 92 + 55.5, '1 1 1 110.5 177 110.5 177 1', {
            label: `${LABEL_ID.ANSWER_KEY}`,
            isStatic: true,
        })

        const bodyDoorBack = this.matter.add.fromVertices(871 + 142.5, 2003.5 + 22.5, '1 0.5 1 44 284 44 284 0.5', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        // const box1 = this.matter.add.fromVertices(233.5 + 16, 1096.5 + 90, '31.5 178.5 0.5 161.5 4.5 1.5 31.5 18', {
        //     label: `${LABEL_ID.EMPTY_KEY}`,
        //     isStatic: true,
        // })

        const box2 = this.matter.add.fromVertices(460 + 11.5, 867 + 110, '21.5 218 1 196 1 2 19 29', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        const box8 = this.matter.add.fromVertices(1260 + 141.5, 1480 + 137.5, '120 10.5 110.5 1.5 11.5 104.5 6.5 101 1 110.5 11.5 119 16.5 114.5 139 232.5 130.5 243 163.5 273.5 281.5 158 245 119 233 130 120 10.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box8.form = '120 10.5 110.5 1.5 11.5 104.5 6.5 101 1 110.5 11.5 119 16.5 114.5 139 232.5 130.5 243 163.5 273.5 281.5 158 245 119 233 130 120 10.5'

        const box9 = this.matter.add.fromVertices(1604 + 19.5, 700 + 42, '1 -136 1 80 5.5 83 10 64.5 530 64.5 550.5 53.5 550.5 -149 535.5 -169.5 444.5 -169.5 435.5 -158.5 435.5 -136 256 -136 256 -149 241 -158.5 155 -149 155 -136 100 -136 94.5 -153.5 36.5 -136 1 -136', {
            label: `${LABEL_ID.NINETH_KEY}`,
            isStatic: true,
        })

        box9.form = '1 -136 1 80 5.5 83 10 64.5 530 64.5 550.5 53.5 550.5 -149 535.5 -169.5 444.5 -169.5 435.5 -158.5 435.5 -136 256 -136 256 -149 241 -158.5 155 -149 155 -136 100 -136 94.5 -153.5 36.5 -136 1 -136'

        const box11 = this.matter.add.fromVertices(1333 + 225.5, 136.5 + 117, '1 233.5 1 7.5 450.5 0.5 450.5 123.5 441 166.5 359.5 166.5 369 123.5 118.5 123.5 118.5 192 112 233.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box11.form = '1 233.5 1 7.5 450.5 0.5 450.5 123.5 441 166.5 359.5 166.5 369 123.5 118.5 123.5 118.5 192 112 233.5';

        const arrBodies = [bodyDoorBack, bodyDoor, box2];

        const arrBodiesDiff = [box11, box9, box8];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 260);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.NINETH_KEY) {
            const key = '9';
            this.showImg(key);
        } else if (this.eventZone == LABEL_ID.EMPTY_KEY) {
            this.imgKey.setTexture('emptyKey')
            this.imgKey.setVisible(true);
        } else if (this.eventZone == LABEL_ID.ANSWER_KEY) {
            if (!this.enterCodeContainer.visible) {
                this.enterCodeContainer.setVisible(true);
                return;
            }

        }

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hideOverlay() {
        this.isOverlayVisible = false

        if (this.enterCodeContainer.visible) this.enterCodeContainer.setVisible(false);

        this.imgKey.setVisible(false);
        this.imgTitle.setVisible(false);
        this.imgText.setVisible(false);
        this.imgTextKey.setVisible(false);
        this.overlayBackground.setVisible(false);
        this.closeButton.setVisible(false);
    }

    createEnterCodeContainer() {
        this.enterCodeContainer = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
    <div class="enterCodeContainer">
        <div id="enterCodeDialog">
            <h2 id="enterCodeTitle">Enter code</h2>
            <div id="codeInputs">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
                <input class="connect-space-input" type="text" maxlength="1">
            </div>
            <input id="join-room-connect" class="connect-space-button" type="image" src="./assets/button/enter.png" alt="Connect">
            <input id="join-room-cancel" class="connect-space-button" type="image" src="./assets/button/cancel.png" alt="Cancel">
        </div>
    </div>
                `);
        this.enterCodeContainer.setScrollFactor(0);
        this.enterCodeContainer.setOrigin(0.5, 0.5);
        const inputsContainer = document.getElementById('codeInputs')
        const titleContainer = document.getElementById('enterCodeTitle')

        const inputs = document.querySelectorAll('#codeInputs input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });

            input.addEventListener('paste', (event) => {
                event.preventDefault();
                const pasteData = (event.clipboardData || window.clipboardData).getData('text');
                const pasteArray = pasteData.split('').slice(0, inputs.length);

                pasteArray.forEach((char, i) => {
                    inputs[i].value = char;
                });

                if (pasteArray.length < inputs.length) {
                    inputs[pasteArray.length].focus();
                }
            });
        });

        const correctCode = this.cd;

        const joinRoomConnect = document.getElementById('join-room-connect');
        joinRoomConnect.addEventListener('click', () => {

            let code = '';

            inputs.forEach(input => {
                code += input.value;
            });

            code = code.toUpperCase();

            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.imgKey, this.imgTitle],
                alpha: 1,
                duration: 500
            });

            let keyObj = null;
            this.isOverlayVisible = true;
            this.enterCodeContainer.setVisible(false);

            if (code == correctCode) {
                keyObj = myMap.get('answer');
            }
            else {
                keyObj = myMap.get('wrong');
            }

            this.imgKey.setTexture(keyObj.img);

            this.imgTitle.setText(decrypt(keyObj.text));
            this.imgTitle.setPosition(keyObj.x, keyObj.y);

            this.imgTitle.setVisible(true);
            this.imgKey.setVisible(true);
            this.overlayBackground.setVisible(true);
            this.closeButton.setVisible(true);
        });

        const joinRoomCancel = document.getElementById('join-room-cancel');
        joinRoomCancel.addEventListener('click', () => {
            this.isOverlayVisible = false;
            this.hideOverlay();
        });

        this.enterCodeContainer.setVisible(false);
    }
}
