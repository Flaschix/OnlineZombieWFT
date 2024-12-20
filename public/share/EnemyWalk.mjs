export class EnemyWalk {

    constructor(socketWorker, scene, collisionEvent, player) {
        this.socketWorker = socketWorker;
        this.scene = scene;
        this.collisionEvent = collisionEvent;

        this.enemies = [];
        this.moveQueue = new Map(); // Хранение очередей движения для каждого врага
        this.lastUpdateTime = Date.now(); // Для расчёта deltaTime
        this.intervalId = null; // ID интервала для ручного движения

        this.player = player;
        this.hitFlag = false;

        this.graphics = this.scene.add.graphics();
        this.startManualUpdate(); // Запуск ручного обновления
    }

    createEnemy(x, y, sprite, scale, animsString) {
        const enemy = this.scene.matter.add.sprite(x, y, sprite).setScale(scale);
        enemy.setStatic(true);
        enemy.setSensor(true);

        enemy.animsString = animsString;

        this.enemies.push(enemy);
        this.moveQueue.set(enemy, []); // Инициализация очереди для врага
    }

    moveEnemy(enemyN, targetX, targetY) {
        const enemy = this.enemies[enemyN];
        if (!enemy) return;

        // Добавление новой цели в очередь
        const queue = this.moveQueue.get(enemy);

        if (this.hitFlag) {
            this.collisionEvent.call(this.scene);
            this.hitFlag = false;
        }

        if (document.hidden) {
            queue.length = 0;

            const player = this.player; // Получаем игрока

            // Определяем область врага
            const enemyX1 = Math.min(enemy.x, targetX);
            const enemyX2 = Math.max(enemy.x, targetX);
            const enemyY1 = Math.min(enemy.y, targetY);
            const enemyY2 = Math.max(enemy.y, targetY);

            // Определяем область игрока
            const playerX1 = player.x - 30;
            const playerX2 = player.x + 30;
            const playerY1 = player.y - 70;
            const playerY2 = player.y + 40;

            // Проверяем пересечение
            const isIntersecting = !(enemyX2 < playerX1 ||
                enemyX1 > playerX2 ||
                enemyY2 < playerY1 ||
                enemyY1 > playerY2);

            if (isIntersecting) {
                this.hitFlag = true;
            }
        }
        queue.push({ x: targetX, y: targetY });
    }

    processMovement(deltaTime) {
        if (deltaTime <= 0 || deltaTime > 1000) return;

        this.enemies.forEach((enemy) => {
            const queue = this.moveQueue.get(enemy);
            if (!queue || queue.length === 0) {
                this.setIdleFrame(enemy); // Устанавливаем анимацию остановки
                return;
            }

            const target = queue[0];
            enemy.targetX = target.x;
            enemy.targetY = target.y;
            const speed = 200; // Пиксели в секунду
            const distanceX = target.x - enemy.x;
            const distanceY = target.y - enemy.y;

            const stepX = Math.sign(distanceX) * speed * (deltaTime / 1000);
            const stepY = Math.sign(distanceY) * speed * (deltaTime / 1000);


            if (Math.abs(distanceX) <= Math.abs(stepX) && Math.abs(distanceY) <= Math.abs(stepY)) {
                enemy.x = target.x;
                enemy.y = target.y;
                queue.shift(); // Переходим к следующей цели
                this.setIdleFrame(enemy); // Устанавливаем анимацию остановки
            } else {
                enemy.x += stepX;
                enemy.y += stepY;

                const currentAnimation = enemy.anims.currentAnim;
                if (Math.abs(stepX) > Math.abs(stepY)) {
                    const nextAnim = stepX > 0 ? `${enemy.animsString[1]}` : `${enemy.animsString[2]}`;
                    // if (!currentAnimation || currentAnimation.key !== nextAnim) {
                    enemy.anims.play(nextAnim, true);
                    // }
                } else {
                    const nextAnim = stepY > 0 ? `${enemy.animsString[0]}` : `${enemy.animsString[3]}`;
                    // if (!currentAnimation || currentAnimation.key !== nextAnim) {
                    enemy.anims.play(nextAnim, true);
                    // }
                }
            }
        });
    }

    setIdleFrame(enemy) {
        const currentAnimation = enemy.anims.currentAnim;

        if (!currentAnimation) return;

        let idleFrame;
        if (currentAnimation.key.includes("down")) {
            idleFrame = 0; // Первый кадр анимации движения вниз
        } else if (currentAnimation.key.includes("right")) {
            idleFrame = 8; // Первый кадр анимации движения вправо
        } else if (currentAnimation.key.includes("up")) {
            idleFrame = 16; // Первый кадр анимации движения вверх
        } else if (currentAnimation.key.includes("left")) {
            idleFrame = 24; // Первый кадр анимации движения влево
        }

        enemy.anims.stop(); // Останавливаем текущую анимацию
        enemy.setFrame(idleFrame); // Устанавливаем врага на первый кадр
    }



    collisionCheck() {
        const player = this.scene.player; // Объект игрока
        const collisionDistanceX = 30;
        const collisionDistanceYD = -70; // Радиус столкновения
        const collisionDistanceYU = 40;

        this.enemies.forEach((enemy) => {
            // Проверка столкновения с игроком
            const dx = Math.abs(enemy.x - player.x);
            const dy = enemy.y - player.y;

            if (dx < collisionDistanceX && dy > collisionDistanceYD && dy < collisionDistanceYU) {
                this.collisionEvent.call(this.scene);
            }
        });
    }


    updatePositionsFromServer(data) {
        // Обработка данных от сервера (например, массив с ID врага и координатами)
        data.forEach(({ enemyN, x, y }) => {
            this.moveEnemy(enemyN, x, y);
        });
    }

    startManualUpdate() {
        this.intervalId = setInterval(() => {
            const now = Date.now();
            const deltaTime = now - this.lastUpdateTime;
            this.lastUpdateTime = now;

            this.processMovement(deltaTime);
            this.collisionCheck();
        }, 20);
    }

    stopManualUpdate() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    checkOpenTab(enemy) {
        const x = enemy.x;
        const y = enemy.y;

        const player = this.player; // Получаем игрока

        // Определяем область игрока
        const playerX1 = player.x - 30;
        const playerX2 = player.x + 30;
        const playerY1 = player.y - 70;
        const playerY2 = player.y + 40;

        // Проверяем, пересек ли враг игрока в зависимости от направления движения
        let hasPassed = false;

        if (x < enemy.targetX) { // Движение вправо
            hasPassed = x >= playerX1;
        } else if (x > enemy.targetX) { // Движение влево
            hasPassed = x <= playerX2;
        }

        if (hasPassed) return 1;

        if (y < enemy.targetY) { // Движение вниз
            hasPassed = y >= playerY1;
        } else if (y > enemy.targetY) { // Движение вверх
            hasPassed = y <= playerY2;
        }

        if (hasPassed) return 1;
        return 0;
    }

    handleVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.lastUpdateTime = Date.now(); // Сбросить время для корректного deltaTime


            } else {
                if (this.hitFlag) {
                    let count = 0;
                    this.enemies.forEach((enemy) => {
                        count += this.checkOpenTab(enemy);
                    });

                    if (count == 0) {
                        this.hitFlag = false;
                    }
                }
            }
        });
    }
}
