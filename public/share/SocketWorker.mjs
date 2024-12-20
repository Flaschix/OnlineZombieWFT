export class SocketWorker {

    constructor(socket) {
        this.socket = socket;
        this.lastSentTime = 0;
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

    subscribeTakeFold(context, event) {
        this.socket.on('takeFold', (arr) => {
            event(context, arr);
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

    emitGetFold() {
        this.socket.emit('getFold', null);
    }

    emitAddNewImg(img) {
        this.socket.emit('emitAddNewImg', img);
    }

    emitPlayerReconnect(newPlayerSettings) {
        this.socket.emit('playerReconnect', newPlayerSettings);
    }

    unSubscribeAllListeners(sceneKey) {
        this.socket.removeAllListeners('playerDisconnected');
        this.socket.removeAllListeners('sceneSwitched');
        this.socket.removeAllListeners('exitstedPlayers');
        this.socket.removeAllListeners('takeFold');
        this.socket.removeAllListeners(`newPlayer:${sceneKey}`);
        this.socket.removeAllListeners(`playerMoved:${sceneKey}`);
        this.socket.removeAllListeners('updateHeart');
        this.socket.removeAllListeners('takeEnemySate');
        this.socket.removeAllListeners('enemiesUpdated');
        this.socket.removeAllListeners('gameLose');
    }

    unSubscribeTakeFold() {
        this.socket.removeAllListeners('takeFold');
    }

    subscribeUpdateHeart(context, event) {
        this.socket.on('updateHeart', (data, socketID) => {
            event.call(context, data, socketID);
        });
    }

    subscribeGameLose(context, event) {
        this.socket.on('gameLose', () => {
            event.call(context);
        });
    }


    emitGetHearts() {
        this.socket.emit('getHearts', null);
    }

    emitHitHeart(socketID) {
        this.socket.emit('hitHeart', socketID);
    }

    unSubscribeHearts() {
        this.socket.removeAllListeners('updateHeart');
    }

    emitGetEnemyState() {
        this.socket.emit('getEnemyState', null);
    }

    subscribeTakeEnemyState(context, event) {
        this.socket.on('takeEnemySate', (state) => {
            event.call(context, state);
        });
    }

    subscribeEnemyUpdate(context, event) {
        this.socket.on('enemiesUpdated', (newState) => {
            event.call(context, newState);
        });
    }
}