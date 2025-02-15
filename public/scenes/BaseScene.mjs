import { LABEL_ID } from "../CST.mjs";
import { socket } from "../CST.mjs";
import { SocketWorker } from "../share/SocketWorker.mjs";
import { createUIBottom, createUITop, createUIRight, createExitMenu, isMobile, HEIGHT_PRESS_X, CAMERA_MARGIN, CAMERA_MARGIN_MOBILE } from "../share/UICreator.mjs";
import { AnimationControl } from "../share/AnimationControl.mjs";
import { PlayersController } from "../share/PlayerController.mjs";

export class BaseScene extends Phaser.Scene {
    constructor(sceneKey) {
        super({ key: sceneKey });

        //проверка на то, стоит ли игрок в зоне или нет
        this.isInZone = false;

        this.player;

        //зона в которой стоит игрок
        this.eventZone = null;

        //виден ли оверлей сейчас поврех экрана
        this.isOverlayVisible = false;

        this.mobileFlag = false;

        this.isDragging = false;

        this.foldImgNumber = 0;
        this.fold = [];

        this.fullMap = true;
        this.moved = false;

        this.otherPlayers = {};
    }

    preload() {
        this.loding = new AnimationControl(AnimationControl.LOADING);
        this.loding.addLoadOnScreen(this, 1280 / 2, 720 / 2, 0.3, 0.3);
    }

    create(data) {
        this.mySocket = new SocketWorker(socket);
        const { players } = data;

        this.loding.deleteLoadFromScreen(this);
        this.playersController = new PlayersController();
        this.mobileFlag = isMobile();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.createUnWalkedObjects();
        this.createUIElements();
        this.setupSocketListeners();



    }

    createUIElements() {
        createUIRight(this);
        createUITop(this);
        createUIBottom(this);
        createExitMenu(this, this.leaveGame, this.closeExitMenu, this.mobileFlag);
    }

    setupSocketListeners() {
        //Подключение слушателей
        this.mySocket.subscribeExistedPlayers(this, this.createOtherPlayersTest);
        this.mySocket.subscribeTakeFold(this, this.updateFold);
        this.mySocket.subscribeNewPlayer(this, this.scene.key, this.otherPlayers, this.playersController.createOtherPlayer);
        this.mySocket.subscribePlayerMoved(this, this.scene.key, this.checkOtherPlayer);
        this.mySocket.subscribePlayerDisconected(this, this.deletePlayer);
        this.mySocket.subscribePlayerRecconected(this, this.scene.key, this.onReconnect);
        this.mySocket.subscribeSceneSwitched(this, this.scene.key, sceneSwitched)

        this.mySocket.emitGetPlayers();
        this.mySocket.emitGetFold();
    }

    createMap(map) {
        this.map = this.add.image(0, 0, map).setOrigin(0, 0);
        this.matter.world.setBounds(0, 0, this.map.width, this.map.height);
    }

    createUnWalkedObjects() {
    }

    createPlayers(players, cameraMargin) {
        Object.keys(players).forEach((id) => {
            if (id === socket.id) {
                //добовляем игрока
                this.player = this.playersController.createMainPlayer(this, players[id]);

                //настраиваем камеру игрока
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setBounds(cameraMargin.left, cameraMargin.top, 2048 + cameraMargin.right, 2048 + cameraMargin.bottom);
            } else {
                this.playersController.createOtherPlayer(this, players[id], this.otherPlayers);
            }
        });
    }

    createOtherPlayersTest(context, players) {
        Object.keys(players).forEach((id) => {
            if (!(id === socket.id) && context.otherPlayers[id] == null) {
                context.playersController.createOtherPlayer(context, players[id], context.otherPlayers);
            }
        });
    }

