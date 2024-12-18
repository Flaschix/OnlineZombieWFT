self.onmessage = function (event) {
    const { enemies, player, collisionDistanceX, collisionDistanceYD, collisionDistanceYU } = event.data;

    const collisions = [];
    enemies.forEach((enemy, index) => {
        const dx = Math.abs(enemy.x - player.x);
        const dy = enemy.y - player.y;

        if (dx < collisionDistanceX && dy > collisionDistanceYD && dy < collisionDistanceYU) {
            collisions.push(index); // Сохраняем индексы врагов, у которых произошло столкновение
        }
    });

    // Отправка результата обратно в главный поток
    self.postMessage({ collisions });
};
