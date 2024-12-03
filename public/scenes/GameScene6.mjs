import { CST, LABEL_ID, myMap } from "../CST.mjs";
import { BoardController } from "../share/BoardController.mjs";
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

        this.boardController = new BoardController(this, this.mySocket, this.showWin.bind(this));
    }

    update() {
        super.update();
    }

    createUnWalkedObjects() {
        this.matter.add.fromVertices(1126, 880, '42 1371 904.5 1371 904.5 1428 1 1428 1 1 1496.5 9.5 1496.5 579.5 1404 579.5 1404 539.5 1389 511.5 1358.5 511.5 1332.5 496 1292 480 1265 457.5 1278.5 427 1315 383.5 1344.5 360 1389 360 1437 360 1428.5 303 1265 303 1258 230 1232 237.5 1206 230 1187.5 210.5 1174.5 221 1038.5 221 1033 230 1102 278.5 1048.5 373 968.5 303 1003.5 243.5 1021 221 937 221 937 106.5 902.5 106.5 902.5 70.5 583 70.5 583 112.5 387 112.5 387 262 248.5 262 226.5 273 187 325 144 364 103.5 376.5 42 1371', { isStatic: true }, true);
        this.matter.add.fromVertices(1290 + 338, 1170 + 430, '641 796.5 0.5 801 0.5 859.5 675.5 851.5 675.5 0.5 609.5 0.5 609.5 248 506 248 483.5 376 495.5 552 627 552 641 796.5', { isStatic: true }, true);

        this.matter.add.fromVertices(488 + 22, 1636.5 + 36, '0.5 16 0.5 55 20 70.5 43 55 38.5 16 20 1.5', { isStatic: true }, true);
        this.matter.add.fromVertices(358 + 125, 872 + 86.5, '4 125.5 4 78.5 1.5 63 249 1 249 44 210.5 63 169 38.5 111 65.5 111 147.5 67 171.5 29 151 29 83 9.5 74 9.5 125.5 4 125.5', { isStatic: true }, true);

        // this.matter.add.fromVertices(, { isStatic: true }, true);
    }

    createCollision() {
        const bodyDoorBack = this.matter.add.fromVertices(864.5 + 137.5, 1857 + 37.5, '0.5 1 0.5 74 274.5 74 274.5 1', {
            label: `${LABEL_ID.DOOR_BACK_ID}`,
            isStatic: true,
            isSensor: true
        })

        const box1 = this.matter.add.fromVertices(822 + 162.5, 300.5 + 186.5, '1 0.5 1 372.5 324.5 372.5 324.5 0.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })


        const box5 = this.matter.add.fromVertices(393 + 72.5, 1448 + 85.5, '85.5 169.5 3.5 125.5 0.5 48.5 27 33.5 20.5 26.5 67 1.5 76.5 8 71 23 144.5 58.5 144.5 139', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box5.form = '85.5 169.5 3.5 125.5 0.5 48.5 27 33.5 20.5 26.5 67 1.5 76.5 8 71 23 144.5 58.5 144.5 139';


        const box8 = this.matter.add.fromVertices(1316 + 94, 1578 + 81.5, '1 54 1 114.5 49.5 139 49.5 111.5 65 119 77.5 114.5 77.5 101.5 133.5 126 133.5 162 142.5 159.5 142.5 139 179 122 179 141.5 187.5 139 187.5 92 125 58.5 122.5 39 90.5 30.5 90.5 21.5 53.5 1 22 18.5 25.5 42', {
            label: `${LABEL_ID.TENTH_KEY}`,
            isStatic: true,
        })

        box8.form = '1 54 1 114.5 49.5 139 49.5 111.5 65 119 77.5 114.5 77.5 101.5 133.5 126 133.5 162 142.5 159.5 142.5 139 179 122 179 141.5 187.5 139 187.5 92 125 58.5 122.5 39 90.5 30.5 90.5 21.5 53.5 1 22 18.5 25.5 42'

        const box9 = this.matter.add.fromVertices(1250 + 102.5, 984 + 91, '135.5 180.5 119.5 175 119.5 140.5 49 97 13.5 117.5 6.5 114.5 6.5 65 1 54.5 63 20 58 9.5 63 1.5 73.5 6 70.5 20 163.5 75 163.5 58.5 185.5 58.5 193 70.5 185.5 89 204.5 97 204.5 104 185.5 112 185.5 153.5', {
            label: `${LABEL_ID.EMPTY_KEY}`,
            isStatic: true,
        })

        box9.form = '135.5 180.5 119.5 175 119.5 140.5 49 97 13.5 117.5 6.5 114.5 6.5 65 1 54.5 63 20 58 9.5 63 1.5 73.5 6 70.5 20 163.5 75 163.5 58.5 185.5 58.5 193 70.5 185.5 89 204.5 97 204.5 104 185.5 112 185.5 153.5'


        const box11 = this.matter.add.fromVertices(395 + 131.5, 844 + 73, '1 115.5 1 101 192.5 1 201.5 1 262.5 34 262.5 45.5 72 145.5 57 145.5', {
            label: `${LABEL_ID.BOARD_KEY}`,
            isStatic: true,
        })

        box11.form = '1 115.5 1 101 192.5 1 201.5 1 262.5 34 262.5 45.5 72 145.5 57 145.5';

        const arrBodies = [bodyDoorBack, box1];



        const arrBodiesDiff = [box11, box5, box8, box9];

        this.createSimpleCollision(arrBodies, arrBodiesDiff);
    }

    moveForwardRoom() {
        // this.isInZone = false;
        // this.eventZone = null;
        // this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE4, 1024, 1800);
    }

    moveBackRoom() {
        this.isInZone = false;
        this.eventZone = null;
        this.mySocket.emitSwitchScene(CST.SCENE.GAMESCENE5, 1024, 670);
    }

    showOverlay() {
        this.isOverlayVisible = true

        if (this.eventZone == LABEL_ID.TENTH_KEY) {
            const key = '10';
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

    boardEvent() {
        if (this.isOverlayVisible) { this.hideOverlay(); return; }
        if (!this.boardController.boardFlag) {
            this.boardController.openBoard();
        }
        else {
            this.boardController.closeBoard();
        }
    }

    showFold() {
        if (this.boardController.boardFlag) return;
        super.showFold();
    }


    showSettings() {
        if (this.boardController.boardFlag) return;
        super.showSettings();
    }

    showExitMenu() {
        if (this.boardController.boardFlag) return;
        super.showExitMenu();
    }

    showWin() {
        this.isOverlayVisible = true

        this.tweens.add({
            targets: [this.overlayBackground, this.closeButton, this.imgKey, this.imgTitle, this.imgText],
            alpha: 1,
            duration: 500
        });

        const keyObj = myMap.get('answer');

        this.imgKey.setTexture(keyObj.img);
        this.imgTitle.setText(decrypt(keyObj.title));
        this.imgText.setText(decrypt(keyObj.text));

        this.imgTitle.setPosition(keyObj.xt, keyObj.yt);
        this.imgText.setPosition(keyObj.x, keyObj.y);

        this.imgText.setStyle({ font: "italic 30px MyCustomFont", align: 'center' });

        this.imgKey.setVisible(true);
        this.imgTitle.setVisible(true);
        this.imgText.setVisible(true);

        this.imgKey.setVisible(true);
        this.imgTitle.setVisible(true);
        this.imgText.setVisible(true);

        this.overlayBackground.setVisible(true);
        this.closeButton.setVisible(true);
    }
}