    checkOtherPlayer(self, playerInfo) {
        if (self.otherPlayers[playerInfo.id]) {
            const info = { ...playerInfo };
            const player = self.otherPlayers[info.id];
            // Обновляем целевые координаты и скорость
            player.targetX = info.x;
            player.targetY = info.y;
            player.velocityX = info.velocityX;
            player.velocityY = info.velocityY;
            player.isMoving = info.isMoving;
            player.direction = info.direction;


            // Интерполяция движения
            try {
                self.tweens.add({
                    targets: player,
                    x: player.targetX,
                    y: player.targetY,
                    duration: 200,
                    onUpdate: function () {
                        // Обновление анимации на основе данных о движении
                        self.playersController.updateAnimOtherPlayer(player, {
                            ...info,
                            velocityX: player.targetX - player.x,
                            velocityY: player.targetY - player.y
                        });
                    },
                    onComplete: function () {
                        // Проверяем, нужно ли остановить анимацию
                        try {
                            if (!player.isMoving) {
                                player.anims.stop();
                            }
                        } catch (e) { };
                    }
                });
            } catch (error) {

            }

        }
    }

    onReconnect(playerInfo) {
        if (this.otherPlayers[playerInfo.id]) {
            this.otherPlayers[playerInfo.id].setTexture(`character${playerInfo.character}`);
            this.otherPlayers[playerInfo.id].character = playerInfo.character
            this.otherPlayers[playerInfo.id].name = playerInfo.name;
            this.otherPlayers[playerInfo.id].nameText.setText(playerInfo.name);
        } else {
            this.playersController.createOtherPlayer(this, playerInfo, this.otherPlayers);
        }
    }

    deletePlayer(context, id) {
        if (context.otherPlayers[id]) {
            context.otherPlayers[id].nameText.destroy();
            context.otherPlayers[id].destroy();
            delete context.otherPlayers[id];
        }
    }

    createCollision() {

    }

    createOverlays() {
        this.pressX = this.add.image(this.player.x, this.player.y - 50, 'pressX');
        this.pressX.setDisplaySize(this.pressX.width, this.pressX.height);
        this.pressX.setVisible(false);

        //задний фон оверлея
        this.overlayBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlayBackground');
        this.overlayBackground.setOrigin(0.5, 0.5);
        this.overlayBackground.setDisplaySize(this.cameras.main.width - 300, this.cameras.main.height - 100);
        this.overlayBackground.setVisible(false);
        this.overlayBackground.setDepth(2);
        this.overlayBackground.setScrollFactor(0);
        this.overlayBackground.setAlpha(0); // Начальное значение прозрачности

        //Первый ключ
        this.imgKey = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, '');
        this.imgKey.setScale(0.5);
        this.imgKey.setVisible(false);
        this.imgKey.setDepth(2);
        this.imgKey.setScrollFactor(0);
        this.imgKey.setAlpha(0);

        this.closeButton = this.add.image(this.cameras.main.width - 200, 85, 'closeIcon');
        this.closeButton.setDisplaySize(50, 50);
        this.closeButton.setInteractive();
        this.closeButton.setVisible(false);
        this.closeButton.setDepth(2);
        this.closeButton.setScrollFactor(0);
        this.closeButton.setAlpha(0); // Начальное значение прозрачности

