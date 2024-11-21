export class SocketWorker {

    constructor(socket) {
        this.socket = socket;
        this.lastSentTime = 0;
        this.lastSentTimeBox = 0;
        this.sendInterval = 75;
    }

    subscribeNewPlayer(context, sceneKey, playerArr, event) {

        this.socket.on(`newPlayer:${sceneKey}`, (playerInfo) => {
            event(context, playerInfo, playerArr);
        });

    }

    subscribePlayerMoved(context, sceneKey, event) {
        this.socket.on(`playerMoved:${sceneKey}`, (playerInfo) => {
            event(context, playerInfo);
        });
    }

    subscribePlayerDisconected(context, event) {
        this.socket.on('playerDisconnected', (id) => {
            event(context, id);
        });
    }

    subscribeSceneSwitched(context, sceneKey, event) {
        this.socket.on('sceneSwitched', (data) => {
            this.unSubscribeAllListeners(sceneKey);
            event(context, data);
        });
    }

    subscribeExistedPlayers(context, event) {
        this.socket.on('exitstedPlayers', (players) => {
            event(context, players);
        });
    }

    subscribePlayerRecconected(context, sceneKey, event) {
        this.socket.on(`playerReconected:${sceneKey}`, (playerInfo) => {
            event.call(context, playerInfo);
        });
    }

    emitSwitchScene(sceneToSwitch, startX, startY) {
        this.socket.emit('switchScene', sceneToSwitch, startX, startY);
    }

    emitPlayerReconnect(newPlayerSettings) {
        this.socket.emit('playerReconnect', newPlayerSettings);
    }

    emitPlayerMovement(sceneKey, playerInfo) {
        const currentTime = Date.now();
        if (currentTime - this.lastSentTime > this.sendInterval) {
            this.socket.emit(`playerMovement:${sceneKey}`, playerInfo);
            this.lastSentTime = currentTime;
        }
    }

    emitPlayerMovementLast(sceneKey, playerInfo) {
        const currentTime = Date.now();
        this.socket.emit(`playerMovement:${sceneKey}`, playerInfo);
        this.lastSentTime = currentTime;
    }

    emitGetPlayers() {
        this.socket.emit('getPlayers', null);
    }

    emitPlayerReconnect(newPlayerSettings) {
        this.socket.emit('playerReconnect', newPlayerSettings);
    }

    unSubscribeAllListeners(sceneKey) {
        this.socket.removeAllListeners('playerDisconnected');
        this.socket.removeAllListeners('sceneSwitched');
        this.socket.removeAllListeners('exitstedPlayers');
        this.socket.removeAllListeners(`newPlayer:${sceneKey}`);
        this.socket.removeAllListeners(`playerMoved:${sceneKey}`);
        this.socket.removeAllListeners('catchedBox');
        this.socket.removeAllListeners('takeBoxes');
        this.socket.removeAllListeners('boxMovement');
    }

    subscribeCatchedBox(context, event) {
        this.socket.on('catchedBox', (boxId) => {
            event.call(context, boxId);
        });
    }

    subscribeTakeBoxes(context, event, rightBox) {
        this.socket.on('takeBoxes', (boxes) => {
            event.call(context, boxes, rightBox);
        });
    }

    subscribeBoxMovement(context, event) {
        this.socket.on('boxMovement', (movementData) => {
            event.call(context, movementData);
        });
    }

    emitCatchBox(boxId) {
        this.socket.emit('catchBox', boxId);
    }

    emitReleaseBox(boxId) {
        this.socket.emit('releaseBox', boxId);
    }

    emitGetBoxes(boxes) {
        this.socket.emit('getBoxes', boxes);
    }

    emitMoveBoxe(movementData) {
        const currentTime = Date.now();
        if (currentTime - this.lastSentTimeBox > this.sendInterval) {
            this.socket.emit('boxMovement', movementData);
            this.lastSentTimeBox = currentTime;
        }
    }

    emitMoveBoxeLast(movementData) {
        this.socket.emit('boxMovement', movementData);
    }
}