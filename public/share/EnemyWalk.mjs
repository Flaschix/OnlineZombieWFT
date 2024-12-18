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

        this.startManualUpdate(); // Запуск ручного обновления
    }

    createEnemy(x, y, sprite, scale) {
        const enemy = this.scene.matter.add.sprite(x, y, sprite).setScale(scale);
        enemy.setStatic(true);
        enemy.setSensor(true);

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



            if (isIntersecting) this.hitFlag = true;
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
            const speed = 200; // Пиксели в секунду
            const distanceX = target.x - enemy.x;
            const distanceY = target.y - enemy.y;

            const stepX = Math.sign(distanceX) * speed * (deltaTime / 1000);
            const stepY = Math.sign(distanceY) * speed * (deltaTime / 1000);

            // if (document.hidden) console.log(`dx: ${this.enemies[0].x} --- dy ${this.enemies[0].y}`);

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
                    const nextAnim = stepX > 0 ? `zombie_walk_right_1` : `zombie_walk_left_1`;
                    if (!currentAnimation || currentAnimation.key !== nextAnim) {
                        enemy.anims.play(nextAnim, true);
                    }
                } else {
                    const nextAnim = stepY > 0 ? `zombie_walk_down_1` : `zombie_walk_up_1`;
                    if (!currentAnimation || currentAnimation.key !== nextAnim) {
                        enemy.anims.play(nextAnim, true);
                    }
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

    handleVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('hide');
                this.lastUpdateTime = Date.now(); // Сбросить время для корректного deltaTime


            } else {
                console.log('open');
                if (this.hitFlag) {
                    // this.hitFlag = false;
                }
            }
        });
    }
}