        this.closeButton.on('pointerdown', () => {
            this.isOverlayVisible = false;
            this.tweens.add({
                targets: [this.closeButton, this.overlayBackground, this.imgKey],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    try {
                        this.hideOverlay();
                    }
                    catch (e) { }
                }
            });
        });
    }

    createInputHandlers() {
        this.input.keyboard.on('keydown-X', () => {
            this.itemInteract();
        });
    }

    itemInteract() {
        if (this.foldKeys.visible) return;
        if (this.isInZone) {
            this.player.setVelocity(0);

            if (this.eventZone == LABEL_ID.DOOR_FORWARD_ID) {
                this.moveForwardRoom();
                return;
            }

            if (!this.isOverlayVisible) {

                this.showOverlay();

                this.tweens.add({
                    targets: [this.overlayBackground, this.closeButton, this.imgKey],
                    alpha: 1,
                    duration: 500
                });
            }
            else {
                this.tweens.add({
                    targets: [this.overlayBackground, this.closeButton, this.imgKey],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        try {
                            this.hideOverlay();
                        } catch (e) { }

                    }
                });
            }
        }
    }

    showOverlay() {
    }

    hideOverlay() {
    }

    createFold() {
        this.foldKeys = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 30, 'disk');
        this.foldKeys.setScale(0.5);
        this.foldKeys.setDepth(2);
        this.foldKeys.setScrollFactor(0);
        this.foldKeys.setVisible(false);
        this.foldKeys.setAlpha(1);


        this.leftArrow = this.add.image(0, 0, 'leftArrow');
        this.rightArrow = this.add.image(0, 0, 'rightArrow');

        this.rightArrow.setPosition(
            this.cameras.main.width - 210,
            this.cameras.main.height / 2 - 10,
        )
        this.rightArrow.setScrollFactor(0);
        this.rightArrow.setDepth(2);

        this.leftArrow.setPosition(
            210,
            this.cameras.main.height / 2 - 10,
        )
        this.leftArrow.setScrollFactor(0);
        this.leftArrow.setDepth(2);

        this.leftArrow.setInteractive();
        this.rightArrow.setInteractive();
        this.leftArrow.setVisible(false);
        this.rightArrow.setVisible(false);

        this.rightArrow.on('pointerdown', () => {
            this.moveRightKeys();
        });

        this.leftArrow.on('pointerdown', () => {
            this.moveLeftKeys();
        });

        this.foldColseBtn = this.add.image(this.cameras.main.width - 200, 90, 'closeIcon');
        this.foldColseBtn.setDisplaySize(50, 50);
        this.foldColseBtn.setInteractive();
        this.foldColseBtn.setVisible(false);
        this.foldColseBtn.setDepth(2);
        this.foldColseBtn.setScrollFactor(0);
        this.foldColseBtn.setAlpha(0); // Начальное значение прозрачности

        this.foldColseBtn.on('pointerdown', () => {
            this.isOverlayVisible = false;

            this.foldKeys.setVisible(false);
            this.foldColseBtn.setVisible(false);
            this.overlayBackground.setVisible(false);
            this.leftArrow.setVisible(false);
            this.rightArrow.setVisible(false);
        });
    }

    showFold(context) {
        if (context.isOverlayVisible) return;
        context.player.setVelocity(0);
        context.isOverlayVisible = true
        context.overlayBackground.setAlpha(1);
        context.foldColseBtn.setAlpha(1);


        if (context.fold == null || context.fold.length < 1) {

        } else if (context.fold.length > 1) {
            context.foldImgNumber = 0;
            context.leftArrow.setVisible(false);
            context.rightArrow.setVisible(true);

            context.foldKeys.setTexture(context.fold[0]);
            context.foldKeys.setVisible(true);
        } else {
            context.foldImgNumber = 0;
            context.foldKeys.setTexture(context.fold[0]);
            context.foldKeys.setVisible(true);
        }


        context.overlayBackground.setVisible(true);
        context.foldColseBtn.setVisible(true);
    }

    moveRightKeys() {
        if (this.foldImgNumber < this.fold.length - 1) {
            this.foldImgNumber += 1;
            if (this.foldImgNumber == this.fold.length - 1) this.rightArrow.setVisible(false);
            this.leftArrow.setVisible(true);

            this.tweens.add({
                targets: [this.foldKeys],
                alpha: 0,
                duration: 250,
                onComplete: () => {
                    try {
                        this.foldKeys.setTexture(this.fold[this.foldImgNumber]);
                        this.tweens.add({
                            targets: [this.foldKeys],
                            alpha: 1,
                            duration: 250,
                        });
                    }
                    catch (e) { }
                }
            });
        }
    }

    moveLeftKeys() {
        if (this.foldImgNumber > 0) {
            this.foldImgNumber -= 1;
            if (this.foldImgNumber == 0) this.leftArrow.setVisible(false);
            this.rightArrow.setVisible(true);

            this.tweens.add({
                targets: [this.foldKeys],
                alpha: 0,
                duration: 250,
                onComplete: () => {
                    try {
                        this.foldKeys.setTexture(this.fold[this.foldImgNumber]);
                        this.tweens.add({
                            targets: [this.foldKeys],
                            alpha: 1,
                            duration: 250,
                        });
                    }
                    catch (e) { }
                }
            });
        }
    }

    updateFold(context, arr) {
        context.fold = arr
    }

    showSettings(self) {
        if (self.foldKeys.visible || self.overlayBackground.visible) return;
        self.avatarDialog.setPosition(self.cameras.main.scrollX + 640, self.cameras.main.scrollY + 360);
        self.avatarDialog.setVisible(true);
        self.isOverlayVisible = true
        self.exitContainer.setVisible(false);
        self.player.setVelocity(0);
    }

    showExitMenu(self) {
        if (self.foldKeys.visible || self.overlayBackground.visible) return;
        self.exitContainer.setPosition(self.cameras.main.scrollX + 640, self.cameras.main.scrollY + 360);
        self.exitContainer.setVisible(true);
        self.isOverlayVisible = true
        self.avatarDialog.setVisible(false);
        self.player.setVelocity(0);
    }

    leaveGame(self) {
        window.location.reload();
    }

    closeExitMenu(self) {
        self.exitContainer.setVisible(false);
        self.isOverlayVisible = false
    }

    enterNewSettingsInAvatarDialog(self, usernameInput, nameError, imgCount) {
        const username = usernameInput.value;
        if (username.length < 1 || username.length > 12) {
            nameError.style.visibility = "visible";
        } else {
            self.mySocket.emitPlayerReconnect({ x: self.player.x, y: self.player.y, avatar: imgCount + 1, name: username });
            self.player.setTexture(`character${imgCount + 1}`);
            self.player.character = imgCount + 1;
            self.player.nameText.setText(username);
            self.avatarDialog.setVisible(false);
            self.isOverlayVisible = false;
            nameError.style.visibility = "hidden";
        }
    }

    closeAvatarDialog(self) {
        self.avatarDialog.setVisible(false);
        self.isOverlayVisible = false;
    }

    loadPlusTexture(name, path) {
        this.load.image(name, path);
        this.load.start();
    }

    update() {
        if (!this.player || this.isOverlayVisible) return;

        this.updatePlayerPosition();

        this.updatePressXVisibility();

        // Интерполяция для других игроков
        Object.keys(this.otherPlayers).forEach((id) => {
            let otherPlayer = this.otherPlayers[id];
            if (otherPlayer.targetX !== undefined && otherPlayer.targetY !== undefined) {
                otherPlayer.x += (otherPlayer.targetX - otherPlayer.x) * 0.1;
                otherPlayer.y += (otherPlayer.targetY - otherPlayer.y) * 0.1;
            }
        });
    }

    updatePlayerPosition() {

        if (!this.mobileFlag) this.playersController.updateMainPlayerPosition(this.player, this.cursors);
        else {
            this.playersController.updateMainPlayerPositionJoystick(this.player, this.joystickThumb, this.joystickBase);
        }

        const isMoving = this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0;
        const movementData = {
            x: this.player.x,
            y: this.player.y - 20,
            velocityX: this.player.body.velocity.x,
            velocityY: this.player.body.velocity.y,
            isMoving: isMoving,
            direction: this.player.direction
        };

        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
            this.mySocket.emitPlayerMovement(this.scene.key, movementData);
            this.moved = true;
        } else if (this.moved) {
            this.mySocket.emitPlayerMovementLast(this.scene.key, movementData);
            this.moved = false;
        }
    }

    updatePressXVisibility() {
        if (this.isInZone) {
            if (this.mobileFlag) {
                this.mobileXButton.setVisible(true);
                this.buttonBackground.setVisible(true);
            }
            else {
                this.pressX.setPosition(this.player.x, this.player.y - HEIGHT_PRESS_X);
                this.pressX.setVisible(true);
            }
        } else {
            if (this.mobileFlag) {
                this.mobileXButton.setVisible(false);
                this.buttonBackground.setVisible(false);
            }
            else {
                this.pressX.setVisible(false);
            }
        }
    }

    createSimpleCollision(arr, arrDiff) {
        const highlightGraphics = this.add.graphics();
        highlightGraphics.lineStyle(2, 0x06ff01, 1);
        highlightGraphics.setDepth(0);

        const arrBodies = arr;

        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = true;
                this.eventZone = Number(eventData.bodyB.label);

                // Подсвечиваем границы зоны
                const vertices = eventData.bodyB.vertices;
                highlightGraphics.clear();

                highlightGraphics.lineStyle(2, 0x06ff01, 1);
                highlightGraphics.setDepth(0);

                highlightGraphics.beginPath();
                highlightGraphics.moveTo(vertices[0].x, vertices[0].y);
                for (let i = 1; i < vertices.length; i++) {
                    highlightGraphics.lineTo(vertices[i].x, vertices[i].y);
                }
                highlightGraphics.closePath();
                highlightGraphics.strokePath();
            },
            context: this
        });

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: arrBodies,
            callback: function (eventData) {
                this.isInZone = false;
                this.eventZone = null;

                highlightGraphics.clear();
            },
            context: this
        });

        const arrBodiesDiff = arrDiff;

        arrBodiesDiff.forEach(body => {
            this.matter.world.on('collisionstart', (event) => {
                event.pairs.forEach(pair => {
                    const { bodyA, bodyB } = pair;

                    // Проверяем столкновение с родительским телом
                    if ((bodyA.parent === this.player.body && bodyB.parent === body) ||
                        (bodyB.parent === this.player.body && bodyA.parent === body)) {

                        this.isInZone = true;
                        this.eventZone = Number(body.label);

                        // Очищаем предыдущую графику
                        highlightGraphics.clear();

                        highlightGraphics.lineStyle(2, 0x06ff01, 1);
                        highlightGraphics.setDepth(0);

                        highlightGraphics.beginPath();

                        // Если у объекта есть свойство form, используем его для рисования
                        if (body.form) {
                            const vertices = body.form.split(' ').map(Number);
                            for (let i = 0; i < vertices.length; i += 2) {
                                const x = vertices[i] + body.position.x - body.centerOffset.x;
                                const y = vertices[i + 1] + body.position.y - body.centerOffset.y;
                                if (i === 0) {
                                    highlightGraphics.moveTo(x, y);
                                } else {
                                    highlightGraphics.lineTo(x, y);
                                }
                            }
                        } else {
                            body.vertices.forEach((vertex, index) => {
                                if (index === 0) {
                                    highlightGraphics.moveTo(vertex.x, vertex.y);
                                } else {
                                    highlightGraphics.lineTo(vertex.x, vertex.y);
                                }
                            });
                        }

                        highlightGraphics.closePath();
                        highlightGraphics.strokePath();
                    }
                });
            });

            this.matter.world.on('collisionend', (event) => {
                event.pairs.forEach(pair => {
                    const { bodyA, bodyB } = pair;

                    // Проверяем столкновение с родительским телом
                    if ((bodyA.parent === this.player.body && bodyB.parent === body) ||
                        (bodyB.parent === this.player.body && bodyA.parent === body)) {
                        this.isInZone = false;
                        this.eventZone = null;

                        // Очищаем графику при окончании столкновения
                        highlightGraphics.clear();
                    }
                });
            });
        });
    }
}

function sceneSwitched(self, data) {
    self.map.destroy();
    self.avatarDialog.destroy();
    self.exitContainer.destroy();
    self.otherPlayers = {};
    let players = data.players;
    self.scene.start(data.scene, { players });
}