export class EnemyWalk {
    constructor(socketWorker, scene) {
        this.socketWorker = socketWorker;
        this.scene = scene;
        this.enemies = [];
        this.moveSpeed = 0.05; // Скорость перемещения врагов
    }

    createEnemy(x, y, sprite, collisionObj, event) {
        const enemy = this.scene.matter.add.sprite(x, y, sprite);
        enemy.setStatic(true);

        this.scene.matterCollision.addOnCollideStart({
            objectA: collisionObj,
            objectB: enemy,
            callback: event,
            context: this
        });

        enemy.targetX = x;
        enemy.targetY = y;
        this.enemies.push(enemy);
    }

    moveEnemy(enemyN, targetX, targetY) {
        if (this.enemies[enemyN]) {
            const enemy = this.enemies[enemyN];
            enemy.targetX = targetX;
            enemy.targetY = targetY;
            enemy.setStatic(false); // Разрешаем движение
        }
    }

    update() {
        this.enemies.forEach(enemy => {
            if (!enemy.isStatic()) {
                // Интерполяция по X
                if (Math.abs(enemy.x - enemy.targetX) > 1) {
                    enemy.x = Phaser.Math.Linear(enemy.x, enemy.targetX, this.moveSpeed);
                } else {
                    enemy.x = enemy.targetX;
                }

                // Интерполяция по Y
                if (Math.abs(enemy.y - enemy.targetY) > 1) {
                    enemy.y = Phaser.Math.Linear(enemy.y, enemy.targetY, this.moveSpeed);
                } else {
                    enemy.y = enemy.targetY;
                }

                // Если достигли цели, останавливаем врага
                if (enemy.x === enemy.targetX && enemy.y === enemy.targetY) {
                    enemy.setStatic(true);
                }
            }
        });
    }
}
