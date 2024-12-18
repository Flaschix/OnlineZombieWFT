import { CST } from "../CST.mjs";

export class HeartController {

    constructor(scene, socketController) {
        this.scene = scene;
        this.socketController = socketController;

        this.heartImage = null;
        this.heartText = null;
        this.hearts = null;

        this.lastHitTime = Date.now();
    }

    initHeart(xi, yi, heartImg, xt, yt) {
        this.heartImage = this.scene.add.image(xi, yi, heartImg).setScale(0.2).setScrollFactor(0);;
        this.heartText = this.scene.add.text(xt, yt, `0`, { font: "bold 40px Arial", fill: '#fff' }).setOrigin(0.5).setStroke('#000000', 4).setScrollFactor(0);;

        this.socketController.subscribeUpdateHeart(this, this.updateHeart);
        this.socketController.subscribeGameLose(this, this.loseGame);

        this.socketController.emitGetHearts();
    }

    updateHeart(hearts) {
        this.hearts = hearts;
        this.heartText.setText(`${this.hearts}`);
    }

    hitHeart(eventHitAnims) {
        const newHit = Date.now();

        if (newHit - this.lastHitTime > 1000 && this.hearts > 0) {
            this.lastHitTime = newHit;
            this.socketController.emitHitHeart();
            if (eventHitAnims) eventHitAnims();
        }
    }

    loseGame(resetGameEvent) {
        console.log('lose Game');

        // Проверьте, что this.scene.physics определён
        if (this.scene.physics) {
            this.scene.physics.pause();
        } else {
            console.error('Physics is not defined in the scene');
        }

        // Отобразить сообщение "Вы проиграли"
        const gameOverText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 50, 'Вы проиграли', {
            fontSize: '64px',
            fill: '#ff0000'
        }).setScrollFactor(0).setOrigin(0.5);

        // Поставить сцену на паузу
        this.scene.scene.pause();

        // Создать текст для таймера
        let countdown = 5;
        const countdownText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 50, `Перезапуск через: ${countdown}`, {
            fontSize: '48px',
            fill: '#ffffff'
        }).setScrollFactor(0).setOrigin(0.5);

        // Использовать setTimeout для обновления таймера
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownText.setText(`Перезапуск через: ${countdown}`);
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                // Удалить текст "Вы проиграли" и таймер
                gameOverText.destroy();
                countdownText.destroy();

                // Переключить сцену
                this.socketController.emitSwitchScene(CST.SCENE.GAMESCENE, 1024, 1940);
            }
        }, 1000);
    }

}