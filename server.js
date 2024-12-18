const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        tls: false,
        rejectUnauthorized: false
    }
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const rooms = {};
const enemyState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateRoomCode(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('createRoom', async () => {
        console.log('createRoom');
        let preCode;
        let check

        do {
            preCode = `${generateRoomCode(100000, 999999)}`
            check = await redisClient.get(preCode);
        } while (check != null)

        const roomCode = preCode;
        const roomId = uuidv4();

        try {
            await redisClient.set(roomCode, roomId, { EX: 86400 }); // Устанавливаем срок действия 24 часа 86400
            rooms[roomId] = { levels: {} };
            // socket.join(roomId);
            socket.emit('roomCreated', roomCode);
            console.log(`Room created with code: ${roomCode}`);
        } catch (err) {
            console.error('Error creating room:', err);
        }
    });

    socket.on('checkRoom', async (roomCode) => {
        try {
            const roomId = await redisClient.get(roomCode);
            if (!roomId) {
                socket.emit('roomNotFound');
                return;
            } else {
                socket.emit('roomExists', roomCode);
                return;
            }
        } catch (err) {
            console.error('Error checking room:', err);
            socket.emit('error', 'An error occurred');
        }
    });

    socket.on('joinRoom', async ({ roomCode, avatar, username }) => {
        try {
            const roomId = await redisClient.get(roomCode);
            if (!roomId) {
                socket.emit('error', 'Room not found');
                return;
            }

            if (!rooms[roomId]) {
                rooms[roomId] = { levels: {}, fold: [], hearts: 3, enemyState: 0 };
            }

            if (!rooms[roomId].levels['GameScene']) {
                rooms[roomId].levels['GameScene'] = {};
            }

            if (!rooms[roomId].fold) {
                rooms[roomId].fold = [];
            }

            if (!rooms[roomId].hearts) {
                rooms[roomId].hearts = 3;
            }

            if (!rooms[roomId].enemyState) {
                rooms[roomId].enemyState = 0;
            }

            socket.join(roomId);
            socket.roomId = roomId;
            socket.currentLevel = 'GameScene';

            socket.join(`${roomId}:${socket.currentLevel}`);

            rooms[roomId].levels[socket.currentLevel][socket.id] = { id: socket.id, x: 1024, y: 1700, character: avatar, name: username, room: roomCode };
            // rooms[roomId].levels[socket.currentLevel][socket.id] = { id: socket.id, x: 1024, y: 800, character: avatar, name: username, room: roomCode };

            // Отправляем информацию о текущих игроках новому игроку
            socket.emit('currentPlayers', rooms[roomId].levels[socket.currentLevel]);

            // Уведомляем других игроков о новом игроке
            socket.to(`${roomId}:${socket.currentLevel}`).emit(`newPlayer:${socket.currentLevel}`, rooms[roomId].levels[socket.currentLevel][socket.id]);

            socket.on(`disconnect`, () => {
                if (rooms[roomId]) {

                    delete rooms[roomId].levels[socket.currentLevel][socket.id];
                    io.to(`${roomId}:${socket.currentLevel}`).emit('playerDisconnected', socket.id);
                }
            });

            socket.on(`playerMovement:${socket.currentLevel}`, (movementData) => {
                if (rooms[roomId].levels[socket.currentLevel][socket.id]) {
                    rooms[roomId].levels[socket.currentLevel][socket.id].x = movementData.x;
                    rooms[roomId].levels[socket.currentLevel][socket.id].y = movementData.y;
                    rooms[roomId].levels[socket.currentLevel][socket.id].velocityX = movementData.velocityX;
                    rooms[roomId].levels[socket.currentLevel][socket.id].velocityY = movementData.velocityY;
                    rooms[roomId].levels[socket.currentLevel][socket.id].isMoving = movementData.isMoving;
                    rooms[roomId].levels[socket.currentLevel][socket.id].direction = movementData.direction;
                    io.to(`${roomId}:${socket.currentLevel}`).emit(`playerMoved:${socket.currentLevel}`, { id: socket.id, ...movementData });
                }
            });

            socket.on(`getPlayers`, () => {
                socket.emit('exitstedPlayers', rooms[roomId].levels[socket.currentLevel]);
            });

            socket.on(`getFold`, () => {
                socket.emit('takeFold', rooms[roomId].fold);
            });

            socket.on(`emitAddNewImg`, (img) => {
                rooms[roomId].fold.push(img)
                io.to(`${roomId}`).emit('takeFold', rooms[roomId].fold);
            });

            socket.on('switchScene', (newScene, posX, posY) => {
                let avatarCur = rooms[roomId].levels[socket.currentLevel][socket.id].character;
                let usernameCur = rooms[roomId].levels[socket.currentLevel][socket.id].name;
                //выход с текущего уровня
                if (rooms[roomId].levels[socket.currentLevel]) {
                    delete rooms[roomId].levels[socket.currentLevel][socket.id];
                    io.to(`${roomId}:${socket.currentLevel}`).emit('playerDisconnected', socket.id);
                    socket.leave(`${roomId}:${socket.currentLevel}`);
                }

                socket.removeAllListeners(`playerMovement:${socket.currentLevel}`);
                socket.currentLevel = newScene;

                if (!rooms[roomId].levels[newScene]) {
                    rooms[roomId].levels[newScene] = {};
                }

                rooms[roomId].levels[newScene][socket.id] = { id: socket.id, x: posX, y: posY, character: avatarCur, name: usernameCur, room: roomCode };
                socket.join(`${roomId}:${newScene}`);

                socket.emit('sceneSwitched', { players: rooms[roomId].levels[newScene], scene: newScene });

                socket.to(`${roomId}:${newScene}`).emit(`newPlayer:${newScene}`, rooms[roomId].levels[newScene][socket.id]);

                // Переподключаем слушатель для новой сцены
                socket.on(`playerMovement:${socket.currentLevel}`, (movementData) => {
                    if (rooms[roomId].levels[socket.currentLevel][socket.id]) {
                        rooms[roomId].levels[socket.currentLevel][socket.id].x = movementData.x;
                        rooms[roomId].levels[socket.currentLevel][socket.id].y = movementData.y;
                        rooms[roomId].levels[socket.currentLevel][socket.id].velocityX = movementData.velocityX;
                        rooms[roomId].levels[socket.currentLevel][socket.id].velocityY = movementData.velocityY;
                        rooms[roomId].levels[socket.currentLevel][socket.id].isMoving = movementData.isMoving;
                        rooms[roomId].levels[socket.currentLevel][socket.id].direction = movementData.direction;
                        io.to(`${roomId}:${socket.currentLevel}`).emit(`playerMoved:${socket.currentLevel}`, { id: socket.id, ...movementData });
                    }
                });

            });

            socket.on('playerReconnect', (newSettings) => {
                if (rooms[roomId].levels[socket.currentLevel][socket.id]) {

                    rooms[roomId].levels[socket.currentLevel][socket.id] = { id: socket.id, x: newSettings.x, y: newSettings.y, character: newSettings.avatar, name: newSettings.name, room: roomCode };
                    socket.to(`${roomId}:${socket.currentLevel}`).emit(`playerReconected:${socket.currentLevel}`, rooms[roomId].levels[socket.currentLevel][socket.id]);
                }
            });

            socket.on(`getHearts`, () => {
                socket.emit('updateHeart', rooms[roomId].hearts);
            });

            socket.on(`hitHeart`, () => {
                rooms[roomId].hearts -= 1;

                io.to(`${roomId}`).emit('updateHeart', rooms[roomId].hearts);

                if (rooms[roomId].hearts < 1) {
                    io.to(`${roomId}`).emit('gameLose');
                    rooms[roomId].hearts = 3;
                    rooms[roomId].fold = [];
                }
            });

            socket.on(`getEnemyState`, () => {
                // console.log(rooms[roomId].enemyState);
                socket.emit('takeEnemySate', rooms[roomId].enemyState);
            })
        } catch (err) {
            console.error('Error joining room:', err);
            socket.emit('error', 'An error occurred');
        }
    });
});


function updateEnemies(roomId) {
    const room = rooms[roomId];
    if (!room) return;

    const previousState = room.enemyState;
    room.enemyState = (previousState + 1) % enemyState.length;

    if (previousState !== room.enemyState) {
        io.to(roomId).emit('enemiesUpdated', room.enemyState);
    }
}


setInterval(() => {
    Object.keys(rooms).forEach(updateEnemies);
}, 3000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
